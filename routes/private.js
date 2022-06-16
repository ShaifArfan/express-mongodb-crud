import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get('/', checkAuth, (req, res) => {
  console.log(req.user);
  res.json("You got the private route");
})

export default router;