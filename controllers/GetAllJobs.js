import JobsModel from "../models/Jobs.js";

export const GetJobs = async (req, res) => {
  try {
    const jobs = await JobsModel.find();

    res.status(200).json({ message: "All Jobs", jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetAJob = async (req, res) => {
  try {
    const job = await JobsModel.findOne({
      Job_Number: parseInt(req.params.job_number),
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const PostAJob = async (req, res) => {
  try {
    const {
      userId,
      Job_Title,
      Salary_Estimate,
      Job_Description,
      Company_Name,
      Location,
    } = req.body;

    const newJob = new JobsModel({
      userId,
      Job_Title,
      Salary_Estimate,
      Job_Description,
      Company_Name,
      Location,
    });

    await newJob.save();

    res.status(201).json({ message: `Job posted` });
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
  }
};

export const GetAJobCompany = async (req, res) => {
  try {
    const { company } = req.params;
    //console.log("Company param:", company);

    const companyJobs = await JobsModel.find({ Company_Name: company });

    if (!companyJobs || companyJobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this company." });
    }

    res.status(200).json({ message: "Company Jobs", jobs: companyJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const DeleteJob = async (req, res) => {
  try {
    const jobNumber = parseInt(req.params.job_number);

    const deletedJob = await JobsModel.findOneAndDelete({
      Job_Number: jobNumber,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
