import ApplicationModel from "../models/Applications.js";

export const GetApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const jobs = await ApplicationModel.find({ userId: Number(userId) });

    res.status(200).json({ message: `Job Data`, jobs });
  } catch (error) {
    res.status(500).json({ message: `Server error` });
  }
};

export const GetApplicationsCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const applicants = await ApplicationModel.find({ company });
    if (!applicants) {
      return res.status(401).json({ message: "No applicants" });
    }

    res.status(200).json({ message: `applicants`, applicants });
  } catch (error) {
    res.status(500).json({ message: `Server Error` });
  }
};

