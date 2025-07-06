import { Router } from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  GetJobs,
  GetAJob,
  PostAJob,
  GetAJobCompany,
  DeleteJob,
} from "../controllers/GetAllJobs.js";
import { Login, Signup } from "../controllers/Login&Signup.js";
import {
  GetResume,
  PostApplicant,
  UpdateApplicant,
  DeleteApplicant,
} from "../controllers/Post&GetApplicant.js";
import {
  GetApplication,
  GetApplicationsCompany,
} from "../controllers/Post&GetApplications.js";
import {
  adminLogin,
  adminSignup,
  SentInfo,
} from "../controllers/AdminLogin&Signup.js";

const router = Router();

router.get("/alljobs", GetJobs);
router.get("/ajob/:job_number", GetAJob);

router.post("/signup", Signup);
router.post("/login", Login);

router.post("/applicant", PostApplicant);
router.get("/applicant/:userId", GetResume);
router.put("/applicant/:userId", UpdateApplicant);
router.delete("/applicant/:userId", DeleteApplicant);
router.get("/getapps/:userId", GetApplication);

//admins
router.post("/adminsignup", adminSignup);
router.post("/adminlogin", adminLogin);
router.get("/admininfo/:userId", SentInfo);
router.post("/postajob", PostAJob);
router.get("/getonecompanyjobs/:company", GetAJobCompany);
router.delete("/deletejob/:job_number", DeleteJob);
router.get("/applicantcompany/:company", GetApplicationsCompany);

export default router;
