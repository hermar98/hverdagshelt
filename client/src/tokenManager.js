import service from "./services/Service";

class TokenManager {
    getJwt(): string {
        let token = localStorage.getItem('token');
        if (token) {
            return JSON.parse(token).jwt;
        } else {
            return null;
        }
    }

    getNewToken(): Promise<JSON> {
        let token = localStorage.getItem('token');
        if (token) token = JSON.parse(token).jwt;
        return service.get('/token', {
            headers: {'x-access-token': token}
        });
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

    deleteToken() {
        localStorage.removeItem('token');
    }
}

export let tokenManager = new TokenManager();