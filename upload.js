const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve static files (uploaded videos)
app.use("/uploads", express.static("uploads"));

// Admin upload endpoint to handle video uploads
app.post("/admin/upload_testimonial", upload.single("testimonial-video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No video file uploaded.");
  }

  // Optionally save client data (name, company) to a database or log it
  console.log("Uploaded testimonial:", req.body["client-name"], req.body["client-company"]);
  
  // Send success message
  res.send("Testimonial uploaded successfully!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
