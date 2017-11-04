module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('Post', {
        idx: {
            field: 'idx',
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            field: 'username',
            type: DataTypes.STRING,
            primaryKey: true
        },
        isOpen: {
            field: 'is_open',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
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
            tableName: 'post',
            timestamps: false
        });
    return post;
};