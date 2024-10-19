const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}
const comparePassword = (password, hashedPassword) => {
    console.log('Password provided:', password); 
    console.log('Hashed password from DB:', hashedPassword);
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword }