const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: err.message });
  }
});

// GET course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: err.message });
  }
});

// POST create new course
router.post("/", async (req, res) => {
  try {
    const { title, description, instructorName, price, category } = req.body;
    if (!title || !description || !instructorName || !price || !category) {
      return res
        .status(400)
        .json({
          message:
            "Title, description, instructor name, price, and category are required",
        });
    }
    const newCourse = new Course({
      title,
      description,
      instructorName,
      price,
      category,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating course", error: err.message });
  }
});

// PUT update course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const { title, description, instructorName, price, category } = req.body;
    if (title) course.title = title;
    if (description) course.description = description;
    if (instructorName) course.instructorName = instructorName;
    if (price !== undefined) course.price = price;
    if (category) course.category = category;
    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating course", error: err.message });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting course", error: err.message });
  }
});

module.exports = router;
