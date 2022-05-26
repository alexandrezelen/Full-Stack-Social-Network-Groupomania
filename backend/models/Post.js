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
            allowNull: true,
        },
        postImage: {
            type: Datatypes.STRING(255),
            allowNull: true,
        },
    },
        { timestamps: true });

    return Post;
};