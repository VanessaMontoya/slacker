'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING, 
      unique: true, 
      validate: {notEmpty: true}
    },
    password: {type: DataTypes.STRING, validate: {notEmpty: true}},
    currentTeam: {type:DataTypes.INTEGER},
    bio: {type:DataTypes.STRING(2000)}
  }, 
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsToMany(models.Team, {through: 'Company'})
        User.belongsToMany(models.Chatroom, {through: 'User_Chat'})
        User.hasMany(models.Message)
      }
    }
  });
  return User;
};