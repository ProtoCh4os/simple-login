import db from "../../db";

export default (data) => {
  const form = data.body;

  db.insert(form, "clients");
  return {
    success: true,
    code: 201,
    payload: "Client created",
  };
};
