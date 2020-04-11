import db from "../../db";

export default (data) => {
  const clients = db.select({}, "clients");

  if (clients.length == 0) {
    return {
      success: false,
      code: 404,
      payload: "No client found",
    };
  }

  return {
    success: true,
    code: 200,
    payload: clients,
  };
};
