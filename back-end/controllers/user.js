exports.signup = (req, res, next) => {
    /** TODO
     * puis si le mot de passe est ok, il faut le hasher, 
     * puis il faudra utiliser Sequelize pour créer un utilisateur dans la base de donnée
     * puis il faudra envoyer une réponse a l'utilsateur, soit en status 201 (utilisateur créé)
     * ou un catch, avec l'erreur 400, et le message d'erreur.
     * */
};
exports.login = (req, res, next) => {
/**TODO
 * Réutiliser le mot de passe encrypté dans le controller
 */
};

exports.getProfile = (req, res, next) => {
/**
 * retourner les données du client 
 */
};

exports.updateUser = (req, res, next) => {
/**
 * vérifier que le user qui souhaite updater soit le bon user (soit l'admin) 
 * (mutualiser avec une fonction bien précise).
 * Pour l'update de l'image de profil, créer une route spécifique.
 */
};

exports.deleteUser = (req, res, next) => {
/**
 * 
 */
};