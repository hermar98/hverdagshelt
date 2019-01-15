import crypto from 'crypto';

//Generates a random string, can be used as salt
export let genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

//Hash a password with sha512
export var sha512 = function(password, salt){
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};