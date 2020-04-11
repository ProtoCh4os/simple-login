import { Router } from "express";
var router = Router();

import login from "./login";
import signup from "./signup";
import user from "./user";
import client from "./client";

router.post("/login", (req, res) => {
  const op = login(req);
  return res.status(op.code).json(op);
});

router.post("/signup", (req, res) => {
  const op = signup(req);
  return res.status(op.code).json(op);
});

router.use("/user", user);
router.use("/client", client);

export default router;
