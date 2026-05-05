import express from "express";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase config from environment variables
const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = process.env.VITE_FIREBASE_STORAGE_BUCKET || `${projectId}.appspot.com`;
const firestoreDatabaseId = process.env.VITE_FIREBASE_DATABASE_ID || '(default)';

// Initialize Firebase Admin
if (projectId) {
  admin.initializeApp({
    projectId: projectId,
    storageBucket: storageBucket,
  });
  console.log("Firebase Admin initialized with project:", projectId);
} else {
  console.warn("Firebase Project ID is missing. Ensure VITE_FIREBASE_PROJECT_ID is set.");
}

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
  cloudinary.config(cloudinaryConfig);
  console.log("Cloudinary initialized with cloud name:", cloudinaryConfig.cloud_name);
  console.log("Cloudinary API Key used:", cloudinaryConfig.api_key.substring(0, 4) + "...");
} else {
  console.warn("Cloudinary configuration is incomplete. Image uploads will fail. Ensure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.");
}

// Configure Multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Upload Image (using Cloudinary)
  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Upload to Cloudinary using a promise
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "gallery",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file!.buffer);
        });
      };

      const result: any = await uploadToCloudinary();
      
      // Return Cloudinary info to client, client will save to Firestore
      res.json({ 
        url: result.secure_url,
        cloudinaryId: result.public_id
      });
    } catch (error: any) {
      console.error("Error uploading image to Cloudinary:", error);
      res.status(500).json({ 
        error: error.message,
      });
    }
  });

  // API Route: Delete from Cloudinary
  app.post("/api/cloudinary/delete", async (req, res) => {
    try {
      const { cloudinaryId } = req.body;

      if (cloudinaryId) {
        await cloudinary.uploader.destroy(cloudinaryId);
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting from Cloudinary:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
