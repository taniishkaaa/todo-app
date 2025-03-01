const db = require('../util/database');

module.exports = class Task {
  constructor(title, body, user) {
    this.title = title;
    this.body = body;
    this.user = user;
  }

  static fetchAll(userId) {
    return db.execute('SELECT * FROM tasks WHERE user = ?', [userId]);
  }

  static save(task) {
    return db.execute(
      'INSERT INTO tasks (title, body, user) VALUES (?, ?, ?)',
      [task.title, task.body, task.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM tasks WHERE id = ?', [id]);
  }

  static async fetchTask(id) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  static update(id, task) {
    return db.execute('UPDATE tasks SET title = ?, body = ? WHERE id = ?', [task.title, task.body, id]);
  }
  
};
