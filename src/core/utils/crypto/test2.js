const crypto = require('crypto');

if("generateKeyPairSync" in crypto){
    let { generateKeyPairSync } = crypto;
    return { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret'
      }
    });
}
else{
    var prime_length = 60;
    var diffHell = crypto.createDiffieHellman(prime_length);
    
    diffHell.generateKeys('base64');
    console.log("Public Key : " ,diffHell.getPublicKey('base64'));
    console.log("Private Key : " ,diffHell.getPrivateKey('base64'));
    
    console.log("Public Key : " ,diffHell.getPublicKey('hex'));
    console.log("Private Key : " ,diffHell.getPrivateKey('hex'));
}

export default {
    generateKeyPairSync
} 