import fs from "fs";

function getDb() {
  if (!fs.existsSync("db.json")) {
    const def = {
      users: [],
      clients: [],
    };
    fs.writeFileSync("db.json", JSON.stringify(def));
    return def;
  } else {
    return JSON.parse(fs.readFileSync("db.json", { encoding: "utf8" }));
  }
}

function setDb(db = getDb()) {
  fs.writeFileSync("db.json", JSON.stringify(db));
}

function insert(data, table) {
  const db = getDb();
  db[table].push(data);
  setDb(db);

  return {
    success: true,
    code: 201,
    payload: `Data stored in ${table}`,
  };
}

function select(data, table) {
  const db = getDb()[table];

  return (
    db.filter((current) => {
      var found = true;
      Object.keys(data).forEach((field) => {
        if (current[field] === undefined) found = false;
        found = current[field] == data[field] && found;
      });
      if (found) return true;
      return false;
    })
  );
}

export default {
  insert,
  select,
};
