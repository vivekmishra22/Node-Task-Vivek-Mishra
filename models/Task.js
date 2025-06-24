const { Model } = require('objection');
const db = require('../config/database');

Model.knex(db);

class Task extends Model {
  static get tableName() {
    return 'tasks';
  }

  static get relationMappings() {
    const User = require('./User');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Task;