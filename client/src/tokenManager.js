class TokenManager {
    getJwt(): string {
        let token = localStorage.getItem('token');
        if (token) {
            return JSON.parse(token).jwt;
        } else {
            return null;
        }
    }

    getUserId(): number {
        let token = localStorage.getItem('token');
        if (token) {
            return JSON.parse(token).userId;
        } else {
            return null;
        }
    }

    addToken(token: JSON) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    updateToken(token: JSON) {
        let localToken = localStorage.getItem('token');
        if (localToken) {
            localToken = JSON.parse(localToken);
            if (token.jwt) localToken.jwt = token.jwt;
            localStorage.setItem('token', JSON.stringify(localToken));
        }
    }
}

export let tokenManager = new TokenManager();