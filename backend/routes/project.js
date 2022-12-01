const router = require("express").Router();
const Project = require("../models/Project");

const withAuth = require("../middlewares/auth");

// Create
router.post("/", withAuth, async (req, res) => {
  const project = new Project({
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    longDescription: req.body.longDescription,
    images: req.body.images,
    technologies: req.body.technologies,
    createdAt: req.body.date,
    gitHubLink: req.body.gitHubLink
  });

  try {
    const savedProject = await project.save();
    res.json({
      success: true,
      data: savedProject,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

// Read One
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
    });

    res.json({
      success: true,
      data: project,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

// Update
router.patch("/:id", withAuth, async (req, res) => {
  try {
    const updatedProject = await Project.updateOne(
      {
        _id: req.params.id,
      },
      {
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        images: req.body.images,
        technologies: req.body.technologies,
        gitHubLink: req.body.gitHubLink
      }
    );

    res.json({
      success: true,
      updated: updatedProject.modifiedCount,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

// Delete
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const name = await Project.findOne({ _id: req.params.id });
    await Project.deleteOne({ _id: req.params.id});

    res.json({
      success: true,
      message: `${name.title} foi deletado.`,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err,
    });
  }
});

module.exports = router;
