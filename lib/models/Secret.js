const pool = require('../utils/pool');

module.exports = class Secret{
  id;
  title;
  description;
  created_at;

  constructor(row){
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.created_at = row.created_at;
  }
  static async insert({ title, description }){
    const { rows } = await pool.query(`
        INSERT INTO secret (title, description)
        VALUES ($1, $2)
        RETURNING *`, [title, description]);

    return new Secret(rows[0]);
  }
};
