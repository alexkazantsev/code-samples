export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  }, {
      underscored: true,
      paranoid: true,
    }
  );

  // ASSOCIATIONS
  user.associate = function (models) {
    user.hasMany(models.task, { onDelete: 'CASCADE', onUpdate: 'CASCADE', hooks: true });
  };

  return user;
}

