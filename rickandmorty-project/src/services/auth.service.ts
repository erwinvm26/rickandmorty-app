import jwt_decode from "jwt-decode";

class AuthService {
  private token: string;
  constructor() {
    this.token = localStorage.getItem("user_token") ?? "";
  }

  login() {}

  register() {}

  logout() {}

  id() {
    const { user } = jwt_decode(this.token) as {
      user: {
        op: number;
      };
    };

    return user.op;
  }

  isTokenExpired(): boolean {
    try {
      const { exp } = jwt_decode(this.token) as {
        exp: number;
      };

      const expirationDatetimeInSeconds = exp * 1000;

      const expirationTime = Date.now() >= expirationDatetimeInSeconds;

      return expirationTime;
    } catch {
      return true;
    }
  }
}

export default new AuthService();
