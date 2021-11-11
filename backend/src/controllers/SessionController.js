const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.body;

      const user = await connection("users")
        .where("id", id)
        .select("name")
        .first();

      if (!user) {
        return res.status(400).json({ error: "ID doesn't match any user" });
      }
      return res.json(user);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  },
};
