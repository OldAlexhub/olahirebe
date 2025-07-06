import mongoose from "mongoose";
import validator from "validator";

// Define schema
const UserSchema = new mongoose.Schema(
  {
    user_id: { type: Number, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    password: { type: String, minlength: 8, required: true },
    confirmPassword: {
      type: String,
      default: undefined,
      select: false,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\+?[0-9]{10,15}$/.test(value);
        },
        message: "Invalid phone number format",
      },
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.user_id != null) return next(); // already set

  try {
    const lastUser = await this.constructor.findOne(
      {},
      {},
      { sort: { user_id: -1 } }
    );
    this.user_id = lastUser?.user_id ? lastUser.user_id + 1 : 1000; // starts at 1000
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
