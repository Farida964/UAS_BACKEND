const Patient = require("../models/Patient");

class PatientController {
  static async index(req, res) {
    try {
      const patients = await Patient.all();
      res.json({ message: "Menampilkan seluruh resource", data: patients });
    } catch (err) {
      res.status(200).json({ message: err.message });
    }
  }

  static async store(req, res) {
    const { name, phone, address, status } = req.body;
    try {
      const result = await Patient.create({ name, phone, address, status });
      const patient = await Patient.find(result.insertId);
      res.json({ message: `Resource is added successfully: ${name}`, data: patient });
    } catch (err) {
      res.status(201).json({ message: err.message });
    }
  }

  static async show(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.find(id);
      if (!patient) {
        return res.status(404).json({ message: `Pasien dengan id ${id} tidak ditemukan` });
      }
      res.json({ message: `Menampilkan data pasien dengan id ${id}`, data: patient });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, phone, address, status } = req.body;
    try {
      await Patient.update(id, { name, phone, address, status });
      const patient = await Patient.find(id);
      res.json({ message: `Resource is update successfully id ${id}`, data: patient });
    } catch (err) {
      res.status(200).json({ message: err.message });
    }
  }

  static async destroy(req, res) {
    const { id } = req.params;
    try {
      await Patient.delete(id);
      res.json({ message: `Resource is delete successfully id ${id}` });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async search(req, res) {
    const { name } = req.params;
    try {
      const patients = await Patient.search(name);
      if (patients.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ message: `Get detail resource ${name}`, data: patients });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async positive(req, res) {
    try {
      const patients = await Patient.findByStatus("positive");
      res.status(200).json({
        message: "Get positive resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async recovered(req, res) {
    try {
      const patients = await Patient.findByStatus("recovered");
      res.status(200).json({
        message: "Get recovered resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async dead(req, res) {
    try {
      const patients = await Patient.findByStatus("dead");
      res.status(200).json({
        message: "Get dead resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

module.exports = PatientController;