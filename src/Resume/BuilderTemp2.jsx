import React, { useState, createContext, useContext } from "react";
import Language from "./form/Language"; 
import FormCP from "./form/FormCP";
import Preview from "./preview/Preview";
import DefaultResumeData from "./utility/DefaultResumeData";
import SocialMedia from "./form/SocialMedia";
import WorkExperience from "./form/WorkExperience";
import Skill from "./form/Skill";
import PersonalInformation from "./form/PersonalInformation";
import Summary from "./form/Summary";
import Projects from "./form/Projects";
import Education from "./form/Education";
import WinPrint from "./utility/WinPrint";
// import dynamic from "next/dynamic";
import Certification from "./form/certification";
import '../Resume/resume.css'
import { useEffect } from "react";
const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
// const Print = dynamic(() => import("../components/utility/WinPrint"), {
//   ssr: false,
// });

export default function BuilderTemp2(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        {/* <Meta
          title="ATSResume | Get hired with an ATS-optimized resume"
          description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes. Our platform uses the latest technology to analyze and optimize your resume for maximum visibility and success with applicant tracking systems. Say goodbye to frustration and wasted time spent on manual resume formatting. Create your winning resume with ATSResume today and get noticed by employers."
          keywords="ATS-friendly, Resume optimization, Keyword-rich resume, Applicant Tracking System, ATS resume builder, ATS resume templates, ATS-compliant resume, ATS-optimized CV, ATS-friendly format, ATS resume tips, Resume writing services, Career guidance, Job search in India, Resume tips for India, Professional resume builder, Cover letter writing, Interview preparation, Job interview tips, Career growth, Online job applications, resume builder, free resume builder, resume ats, best free resume builder, resume creator, resume cv, resume design, resume editor, resume maker"
        /> */}
        <div className="f-row gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
          {!formClose && (
            <form className="p-4 bg-fuchsia-600 exclude-print md:max-w-[40%] md:h-screen md:overflow-y-scroll">
              <PersonalInformation />
              <SocialMedia />
              <Summary />
              <Education />
              <WorkExperience />
              <Projects />
              {
                resumeData.skills.map((skill, index) => (
                  <Skill
                    title={skill.title}
                    key={index}
                  />
                ))
              }
              <Language />
              <Certification />
            </form>
          )}
          <Preview />
        </div>
        <FormCP formClose={formClose} setFormClose={setFormClose} />
        {/* <Print /> */}
        <WinPrint/>
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };
