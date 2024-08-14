import { DataTypes } from 'sequelize';
import { db } from '../database.js';

export const Task = db.define('Task', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});