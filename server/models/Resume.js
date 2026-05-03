import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
  title: { type: String, defualt: "Untitled Resume" },
  public: { type: Boolean, default: false },
  template: { type: String, defualt: "classic" },
  accent_color: { type: String, default: "#3B82F6" },
  professional_summary: { type: String, default: "" },
  skills: [{ type: String, default: "" }],
  persnoal_info: {
    image: { type: String, default: "" },
    full_name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  experience: [
    {
      company: { type: String },
      position: { type: String },
      start_date: { type: Date },
      end_date: { type: Date },
      description: { type: String },
      is_current: { type: Boolean },
    }
  ],
  project: [
    {
      name: { type: String },
      type: { type: String },
      description: { type: String },
    }
  ],
   education: [
    {
      institution: { type: String },
    degree: { type: String },
      field: { type:String },
      graduation_date: { type: Date },
      gpa: { type: String },
    }
  ],


},{timestamps:true,minimize:false});



const Resume = mongoose.model("Resume",ResumeSchema)

export default Resume;
