import { prisma } from "@/utils/prisma";
import multer from "multer";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = "./public/uploads/";
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const fileName =
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName.replace(/\\/g, "/"));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        upload.single("image")(req, res, async function (err) {
          if (err) {
            console.error("File upload error:", err);
            res.status(400).json({ message: err.message });
            return;
          }

          try {
            const { title, author, publisher, year, pages } = req.body;
            const token = req.cookies.token;

            if (!token) {
              return res.status(400).json({ message: "Invalid credentials" });
            }

            const user = jwt.verify(token, process.env.JWT_SECRET);

            if (!user) {
              return res.status(400).json({ message: "Invalid credentials" });
            }

            const normalizedImagePath = path
              .normalize(req.file.path)
              .split("public")[1];

            const book = await prisma.book.create({
              data: {
                title,
                author,
                publisher,
                year: parseInt(year),
                pages: parseInt(pages),
                image: normalizedImagePath,
              },
            });

            res.json({ book });
          } catch (err) {
            console.error("Database error:", err);
            return res.status(400).json({ message: "Book already exists" });
          }
        });
        break;

      default:
        res.status(400).json({ message: "Invalid request method" });
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
