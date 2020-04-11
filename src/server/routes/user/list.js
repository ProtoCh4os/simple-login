import db from "../../db";

export default (data) => {
  const users = db.select({}, "users");

  if (users.length == 0) {
    return {
      success: false,
      code: 404,
      payload: "No user found",
    };
  }

  return {
    success: true,
    code: 200,
    payload: users,
  };
};
