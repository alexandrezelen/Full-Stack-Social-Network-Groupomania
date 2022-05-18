module.exports = (sequelize, Datatypes) => {
    const Comment = sequelize.define("Comments", {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Datatypes.STRING,
            allowNull: false,
            require: true
        },
        // userId: {
        //     type: Datatypes.STRING,
        //     allowNull: false,
        //     require: true
        // },
        // postId: {
        //     type: Datatypes.STRING,
        //     allowNull: false,
        //     require: true
        // //validate
        // }
    },
        { timestamps: true });

    return Comment;
};

// module.exports = (sequelize, DataTypes) => {
//     const Comments = sequelize.define("Comments", {
//       commentBody: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     });
  
//     return Comments;
//   };