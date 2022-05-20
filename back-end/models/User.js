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
                isAlpha: true,            // will only allow letters                isLowercase: true,
                notEmpty: true          // don't allow empty strings
            }
        },
        lastname: {
            type: Datatypes.STRING(100),
            allowNull: false,
            require: true,
            validate: {
                isAlpha: true,            // will only allow letters                isLowercase: true,
                notEmpty: true,           // don't allow empty strings
            }
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
        },

    },
        { timestamps: false });

    // User.associate = (models) => {
    //     User.hasMany(models.Posts, {
    //         onDelete: "cascade"
    //     });
    // };

    return User;
};