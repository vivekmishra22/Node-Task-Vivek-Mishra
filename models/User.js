const { Model } = require('objection');
const db = require('../config/database');

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Task = require('./Task');
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.user_id'
        }
      }
    };
  }
}

module.exports = User;