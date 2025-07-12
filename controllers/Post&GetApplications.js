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

export const UpdateApplicationStatus = async (req, res) => {
  try {
    const { userId, jobNumber } = req.params;
    const { status } = req.body;

    console.log("Incoming userId:", userId);
    console.log("Incoming jobNumber:", jobNumber);

    // Match: userId must be Number, jobNumber must be String
    const app = await ApplicationModel.findOne({
      userId: Number(userId),
      jobNumber: String(jobNumber),
    });

    console.log("Found?", !!app);

    const allowedStatuses = [
      "received",
      "reviewed",
      "considered",
      "not selected",
      "selected for interview",
    ];

    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await ApplicationModel.findOneAndUpdate(
      {
        userId: Number(userId),
        jobNumber: String(jobNumber),
      },
      { $set: { status: status.toLowerCase() } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", applications: updated });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
