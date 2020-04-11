import { verify as verifyJWT } from "../../jwt";
import list from "./list";

import { Router } from "express";
var router = Router();

router.get("/list", verifyJWT, (req, res) => {
  const op = list(req);
  res.status(op.code).json(op);
});

export default router;
