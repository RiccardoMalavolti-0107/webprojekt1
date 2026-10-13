import rendelModel from '../models/rendelModel.js';

const rendelController = {
  async getRendel(req, res) {
    try {
      const rendel = await rendelModel.getRendel();
      res.json(rendel);
    } catch (error) {
      console.error("Error fetching rendel:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default rendelController;