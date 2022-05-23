module.exports = (sequelize, Datatypes) => {
    const Role = sequelize.define("Roles", {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        function: {
            type: Datatypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
        { timestamps: false }
    );

    return Role;
};