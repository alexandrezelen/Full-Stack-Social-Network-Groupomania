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
            require: true,
            unique: true,
            validate: {
                isEmail: true,            // checks for email format (foo@bar.com)
                notEmpty: true,           // don't allow empty strings
            }
        },
        password: {
            type: Datatypes.STRING(150),
            allowNull: false,
            require: true,
            validate:{
                isLowercase: true,        // checks for lowercase
                isUppercase: true,        // checks for uppercase
                min: 8,                  // only allow values >= 8
                isAlphanumeric: true,     // will only allow alphanumeric characters, so "_abc" will fail
                notEmpty: true,           // don't allow empty strings
            }
        }
    },
        { timestamps: false });

    return User;
};