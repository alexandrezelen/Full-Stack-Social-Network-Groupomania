exports.signup = (req, res, next) => {
    /** TODO
     * Pour créer un utilisateur :
     * Implémenter dans le model de User le systeme de validation de l'adresse email
     * Implémenter le système de validation du mot de passe
     * vérifier que le prénom et le nom sont des mots, et pas des signe /%µ£¨$*ù$ etc.
     * puis si le mot de passe est ok, il faut le hasher, 
     * puis il faudra utiliser Sequelize pour créer un utilisateur dans la base de donnée
     * puis il faudra envoyer une réponse a l'utilsateur, soit en status 201 (utilisateur créé)
     * ou un catch, avec l'erreur 400, et le message d'erreur.
     * */
};
exports.login = (req, res, next) => {

};

exports.getProfile = (req, res, next) => {

};

exports.updateUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};