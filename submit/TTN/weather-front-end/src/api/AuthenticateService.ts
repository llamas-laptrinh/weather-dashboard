import http from "../common/OwnAPI";

const login = (username: string, password: string) => {
  return http.post("/login", {
    email: username,
    password: password,
  });
};

const regist = () => {
  return http.post("/register");
};

const AuthenticateService = {
  login,
  regist,
};

export default AuthenticateService;
