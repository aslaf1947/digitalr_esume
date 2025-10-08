var express = require("express");
var router = express.Router();
var applicantController = require("../controller/applicantform.controller");
const { ResumeModel } = require("../model/applicant.model");

router.post("/applicant", applicantController.applicantIndex);
router.get("/applicantview", applicantController.applicantView);
router.post("/appliedjobs", applicantController.appliedJobs);
router.post("/applicantdelete", applicantController.applicantDelete);
router.post("/applicantedit", applicantController.applicantEditByid);
router.post("/applicantupdate", applicantController.appicantByidUpdate);
router.post("/user", applicantController.userInsert);
router.get("/userview", applicantController.userView);
router.post("/login", applicantController.loginForm);
router.post("/jobapply", applicantController.jobInsert);
router.post("/jobview", applicantController.jobview);
router.post("/jobdelete", applicantController.jobdelete);
router.get("/jobfullview/:uid", applicantController.jobfullview);
router.post("/sample", applicantController.sample);
router.post("/profilecreate", applicantController.ProfileView);
router.post("/imageinsert", applicantController.imageInsert);
router.post("/imageview", applicantController.imageview);
router.post(
  "/imageandprofileupdate",
  applicantController.imageAndProfileUpdate
);
router.get("/imagefullview", applicantController.imagefullview);
router.post("/companyfeedback", applicantController.companyfeedback);
router.get("/companyfeedbackview", applicantController.companyfeedbackview);
router.post("/companyfeedbackreply", applicantController.feedbackreply);
router.post(
  "/companyfeedbackreplyview",
  applicantController.getFeedbackRepliesByCompanyId
);
router.post("/useridview", applicantController.userIdview);
router.post("/fileupload", applicantController.fileupload);
router.get("/fileview", applicantController.getAllFiles);
router.post("/fileupdate", applicantController.updateFileStatus);
router.post("/userprofile", applicantController.userprofile);
router.post("/userprofileupdate", applicantController.userprofileupdate);
router.post("/userfeedback", applicantController.userfeedback);
router.get("/userfeedbackview", applicantController.userfeedbackview);
router.post("/userfeedbackreplay", applicantController.userfeedbackreplay);
router.post("/applyjob", applicantController.applyJob);
router.get("/jobfullview", applicantController.getAllJobs);
router.get(
  "/approved/:companyId",
  applicantController.getApprovedApplicationsByCompany
);
router.post("/update-stage", applicantController.updateApplicationStage);
router.post("/save-template", applicantController.saveTemplate);
router.post("/get-templatebyId", applicantController.getTemplatebyId);
router.get("/get-template", applicantController.getTemplate);

// router.put("/send-offer",applicantController.sendOfferLetter);

module.exports = router;
