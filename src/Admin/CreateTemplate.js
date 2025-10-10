import React, { useEffect, useState, useRef } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import { Link, Navigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./template.css";

const CreateTemplate = () => {
  const location = useLocation();
  const Id = location.state?.id;
  const [boxes, setBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [templateName, setTemplateName] = useState("");
  console.log(templateName, "temlate name from the state");
  const canvasRef = useRef(null); // Ref for the resume canvas

  useEffect(() => {
    const loadCanvas = async () => {
      if (!Id) return;

      try {
        let param = { Id: Id };
        const res = await axios.post(
          "http://localhost:5000/demo/get-templatebyId",
          param
        );
        console.log("Fetched Data:", res.data);
        setBoxes(res.data.layout || []);
        setTemplateName(res.data.name);
      } catch (err) {
        alert("No saved canvas found in DB.");
      }
    };
    loadCanvas();
  }, [Id]);

  const addTextBox = () => {
    setBoxes([
      ...boxes,
      {
        id: Date.now(),
        type: "text",
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        html: "Click to edit",
        fontSize: 16,
      },
    ]);
  };

  const addLine = () => {
    setBoxes([
      ...boxes,
      {
        id: Date.now(),
        type: "line",
        x: 100,
        y: 200,
        width: 300,
        height: 4,
      },
    ]);
  };

  const updateHtml = (id, newHtml) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, html: newHtml } : box))
    );
  };

  const updateFontSize = (fontSize) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === selectedBoxId
          ? { ...box, fontSize: parseInt(fontSize) }
          : box
      )
    );
  };

  const applyFormat = (command) => {
    document.execCommand(command);
  };

  const applyList = (type) => {
    document.execCommand(type);
  };

  const deleteBox = (id) => {
    setBoxes((prev) => prev.filter((box) => box.id !== id));
    setSelectedBoxId(null);
  };

  const saveCanvas = async () => {
    if (!templateName.trim()) {
      alert("Please enter a name for the template.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/demo/save-template", {
        name: templateName,
        layout: boxes,
      });
      alert("Canvas saved to DB!");
    } catch (err) {
      alert("Error saving canvas");
    }
  };

  //   const downloadPDF = async () => {
  //     // 👇 Blur to remove selection dotted border
  //     if (document.activeElement instanceof HTMLElement) {
  //       document.activeElement.blur();
  //     }

  //     const canvasElement = canvasRef.current;
  //     if (!canvasElement) return;

  //     const canvas = await html2canvas(canvasElement, { scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`${templateName || "resume"}.pdf`);
  //   };

  // const downloadPDF = async () => {
  //   // Step 1: Blur active element to remove blue focus outline
  //   if (document.activeElement instanceof HTMLElement) {
  //     document.activeElement.blur();
  //   }

  //   // Step 2: Temporarily remove 'selected' class from text boxes
  //   const selectedElements = document.querySelectorAll(".text-box.selected");
  //   selectedElements.forEach((el) => el.classList.remove("selected"));

  //   // Step 3: Take screenshot
  //   const canvasElement = canvasRef.current;
  //   if (!canvasElement) return;

  //   const canvas = await html2canvas(canvasElement, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save(`${templateName || "resume"}.pdf`);

  //   // Step 4: Re-add the 'selected' class after download
  //   selectedElements.forEach((el) => el.classList.add("selected"));
  // };

  return (
    <div className="builder-container">
      {/* 🔝 Top Controls */}
      <div className="top-controls">
        <button  className="add-button"><Link to="/admintemplate" style={{color:"white"}}>
          Back</Link>
        </button>
        <input
          type="text"
          placeholder="Enter Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="template-input"
        />
        <button onClick={addTextBox} className="add-button">
          ➕ Add
        </button>
        <button onClick={addLine} className="add-button">
          ➖ Add Line
        </button>
        <button onClick={saveCanvas} className="add-button">
          💾 Save
        </button>
        {/* <button onClick={downloadPDF} className="add-button">
          📄 Download PDF
        </button> */}

        {selectedBoxId &&
          boxes.find((b) => b.id === selectedBoxId)?.type === "text" && (
            <div className="toolbar">
              <button onClick={() => applyFormat("bold")}>B</button>
              <button onClick={() => applyFormat("italic")}>I</button>
              <button onClick={() => applyFormat("underline")}>U</button>
              <button onClick={() => applyList("insertUnorderedList")}>
                •
              </button>
              <button onClick={() => applyList("insertOrderedList")}>1.</button>
              <select
                onChange={(e) => updateFontSize(e.target.value)}
                defaultValue={
                  boxes.find((b) => b.id === selectedBoxId)?.fontSize || 16
                }
              >
                {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          )}

        {selectedBoxId && (
          <button
            onClick={() => deleteBox(selectedBoxId)}
            className="delete-button"
          >
            🗑️ Delete
          </button>
        )}
      </div>

      {/* 🖼️ Resume Canvas to Capture */}
      <div className="resume-canvas" ref={canvasRef}>
        {boxes.map((box, index) => (
          <Rnd
            key={box.id}
            default={{
              x: box.x,
              y: box.y,
              width: box.width,
              height: box.height,
            }}
            bounds="parent"
            onDragStop={(e, d) => {
              const newBoxes = [...boxes];
              newBoxes[index].x = d.x;
              newBoxes[index].y = d.y;
              setBoxes(newBoxes);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const newBoxes = [...boxes];
              newBoxes[index] = {
                ...newBoxes[index],
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                ...position,
              };
              setBoxes(newBoxes);
            }}
            onClick={() => setSelectedBoxId(box.id)}
            style={{ zIndex: index + 1 }}
            enableResizing={
              box.type === "line"
                ? { left: true, right: true }
                : { top: true, right: true, bottom: true, left: true }
            }
          >
            {box.type === "text" ? (
              <div
                className={`text-box ${
                  selectedBoxId === box.id ? "selected" : ""
                }`}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateHtml(box.id, e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: box.html }}
                style={{ fontSize: `${box.fontSize}px` }}
              />
            ) : (
              <hr
                className="line-element"
                style={{
                  width: "100%",
                  height: `${box.height}px`,
                  backgroundColor: "#000",
                  border: "none",
                }}
              />
            )}
          </Rnd>
        ))}
      </div>
    </div>
  );
};

export default CreateTemplate;
