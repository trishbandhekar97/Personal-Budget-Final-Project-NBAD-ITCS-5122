const bcrypt = require('bcrypt');

const validatePassword = async (plainTextPassword, hashedPassword) => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = validatePassword;
