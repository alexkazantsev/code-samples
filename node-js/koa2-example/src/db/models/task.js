export default (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
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
  task.associate = function (models) {
    task.belongsTo(models.user);
  };
  // INSTANCE METHODS

  return task;
}

