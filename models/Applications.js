import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
  status: {
    type: String,
    enum: [
      "received",
      "reviewed",
      "considered",
      "not selected",
      "selected for interview",
    ],
    default: "received",
  },
});

const ApplicationModel = mongoose.model("applications", ApplicationSchema);

export default ApplicationModel;
