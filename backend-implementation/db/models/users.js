'use strict';
export default (sequelize, { TEXT, STRING, INTEGER }) => {
  const Users = sequelize.define('Users', {
    username: {
      type: STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: TEXT,
      allowNull: false,
      unique: true
    },
    password_digest: {
      type: TEXT,
      allowNull: false
    },
    age: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0
      }
    }
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Image, {
      foreignKey: 'img_id',
      as: 'Images'
    });
  };
  return Users;
};