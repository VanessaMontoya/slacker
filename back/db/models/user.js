'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true, 
      validate: {notEmpty: true, 
        isUnique: function (value, next) {
                    var self = this;
                    User.find({where: {username: value}})
                        .then(function (user) {
                            // reject if a different user wants to use the same Username
                            if (user && self.id !== user.id) {
                                return next('Username already in use!');
                            }
                            return next();
                        })
                        .catch(function (err) {
                            return next(err);
                        });
                } }},
    password: {type: DataTypes.STRING, validate: {notEmpty: true}}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsTo(models.Team)
        User.belongsTo(models.Chatroom)
        User.hasMany(models.Message)
      }
    }
  });
  return User;
};