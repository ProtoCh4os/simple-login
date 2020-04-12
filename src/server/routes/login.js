import db from "../db";
import jwt from "../jwt";
import { SHA256 } from "crypto-js";

export default (data) => {
  var form = data.body;
  form.pass = SHA256(form.pass).toString();

  const user = db.select(form, "users");
  if (user.length == 0) {
    return {
      success: false,
      code: 404,
      payload: "User not found",
    };
  }

  const token = jwt.generate(form);
  if (token.success) {
    return {
      success: true,
      code: 200,
      payload: {
        message: "Login successful",
        token: token.payload,
      },
    };
  } else {
    return {
      success: true,
      code: 500,
      payload: {
        message: "Unable to create JWT",
        token: null,
      },
    };
  }
};
