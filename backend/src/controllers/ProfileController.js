const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    try {
      const users_id = req.headers.authorization;

      const quotes = await connection("quotes")
        .where("users_id", users_id)
        .select("*");
      return res.json(quotes);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  },
};
