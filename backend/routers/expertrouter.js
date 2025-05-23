const express = require("express");
const Model = require("../models/expertModel");
const router = express.Router();
const jwt = require("jsonwebtoken"); 

// Add a new expert
router.post("/add", (req, res) => {
  console.log(req.body);

  new Model(req.body).save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        res.status(400).json({ message: "Expert already exists" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    });
});

// Get all experts
router.get("/getall", (req, res) => {
  Model.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get expert by ID
router.get("/getbyid/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Expert not found" });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get expert's articles
router.get("/:id/articles", (req, res) => {
  Model.findById(req.params.id)
    .populate("articles")
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Expert not found" });
      res.status(200).json(result.articles || []);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Update expert profile
router.put("/update/:id", (req, res) => {
  const updates = req.body;
  updates.updatedAt = new Date();

  Model.findByIdAndUpdate(req.params.id, updates, { new: true })
    .then((result) => {
      if (!result) return res.status(404).json({ message: "Expert not found" });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Login expert
router.post("/login", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) {
        // email and password match
        // generate token

        const { _id, firstName, lastName, email } = result;
        const payload = { _id, firstName, lastName, email };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) {
              console.log(err);
              res.status(500).json(err);
            } else {
              res.status(200).json({ token });
            }
          }
        );
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = router;
