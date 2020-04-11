import db from "../db";
import jwt from "../jwt";

export default (data) => {
  const form = data.body;

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
