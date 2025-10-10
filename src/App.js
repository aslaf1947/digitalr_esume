import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Home/Main";
import About from "./Home/About";
import Contact from "./Home/Contact";
import JobPage from "./Home/JobPage";
import Registration from "./Home/RegistrationPage";
import RegistrationPage from "./Home/RegistrationPage";
import LoginPage from "./Home/LoginPage";
import Template from "./Home/Template";
import DashBoard from "./Admin/DashBoard";
import Form from "./Admin/TemplateDesign";
import User from "./Admin/User";
import JobApplicant from "./Admin/JobApplicant";
import Feedback from "./Admin/Feedback";
import TemplateDesign from "./Admin/TemplateDesign";
import ApplicantRegister from "./Home/ApplicantRegister";
import ApplicantForm from "./Admin/ApplicantForm";
import UpdateApplicant from "./Admin/UpdateApplicant";
import CompanyRegister from "./Home/CompanyRegister";
import { useState } from "react";
import CompanyDash from "./company/CompanyDash";
import Companyjob from "./company/Companyjob";
import Applyjob from "./Home/Applyjob";
import ProfileCompany from "./company/ProfileCompany";
import CompanyFeedback from "./company/CompanyFeedback";
import CompanyMessage from "./company/CompanyMessage";
import CompanyApply from "./company/CompanyApply";
import UserProfile from "./Home/UserProfile";
import UserFeedback from "./Home/UserFeedback";
import Builder from "./Resume/Builder";
import ApplicationTracking from "./Home/ApplicationTracking";
import Score from "./Home/Score";
import ExampleTemp from "./Home/ExampleTemp";
import BuilderTemp2 from "./Resume/BuilderTemp2";
import CompanyTrack from "./company/CompanyTrack";
import ATSChecker from "./Home/ATSChecker";
import CreateTemplate from "./Admin/CreateTemplate";
import ViewTemplate from "./Home/ViewTemplate";

function App() {
  const [auth, Setauth] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      <BrowserRouter>
        {auth == null ? (
          <Routes>
            <Route path="/" element={<Main />} />
            {/* <Route path="/about" element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/> */}
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/companyregister" element={<CompanyRegister />} />
          </Routes>
        ) : auth.status == 0 ? (
          <Routes>
            <Route path="/admin" element={<DashBoard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/jobapplicant" element={<JobApplicant />} />
            <Route path="/user" element={<User />} />
            <Route path="/admintemplate" element={<TemplateDesign />} />
            <Route path="/applicantregister" element={<ApplicantRegister />} />
            <Route path="/applicantForm" element={<ApplicantForm />} />
            <Route path="/updateapplicant" element={<UpdateApplicant />} />
            <Route path="/createtemplate" element={<CreateTemplate />} />
          </Routes>
        ) : auth.status == 1 ? (
          <Routes>
            <Route path="/" element={<CompanyDash />} />
            <Route path="/companyjob" element={<Companyjob />} />
            <Route path="/companyprofile" element={<ProfileCompany />} />
            <Route path="/companyfeedback" element={<CompanyFeedback />} />
            <Route path="/companyreply" element={<CompanyMessage />} />
            <Route path="/companyapply" element={<CompanyApply />} />
            <Route path="/companytrack" element={<CompanyTrack />} />
          </Routes>
        ) : auth.status == 2 ? (
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/job" element={<JobPage />} />
            <Route path="/template" element={<Template />} />
            <Route path="/viewtemplate" element={<ViewTemplate />} />
            <Route path="/apply" element={<Applyjob />} />
            <Route path="userprofile" element={<UserProfile />} />
            <Route path="/userfeedback" element={<UserFeedback />} />
            <Route path="/resume-builder" element={<Builder />} />
            <Route path="/resume-buildertemp2" element={<BuilderTemp2 />} />
            <Route path="application" element={<ApplicationTracking />} />
            <Route path="/score" element={<Score />} />
            <Route path="/exampletemp" element={<ExampleTemp />} />
            <Route path="/atschecker" element={<ATSChecker />} />
          </Routes>
        ) : null}
        {/* <Routes>
    <Route path='/form' element={<Form/>}/>
    <Route path='/jobapplicant' element={<JobApplicant/>}/>
    <Route path='/user' element={<User/>}/>
 <Route path='/job' element={<JobPage/>}/>
   </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
