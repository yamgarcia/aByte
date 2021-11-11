const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
  async index(req, res) {
    try {
      const users = await connection("users").select("*");
      return res.json(users);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  },

  async create(req, res) {
    // const data = req.querry; // access querry params. users?name=Marcos
    // const data = req.params; // access route params. users/1 when app.get("/users/:id")
    // const data = req.body; // access body data to create or change resources.
    const { name, email, phone, country, state } = req.body;
    const id = crypto.randomBytes(4).toString("HEX");

    try {
      await connection("users").insert({
        id,
        name,
        email,
        phone,
        country,
        state,
      });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }

    return res.json({ id });
  },
};
