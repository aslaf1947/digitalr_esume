const { title } = require("process");
const {
  ApplicantModel,
  ValidationModel,
  UserModel,
  JobModel,
  SampleModel,
  LogoModel,
  CompanyFeedbackModel,
  FileModel,
  ResumeModel,
} = require("../model/applicant.model");
const path = require("path");
const { error } = require("console");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
exports.applicantIndex = async (req, res) => {
  try {
    const applicant = {
      ceoName: req.body.name,
      companyAddress: req.body.address,
      phoneNumber: req.body.phone,
      companyName: req.body.companyname,
      image: req.body.image,
      approval: req.body.approval,
    };
    const newApplicant = await ApplicantModel.create(applicant);
    const loginForm = {
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      regid: newApplicant._id,
      regType: "applicant",
    };
    await ValidationModel.create(loginForm);
    res.json("success");
  } catch (err) {
    console.error(err);
  }
};
// applicant view//
exports.applicantView = async (req, res) => {
  try {
    const data = await ValidationModel.find({ status: 1 }).populate("regid");
    res.json(data);
    //    console.log(data)
  } catch (err) {
    console.error(err);
  }
};

exports.appliedJobs = async (req, res) => {
  try {
    const data = await FileModel.find({ rid: req.body.userid });
    res.json(data);
    //    console.log(data)
  } catch (err) {
    console.error(err);
  }
};
//applicant delete//
exports.applicantDelete = async (req, res) => {
  try {
    const applicant = await ApplicantModel.findByIdAndDelete(req.body.id);
    if (applicant) {
      await ValidationModel.findOneAndDelete({
        regid: applicant._id,
        regType: "applicant",
      });
    }
    res.json("delete");
  } catch (error) {
    console.error(error);
  }
};
//applicant edit//
exports.applicantEditByid = async (req, res) => {
  try {
    let edit = await ApplicantModel.findById(req.body.id);
    let valid = await ValidationModel.findById(req.body.id);
    res.json({ edit, valid });
  } catch (error) {
    console.error(err);
  }
};
exports.appicantByidUpdate = async (req, res) => {
  try {
    let edit = await ApplicantModel.findByIdAndUpdate(req.body.id, req.body);
    let valid = await ValidationModel.findByIdAndUpdate(req.body.id);
    console.log({ edit, valid });
    res.json("update");
  } catch (error) {
    console.error(err);
  }
};
//loginform//
//user insert//
exports.userInsert = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      approval: req.body.approval,
    };
    const newUser = await UserModel.create(user);
    const loginForm = {
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      regid: newUser._id,
      regType: "user",
    };
    await ValidationModel.create(loginForm);
    res.json("success");
  } catch (err) {
    console.error(err);
  }
};
//user view//
exports.userView = async (req, res) => {
  try {
    const data = await ValidationModel.find({ status: 2 }).populate(
      "regid",
      "name age gender phone address"
    );
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
//login session//

exports.loginForm = async (req, res) => {
  try {
    let param = {
      email: req.body.email,
      password: req.body.password,
    };
    let user = await ValidationModel.findOne({
      email: param.email,
      password: param.password,
    });
    if (!user) {
      res.json("invalid");
    }
    if (user.password !== param.password) {
      res.json("invalid password");
    }

    if (user.status === 2) {
      // Join data dynamically using regid and regType
      user = await ValidationModel.findOne({ email: param.email }).populate({
        path: "regid",
        model: "user",
      });

      return res.json(user);
    }

    if (user.status == 1 || user.status == 0) {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
};
// job //
exports.jobInsert = async (req, res) => {
  try {
    const data = req.body;

    // Convert string to array if needed
    if (typeof data.qualification === "string") {
      data.qualification = data.qualification
        .split(",")
        .map((q) => q.trim())
        .filter(Boolean); // Remove empty strings
    }

    await JobModel.create(data);
    res.json("success");
  } catch (err) {
    console.error("Job insert error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.jobview = async (req, res) => {
  try {
    const { rid } = req.body;
    const rids = await JobModel.find({ rid }).populate("rid");
    res.json(rids);
  } catch (err) {
    console.error(err);
  }
};
exports.jobdelete = async (req, res) => {
  try {
    const data = await JobModel.findByIdAndDelete(req.body.id);
    res.json("delete");
  } catch (err) {
    console.log(error);
  }
};
exports.jobfullview = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const jobs = await JobModel.find({
      qualification: { $regex: user.qualification, $options: "i" },
    }).populate("rid", "companyName image");

    const appliedJobs = await FileModel.find({ userid: userId });
    const appliedJobIds = appliedJobs.map((a) => a.postid.toString());

    const applicationCounts = await FileModel.aggregate([
      {
        $group: {
          _id: "$postid",
          count: { $sum: 1 },
        },
      },
    ]);

    const jobApplicationMap = {};
    applicationCounts.forEach((c) => {
      jobApplicationMap[c._id.toString()] = c.count;
    });

    const jobsWithCounts = jobs.map((job) => ({
      ...job.toObject(),
      appliedCount: jobApplicationMap[job._id.toString()] || 0,
    }));

    res.json({ jobs: jobsWithCounts, appliedJobs });
  } catch (error) {
    console.error("Job full view error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.sample = async (req, res) => {
  try {
    const sample = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    };
    const newData = await SampleModel.create(sample);
  } catch (err) {
    console.log(error);
  }
};
// POST /profilecreate
exports.ProfileView = async (req, res) => {
  try {
    const { auth } = req.body; // frontend sends { auth: regid }

    const data = await ValidationModel.find({
      status: 1,
      regid: auth,
    }).populate(
      "regid",
      "companyName ceoName phoneNumber companyAddress image"
    );

    res.json(data);
    // console.log(data)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.imageInsert = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const file = req.files.image;
    const filename = Date.now() + "_" + file.name; // to prevent duplicate filenames
    const imagePath = path.join(__dirname, "../assets/", filename);

    // Move file to assets folder
    file.mv(imagePath, (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({ message: "File move error" });
      }

      // Save filename in DB
      const imageData = {
        image: filename,
        rid: req.body.rid,
      };

      LogoModel.create(imageData)
        .then((savedImage) => res.status(201).json(savedImage))
        .catch((dbError) => {
          console.error("Database Error:", dbError);
          res.status(500).json({ message: "Database Save Error" });
        });
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.imageview = async (req, res) => {
  try {
    const { rid } = req.body;
    const rids = await LogoModel.find({ rid }).populate("rid");
    res.json(rids);
  } catch (err) {
    console.error(err);
  }
};
exports.imageAndProfileUpdate = async (req, res) => {
  try {
    const {
      regid, // ApplicantModel document id
      validationId, // ValidationModel document id
      ceoName, // You can update this too if needed
      companyName,
      email,
      phoneNumber,
      companyAddress,
      password,
    } = req.body;

    let imageFilename = null;

    // 1. Handle image upload/update if provided
    if (req.files && req.files.image) {
      const file = req.files.image;
      imageFilename = Date.now() + "_" + file.name;
      const imagePath = path.join(__dirname, "../assets/", imageFilename);

      await file.mv(imagePath);
    }

    // 2. Prepare update fields for ApplicantModel
    const updateApplicantFields = {
      ceoName,
      companyName,
      phoneNumber,
      companyAddress,
    };

    if (imageFilename) {
      updateApplicantFields.image = imageFilename;
    }

    // 3. Update applicant document
    const updatedApplicant = await ApplicantModel.findByIdAndUpdate(
      regid,
      updateApplicantFields,
      { new: true }
    );

    // 4. Update validation document (email, password)
    const updatedValidation = await ValidationModel.findByIdAndUpdate(
      validationId,
      { email, password },
      { new: true }
    );

    // 5. Respond with updated data
    res.status(200).json({
      message: "Profile and image updated successfully",
      profile: updatedApplicant,
      validation: updatedValidation,
    });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
exports.imagefullview = async (req, res) => {
  try {
    const data = await LogoModel.find().populate("rid");
    res.json(data);
  } catch (err) {
    console.error(err);
  }
};
exports.companyfeedback = async (req, res) => {
  try {
    await CompanyFeedbackModel.create(req.body);
    res.json("success");
  } catch (err) {
    console.error(err);
  }
};
exports.companyfeedbackview = async (req, res) => {
  try {
    const data = await CompanyFeedbackModel.find().populate(
      "rid",
      "companyName"
    );
    res.json(data);
  } catch (err) {
    console.error("Error in companyfeedbackview:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.feedbackreply = async (req, res) => {
  try {
    const { id, reply } = req.body;

    if (!id || !reply) {
      return res.status(400).json({ error: "ID and reply are required" });
    }

    const updatedFeedback = await CompanyFeedbackModel.findByIdAndUpdate(
      id,
      { reply: reply },
      { new: true }
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Reply sent successfully", data: updatedFeedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get all feedbacks and replies for a company
exports.getFeedbackRepliesByCompanyId = async (req, res) => {
  try {
    const { rid } = req.body;

    if (!rid) {
      return res.status(400).json({ error: "Company ID (rid) is required" });
    }

    const feedbacks = await CompanyFeedbackModel.find({ rid })
      .select("message reply rating companyName createdAt")
      .sort({ createdAt: -1 }); // Optional: newest first

    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
// controller.js

exports.fileupload = async (req, res) => {
  try {
    const file = req.files?.file;
    const { rid, postid, email } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!rid || !postid) {
      return res
        .status(400)
        .json({ message: "Required fields missing (rid, postid)" });
    }

    // Validate PDF
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDF files are allowed" });
    }

    const uploadPath = path.join(__dirname, "../upload", file.name);

    // Save file to uploads directory
    file.mv(uploadPath, async (err) => {
      if (err) {
        console.error("File move error:", err);
        return res.status(500).json({ message: "Error saving the file" });
      }

      try {
        await FileModel.create({
          file: file.name,
          rid,
          postid,
          email,
          status: "pending", // optional default status
        });

        return res.json({ message: "File uploaded successfully" });
      } catch (dbError) {
        console.error("Database error:", dbError);
        return res.status(500).json({ message: "Failed to save to database" });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.userIdview = async (req, res) => {
  //   console.log("✅ /useridview endpoint hit");

  try {
    const { rid } = req.body;
    // console.log("Received RID:", rid);

    if (!rid) {
      return res.status(400).json({ error: "rid is required" });
    }

    const objectId = mongoose.Types.ObjectId.isValid(rid)
      ? new mongoose.Types.ObjectId(rid)
      : rid;

    const rids = await ValidationModel.find({ regid: objectId }).populate(
      "regid",
      "name phone address gender age"
    );

    // console.log("Fetched rids:", rids);

    if (!rids || rids.length === 0) {
      return res.status(404).json({ error: "No user found for this rid" });
    }

    res.json(rids);
  } catch (err) {
    console.error("❌ userIdview error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find()
      .populate("rid", "name")
      .populate("postid", "title"); // populate user info
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateFileStatus = async (req, res) => {
  try {
    const { fileId, status } = req.body;

    console.log("Updating file:", fileId, "to status:", status);

    if (!fileId || !status) {
      return res.status(400).json({ message: "Missing fileId or status" });
    }

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid fileId format" });
    }

    const updatedFile = await FileModel.findByIdAndUpdate(
      fileId,
      { status },
      { new: true }
    );

    if (!updatedFile) {
      return res.status(404).json({ message: "File not found" });
    }

    return res
      .status(200)
      .json({ message: `Status updated to ${status}`, updatedFile });
  } catch (error) {
    console.error("Error updating file status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.userprofile = async (req, res) => {
  try {
    const { auth } = req.body;

    if (!auth) {
      return res
        .status(400)
        .json({ error: "auth is required in the request body" });
    }

    const data = await ValidationModel.find({
      status: 2,
      regid: auth,
    }).populate("regid", "name address phone age gender qualification skills");

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.userprofileupdate = async (req, res) => {
  try {
    console.log("Full request body:", req.body);

    const {
      regid,
      name,
      phone,
      address,
      age,
      gender,
      qualification,
      skills, // optional
    } = req.body;

    if (!regid) {
      return res
        .status(400)
        .json({ error: "regid is required in the request body" });
    }

    if (!mongoose.Types.ObjectId.isValid(regid)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const existingUser = await UserModel.findById(regid);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedFields = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(address && { address }),
      ...(age && { age }),
      ...(gender && { gender }),
      ...(qualification && { qualification }),
      ...(skills && {
        skills: Array.isArray(skills)
          ? skills
          : skills?.split(",").map((s) => s.trim()),
      }),
    };

    const updatedUser = await UserModel.findByIdAndUpdate(
      regid,
      updatedFields,
      { new: true }
    );

    return res.json({ message: "Profile updated successfully", updatedUser });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.userfeedback = async (req, res) => {
  try {
    await CompanyFeedbackModel.create(req.body);
    res.json("success");
  } catch (err) {
    console.error(err);
  }
};
exports.userfeedbackview = async (req, res) => {
  try {
    const data = await CompanyFeedbackModel.find().populate("uid", "name");
    res.json(data);
  } catch (err) {
    console.error("Error in companyfeedbackview:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.userfeedbackreplay = async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "Company ID (rid) is required" });
    }

    const feedbacks = await CompanyFeedbackModel.find({ uid })
      .select("message reply rating companyName createdAt")
      .sort({ createdAt: -1 }); // Optional: newest first

    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.applyJob = async (req, res) => {
  try {
    const { userid, postid } = req.body;
    const user = await UserModel.findById(userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.appliedJobs.includes(postid)) {
      return res.status(400).json({ message: "Already applied" });
    }

    user.appliedJobs.push(postid);
    await user.save();

    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
/////job apply///
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobModel.find().populate("rid"); // populate recruiter details
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.getApprovedApplicationsByCompany = async (req, res) => {
  try {
    // console.log("🚀 Controller triggered");

    const { companyId } = req.params;
    // console.log("📥 companyId received:", companyId);

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      // console.log("❌ Invalid ObjectId format");
      return res.status(400).json({ error: "Invalid companyId" });
    }

    const jobs = await JobModel.find({ rid: companyId }).select("_id");
    // console.log("📝 Jobs found:", jobs);

    const jobIds = jobs.map((job) => job._id);

    const applications = await FileModel.find({
      postid: { $in: jobIds },
      status: "approved",
    })
      .populate("postid")
      .populate("rid");

    // console.log("✅ Approved applications:", applications.length);

    res.json(applications);
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

const PDFDocument = require("pdfkit");
const fs = require("fs");
function formatDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

exports.updateApplicationStage = async (req, res) => {
  try {
    const { applicationId, round, result } = req.body;

    const app = await FileModel.findById(applicationId).populate("postid");
    if (!app) return res.status(404).json({ error: "Application not found" });

    if (!app.roundStatus) app.roundStatus = [];

    const index = app.roundStatus.findIndex((r) => r.round === round);
    if (index > -1) {
      app.roundStatus[index].result = result;
      app.roundStatus[index].completed = true;
    } else {
      app.roundStatus.push({
        round,
        result,
        completed: true,
      });
    }

    const currentDate = new Date();
    const interviewDate = new Date(currentDate);
    interviewDate.setDate(currentDate.getDate() + 3);

    const joiningDate = new Date(currentDate);
    joiningDate.setDate(currentDate.getDate() + 7);

    const job = app.postid;

    const passedAll = ["Aptitude", "Technical", "HR"].every((r) =>
      app.roundStatus.find((s) => s.round === r && s.result === "pass")
    );

    if (passedAll) {
      app.status = "selected";

      const offersDir = path.join(__dirname, "../offers");
      if (!fs.existsSync(offersDir)) fs.mkdirSync(offersDir);

      const pdfPath = path.join(offersDir, `Offer-${applicationId}.pdf`);
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);

      // 🎨 PDF Design
      doc
        .fillColor("#1a237e")
        .fontSize(24)
        .text("OFFER LETTER", { align: "center" })
        .moveDown()
        .fontSize(14)
        .fillColor("black")
        .text(`Dear ${app.email},`)
        .moveDown()
        .text(
          `We are pleased to offer you the position of "${job.title}" at ${job.companyName}. Your talent and effort throughout the interview process have impressed us.`
        )
        .moveDown()
        .text(` Location: ${job.location}`)
        .text(` Salary: ₹${job.salary}`)
        .text(` Joining Date: ${formatDate(joiningDate)}`)
        .moveDown()
        .text(
          `Please bring original documents on the joining day and report to the HR at the mentioned location.`
        )
        .moveDown()
        .text(`Warm Regards,\n${job.companyName}`)
        .end();

      await new Promise((resolve) => writeStream.on("finish", resolve));

      // 📧 Send Offer Letter via Email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: app.email,
        subject: `🎉 Offer Letter - ${job.title} @ ${job.companyName}`,
        text: `
          Dear ${app.email},
          
          🎉 Congratulations! 🎉
          
          You have been selected for the role of **${job.title}** at **${
          job.companyName
        }**.
          
          Please find your official **offer letter** attached with this email.
          
          📍 Location: ${job.location}  
          💰 Salary: ₹${job.salary}  
          📅 Joining Date: ${formatDate(joiningDate)}
          
          We look forward to welcoming you onboard.
          
          Warm regards,  
          ${job.companyName} Recruitment Team
          `.trim(),
        attachments: [
          {
            filename: `Offer-${applicationId}.pdf`,
            path: pdfPath,
          },
        ],
      });

      // ✅ Log Offer Round
      app.roundStatus.push({
        round: "Offer",
        result: "sent",
        completed: true,
      });
    } else {
      // 📧 Send Interview Round Update
      const isPassed = result === "pass";

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: app.email,
        subject: `Interview Update: ${round} Round`,
        text: `
          Dear Candidate,
          
          You have ${
            isPassed ? "cleared" : "not cleared"
          } the **${round}** round.
          
          ${
            isPassed
              ? `📅 Your next interview round is scheduled on:
            Date: ${formatDate(interviewDate)}
            Time: 10:00 AM
            Location: Zoom / Company Campus
            
            Best of luck!`
              : `Thank you for your participation and effort. We wish you success in your future endeavors.`
          }
          
          Regards,  
          ${job.companyName} HR Team
          `.trim(),
      });
    }

    await app.save();
    res.json({ message: "Round updated successfully", application: app });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Application update failed" });
  }
};

exports.saveTemplate = async (req, res) => {
  const { name, layout } = req.body;

  try {
    const existing = await ResumeModel.findOne({ name });

    if (existing) {
      existing.layout = layout;
      await existing.save();
    } else {
      await ResumeModel.create({ name, layout });
    }

    res.json({ message: "Template saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving template", error });
  }
};
exports.getTemplatebyId = async (req, res) => {
  const Id = req.body.Id;
  const existing = await ResumeModel.findById(Id);
  res.send(existing);
};
exports.getTemplate = async (req, res) => {
  const existing = await ResumeModel.find();
  res.send(existing);
};
