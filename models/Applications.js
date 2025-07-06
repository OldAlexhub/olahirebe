import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({});

const ApplicationModel = mongoose.model("applications", ApplicationSchema);

export default ApplicationModel;
