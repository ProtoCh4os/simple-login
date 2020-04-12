import db from "../db";
import jwt from "../jwt";
import { SHA256 } from "crypto-js";

export default (data) => {
  var form = data.body;
  form.pass = SHA256(form.pass).toString();

  const userExists = db.select({ name: form.name }, "users");

  if (userExists.length > 0) {
    return {
      success: false,
      code: 409,
      payload: "User exists",
    };
  }

  var op = db.insert(form, "users");
  if (op.success) {
    const token = jwt.generate(form);
    if (token.success) {
      return {
        success: true,
        code: 201,
        payload: {
          message: "User created",
          token: token.payload,
        },
      };
    } else {
      return {
        success: true,
        code: 201,
        payload: {
          message: "User created",
          token: null,
        },
      };
    }
  }
  return op;
};
