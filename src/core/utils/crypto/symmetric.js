const crypto = require('crypto');
const AES_256_CBC = 'aes-256-cbc';

const encrypt = (data, algorithm = AES_256_CBC, key, iv) => {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

const decrypt = (data, algorithm = AES_256_CBC, key) => {
    let iv = Buffer.from(data.iv, 'hex');
    let encryptedData = Buffer.from(data.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const generateRandomKey = (bytes=32) => crypto.randomBytes(bytes)
const generateRandomIV = (bytes=16) => crypto.randomBytes(bytes)

module.exports = {
    encrypt,
    decrypt,
    generateRandomKey,
    generateRandomIV
}