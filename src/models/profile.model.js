import mongoose from "mongoose";

import { Collections } from "../database/collections.js";

//PersonalInfo schema
const personalInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  placeOfBirth: {
    type: String,
    default: "",
  },
  nationality: {
    type: String,
    default: "",
  },
  educationLevel: {
    type: String,
    default: "",
  },
});

//WorkInfo schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: "",
  },
});

const workExperienceSchema = new mongoose.Schema({
  company: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
  startDate: {
    type: String,
    default: "",
  },
  endDate: {
    type: String,
    default: null,
  },
});

const workInfoSchema = new mongoose.Schema({
  skills: Array,
  projects: [projectSchema],
  workExperiences: [workExperienceSchema],
});

const additionalInfoSchema = new mongoose.Schema({
  hobbies: Array,
  goals: Array,
});

const profileSchema = new mongoose.Schema({
  personalInfo: {
    type: personalInfoSchema,
    default: {
      fullName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationality: "",
      educationLevel: "",
    },
  },
  workInfo: {
    type: workInfoSchema,
    default: {
      skills: [],
      projects: [],
      workExperience: [],
    },
  },
  additionalInfo: {
    type: additionalInfoSchema,
    default: {
      hobbies: [],
      goals: [],
    },
  },
});

const ProfileModel = mongoose.model(Collections.profiles, profileSchema);

export default ProfileModel;
