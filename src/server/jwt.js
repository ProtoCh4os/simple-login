import jwt from "jsonwebtoken";
import dotenv from "dotenv-safe";
dotenv.config();

export function generate({ name }) {
  try {
    var token = jwt.sign({ name }, process.env.JWT_TOKEN, {
      expiresIn: 300, // expires in 5min
    });
    return { success: true, code: 200, payload: token };
  } catch (e) {
    return { success: false, code: 500, payload: e };
  }
}

export function verify(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .json({ success: false, code: 401, payload: "No token provided." });

  jwt.verify(token, process.env.JWT_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        code: 401,
        payload: "Failed to authenticate token.",
        err: err
      });
    }
    next();
  });
}

export default {
  verify,
  generate,
};
