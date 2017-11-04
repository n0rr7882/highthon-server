module.exports = (sequelize, DataTypes) => {
    const comment = sequelize.define('Comment', {
        idx: {
            field: 'idx',
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        postIdx: {
            field: 'post_idx',
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        userId: {
            field: 'user_id',
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
            allowNull: false
        },
        profile: {
            field: 'profile',
            type: DataTypes.TEXT,
            allowNull: false
        },
        comment: {
            field: 'content',
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTableName: true,
            tableName: 'comment',
            timestamps: false
        });
    return comment;
};