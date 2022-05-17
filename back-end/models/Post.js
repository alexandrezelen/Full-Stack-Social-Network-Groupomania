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
            type: Datatypes.STRING,
            allowNull: false,
            require: true
        },
        userId: {
            type: Datatypes.STRING,
            allowNull: false,
            require: true
            // validate
        }
    },
        { timestamps: true });

    Post.associate = (models) => {
        Post.hasMany(models.Comments, {
            onDelete: "cascade"
        });
    };

    return Post;
};