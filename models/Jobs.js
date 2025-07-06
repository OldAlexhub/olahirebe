import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  Job_Title: { type: String, required: true },
  Salary_Estimate: { type: String, required: false },
  Job_Description: { type: String, required: true },
  Company_Name: { type: String, required: true },
  Location: { type: String, required: true },
  Job_Number: { type: Number, unique: true },
});

// Auto-increment Job_Number before save
JobsSchema.pre("save", async function (next) {
  if (this.Job_Number != null) return next(); // already set

  try {
    const lastJob = await this.constructor.findOne(
      {},
      {},
      { sort: { Job_Number: -1 } }
    );
    this.Job_Number = lastJob?.Job_Number ? lastJob.Job_Number + 1 : 5000; // start from 1000
    next();
  } catch (err) {
    next(err);
  }
});

const JobsModel = mongoose.model("jobs", JobsSchema);

export default JobsModel;
