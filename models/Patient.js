// import database
const db = require("../config/database");

class Patient {
  /**
   * Membuat method static all.
   */
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static create({ name, phone, address, status }) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO patients (name, phone, address, status) VALUES (?, ?, ?, ?)";
      db.query(query, [name, phone, address, status], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ insertId: results.insertId });
        }
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  }

  static update(id, { name, phone, address, status }) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE patients SET name = ?, phone = ?, address = ?, status = ? WHERE id = ?";
      db.query(query, [name, phone, address, status, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patients WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE name LIKE ?";
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE status = ?";
      db.query(query, [status], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Patient;