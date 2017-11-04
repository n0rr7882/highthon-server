module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
        username: {
            field: 'username',
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTableName: true,
            tableName: 'user',
            timestamps: false
        });
    return user;
};