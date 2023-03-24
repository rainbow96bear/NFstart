import express from "express";
const router = express.Router();

router.get("/get", (req, res) => {
  let theme: string;
  if (req.cookies.theme) {
    theme = req.cookies.theme;
  } else {
    theme = "light";
  }
  res.cookie("theme", theme, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  res.send({ theme });
});

router.put("/set", (req, res) => {
  let theme = "light";
  if (req.cookies.theme == "dark") {
    theme = "light";
  } else if (req.cookies.theme == "light") {
    theme = "dark";
  }
  res.cookie("theme", theme, {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  });
  res.send({ theme });
});

export default router;
