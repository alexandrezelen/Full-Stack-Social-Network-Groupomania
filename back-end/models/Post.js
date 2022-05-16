module.exports = (sequelize, Datatypes) => {
    const Post = sequelize.define("Posts", {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Datatypes.STRING(100),
            allowNull: false,
            require: true
        },
        postText: {
            type: Datatypes.STRING,
            allowNull: false,
            require: true
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
            require: true
            // validate
        }
    },
        { timestamps: true });

    return Post;
};