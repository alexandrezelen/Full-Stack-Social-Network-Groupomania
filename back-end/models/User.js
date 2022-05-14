module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define("Users", {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Datatypes.STRING(100),
            allowNull: false,
            require: true
        },
        lastname: {
            type: Datatypes.STRING(100),
            allowNull: false,
            require: true
        },
        email: {
            type: Datatypes.STRING(150),
            allowNull: false,
            require: true
            // validate
        },
        password: {
            type: Datatypes.STRING(150),
            allowNull: false,
            require: true
        }
    },
        { timestamps: false });

    return User;
};