var mongoose = require("mongoose");
var ApplicantSchema = mongoose.Schema({
  ceoName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  approval: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  image: {
    type: String,
  },
});
var ValidationSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  regid: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "regType",

    required: true,
  },
  regType: {
    type: String,
    enum: ["applicant", "user"],
    required: true,
  },
  status: {
    type: Number,
  },
});
//user model//
var UserSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  approval: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  qualification: {
    type: String,
  },
  skills: {
    type: [String],
  },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
});
const jobSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  cateogry: { type: String },
  location: { type: String },
  salary: { type: Number },
  companyName: { type: String },
  experience: { type: String },
  qualification: { type: [String] },
  skills: { type: [String] },
  postedDate: { type: Date, default: Date.now },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "applicant",
  },
});
const logoSchema = mongoose.Schema({
  image: {
    type: String,
  },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "applicant",
  },
});
const companyfeedbackSchema = mongoose.Schema({
  message: {
    type: String,
  },
  rating: {
    type: Number,
  },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "applicant",
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: Number,
  },
  reply: { type: String, default: "" },
});
const fileSchema = mongoose.Schema({
  file: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  email: {
    type: String,
  },
  rid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  postid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
  },
  roundStatus: [
    {
      round: String, // "Aptitude", "Technical", "HR"
      result: String, // "pass" | "fail"
      completed: Boolean,
    },
  ],
});
const ResumeSchema = new mongoose.Schema({
  name: {
    type: String, // Template name
    required: true,
  },
  layout: {
    type: Array, // Layout data from frontend (boxes)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ApplicantModel = mongoose.model("applicant", ApplicantSchema);
const ValidationModel = mongoose.model("validation", ValidationSchema);
const UserModel = mongoose.model("user", UserSchema);
const JobModel = mongoose.model("job", jobSchema);
const LogoModel = mongoose.model("logo", logoSchema);
const FileModel = mongoose.model("file", fileSchema);
const ResumeModel = mongoose.model("ResumeTemplate", ResumeSchema);
const CompanyFeedbackModel = mongoose.model(
  "companyfeedback",
  companyfeedbackSchema
);

module.exports = {
  ApplicantModel,
  ValidationModel,
  UserModel,
  JobModel,
  LogoModel,
  CompanyFeedbackModel,
  FileModel,
  ResumeModel,
};
