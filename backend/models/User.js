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
            require: true,
            validate: {
                isAlpha: true,
                notEmpty: true
            }
        },
        lastname: {
            type: Datatypes.STRING(100),
            allowNull: false,
            require: true,
            validate: {
                isAlpha: true,
                notEmpty: true,
            }
        },
        email: {
            type: Datatypes.STRING(150),
            allowNull: false,
            require: true,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: Datatypes.STRING(150),
            allowNull: false,
            require: true,
        },
        isAdmin: {
            type: Datatypes.BOOLEAN,
            defaultValue: false,
        },
    },
        { timestamps: false });
    return User;
};