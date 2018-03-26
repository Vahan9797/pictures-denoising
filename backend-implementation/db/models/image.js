'use strict';
export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    user_id: DataTypes.INTEGER
  }, {});
  Image.associate = (models) => {
    Image.belongsTo(models.Todo, {
    	foreignKey: 'user_id',
    	onDelete: 'CASCADE'
    });
  };
  return Image;
};