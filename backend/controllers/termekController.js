import TermekModel from "../models/termekModel.js";

const TermekController = {
  async getAll(req, res) {
    try {
      const termekek = await TermekModel.getAll();
      res.json(termekek);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hiba történt a termékek lekérése során." });
    }
  },

  async getById(req, res) {
    try {
      const termekek = await TermekModel.getById(req.params.id);
      if (termekek) {
        res.json(termekek);
      } else {
        res.status(404).json({ error: "A termék nem található." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hiba történt a termék lekérése során." });
    }
  },

  async create(req, res) {
    try {
      if (!req.body.nev || !req.body.ar || !req.body.keszlet) {
        return res.status(400).json({ error: "Az összes mező kitöltése kötelező." });
      }
      
      const newTermek = await TermekModel.create(req.body);
      res.status(201).json(newTermek);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hiba történt a termék létrehozása során." });
    }
  }
};

export default TermekController;