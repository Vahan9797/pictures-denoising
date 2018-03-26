'use strict';

import { readdirSync } from 'fs';
import { basename, join } from 'path';
import Sequelize from 'sequelize';
import env from '../../config/environment';
import configs from '../config/config-override';

const config    = configs[env('NODE_ENV')];
const db        = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename(__filename)) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;