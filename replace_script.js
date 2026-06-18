const fs = require("fs");
const path = require("path");

const replacements = {
  "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.35.31.webp?updatedAt=1781262749583":
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.35.31.webp?updatedAt=1781262749583",
  "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.34.25.webp?updatedAt=1781262749704":
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.34.25.webp?updatedAt=1781262749704",
  "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.36.19.webp?updatedAt=1781262749690":
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Screenshot%202026-06-12%20at%2013.36.19.webp?updatedAt=1781262749690",
  "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Untitled1057_20260612144610.webp?updatedAt=1781262749609":
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/Untitled1057_20260612144610.webp?updatedAt=1781262749609",
  "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/IMG_9692.webp?updatedAt=1781262749703":
    "https://ik.imagekit.io/qinvi/3d/2026/juni2026/ClevertIvana/IMG_9692.webp?updatedAt=1781262749703",
  "Clevert & Ivana": "Clevert & Ivana",
  "Clevert & Ivana": "Clevert & Ivana",
  Tema3dClevertIvana: "Tema3dClevertIvana",
  "July 25, 2026 12:00:00": "July 25, 2026 12:00:00",
  "https://qinvi-worker.kesone01.workers.dev/2026/juni26/ci.mp4":
    "https://qinvi-worker.kesone01.workers.dev/2026/juni26/ci.mp4",
  "https://qinvi-worker.kesone01.workers.dev/Music/Brian McKnight - Back At One (Lyrics) (mp3cut.net).mp3":
    "https://qinvi-worker.kesone01.workers.dev/Music/Brian McKnight - Back At One (Lyrics) (mp3cut.net).mp3",
};

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        walkDir(fullPath);
      }
    } else {
      if ([".html", ".vue", ".ts", ".js"].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, "utf8");
        let newContent = content;
        for (let [k, v] of Object.entries(replacements)) {
          newContent = newContent.split(k).join(v);
        }
        if (newContent !== content) {
          fs.writeFileSync(fullPath, newContent, "utf8");
          console.log("Updated", fullPath);
        }
      }
    }
  });
}

walkDir(".");
