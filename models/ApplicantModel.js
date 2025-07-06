import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Education Details
  institution: { type: String, required: true },
  highestEdu: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  educationStartDate: { type: Date, required: true },
  educationEndDate: { type: Date, required: false },

  // First Work Experience
  company1: { type: String, required: true },
  position1: { type: String, required: true },
  experienceStartDate1: { type: Date, required: true },
  experienceEndDate1: { type: Date, required: false },
  responsibilities1: { type: String, required: true },

  // Second Work Experience
  company2: { type: String, required: false },
  position2: { type: String, required: false },
  experienceStartDate2: { type: Date, required: false },
  experienceEndDate2: { type: Date, required: false },
  responsibilities2: { type: String, required: false },

  // Third Work Experience
  company3: { type: String, required: false },
  position3: { type: String, required: false },
  experienceStartDate3: { type: Date, required: false },
  experienceEndDate3: { type: Date, required: false },
  responsibilities3: { type: String, required: false },

  // Skills and Additional Information
  skills: { type: String, required: true }, // Assuming skills can be entered as a comma-separated string

  // Application Status
  applicationDate: { type: Date, default: Date.now },
});

const ApplicantModel = mongoose.model("Applicant", ApplicantSchema);

export default ApplicantModel;
