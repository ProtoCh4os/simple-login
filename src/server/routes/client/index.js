import create from "./create";
import list from "./list";
import { verify as verifyJWT } from "../../jwt";

import { Router } from "express";
var router = Router();

router.post("/create", verifyJWT, (req, res) => {
  const op = create(req);
  res.status(op.code).json(op);
});

router.get("/list", verifyJWT, (req, res) => {
  const op = list(req);
  res.status(op.code).json(op);
});

export default router;
