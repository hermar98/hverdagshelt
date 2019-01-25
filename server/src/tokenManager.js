import fs from 'fs';
import jwt from 'jsonwebtoken';

let secretKey = fs.readFileSync('./secret.key', 'utf8');
let expireTime = 4000;

class TokenManager {

    signToken(userId: number, rank: number): string {
        return jwt.sign({ userId: userId, rank: rank }, secretKey, {
            expiresIn: expireTime
        });
    }

    verifyToken(token: string): JSON {
        let data = null;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (!err) {
                data = {userId: decoded.userId, rank: decoded.rank};
            }
        });
        return data;
    }
}

export let tokenManager = new TokenManager();