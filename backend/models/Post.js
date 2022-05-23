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
        text: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        postImage: {
            type: Datatypes.STRING,
            allowNull: false,
        },
    },
        { timestamps: true });

    return Post;
};