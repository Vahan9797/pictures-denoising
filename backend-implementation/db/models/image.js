'use strict';
export default (sequelize, { STRING }) => {
  const Image = sequelize.define('Image', {
    filePath: {
      type: STRING,
      allowNull: true
    }
  }, {});
  Image.associate = (models) => {
    Image.belongsTo(models.Users, {
    	foreignKey: 'img_id',
    	onDelete: 'CASCADE'
    });
  };
  return Image;
};