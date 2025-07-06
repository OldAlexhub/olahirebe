import ApplicantModel from "../models/ApplicantModel.js";

// 1. CREATE (Post)
export const PostApplicant = async (req, res) => {
  try {
    const {
      userId,
      applicantName,
      email,
      phone,
      jobNumber,
      institution,
      highestEdu,
      fieldOfStudy,
      educationStartDate,
      educationEndDate,
      company1,
      position1,
      experienceStartDate1,
      experienceEndDate1,
      responsibilities1,
      company2,
      position2,
      experienceStartDate2,
      experienceEndDate2,
      responsibilities2,
      company3,
      position3,
      experienceStartDate3,
      experienceEndDate3,
      responsibilities3,
      skills,
    } = req.body;

    if (
      !userId ||
      !applicantName ||
      !email ||
      !phone ||
      !institution ||
      !fieldOfStudy ||
      !educationStartDate ||
      !company1 ||
      !position1 ||
      !experienceStartDate1 ||
      !responsibilities1 ||
      !skills
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const newApplicant = new ApplicantModel(req.body);
    const savedApplicant = await newApplicant.save();
    res.status(201).json(savedApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// 2. READ (Get)
export const GetResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await ApplicantModel.findOne({ userId });
    //console.log(user);
    if (!user) {
      return res.status(404).json({ message: `User data not found` });
    }

    res.status(200).json({ message: `Resume`, user });
  } catch (error) {
    res.status(500).json({ message: `Server error` });
  }
};

// 3. UPDATE
export const UpdateApplicant = async (req, res) => {
  try {
    const { userId } = req.params;
    const updated = await ApplicantModel.findOneAndUpdate(
      { userId },
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    res.status(200).json({ message: "Applicant updated", updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during update." });
  }
};

// 4. DELETE ONE
export const DeleteApplicant = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await ApplicantModel.findOneAndDelete({ userId });

    if (!deleted) {
      return res.status(404).json({ message: "Applicant not found." });
    }

    res.status(200).json({ message: "Applicant deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Server error during deletion." });
  }
};
