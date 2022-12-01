const mongoose = require("mongoose");

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  images: [{ type: String }],
  technologies: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  gitHubLink: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("project", projectSchema);
