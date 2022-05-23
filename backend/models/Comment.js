module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define("Comments", {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Datatypes.TEXT,
            allowNull: false,
            require: true
        },
    },
        { timestamps: true });

    return Comment;
};