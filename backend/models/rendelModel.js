import pool from "../config/db.js";

const rendelModel = {
  async getRendel() {
    const [rows] = await pool.query("SELECT * FROM rendelesek");
    return rows;
  }
};

export default rendelModel;