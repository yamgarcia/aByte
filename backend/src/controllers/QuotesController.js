const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      //2nd 01:30:00 paging
      const [count] = await connection("quotes").count();
      const quotes = await connection("quotes")
        .join("users", "users.id", "=", "quotes.users_id")
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          "quotes.*",
          "users.name",
          "users.email",
          "users.phone",
          "users.country",
          "users.state",
        ]);
      res.header("X-Total-Count", count["count(*)"]);

      return res.json({ quotes });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  },

  async create(req, res) {
    try {
      const { quote_author, quote_text } = req.body;
      const users_id = req.headers.authorization;

      const [id] = await connection("quotes").insert({
        quote_author,
        quote_text,
        users_id,
      });
      return res.json({ id });
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const users_id = req.headers.authorization;

      const quote = await connection("quotes")
        .where("id", id)
        .select("users_id")
        .first();

      if (quote.users_id != users_id) {
        return res
          .status(401)
          .json({ error: "Unauthorized - Operation not permitted" });
      }

      await connection("quotes").where("id", id).delete();
      return res.status(204).send();
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server error");
    }
  },
};
//---------------------01:16:00
