import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://20.55.67.29:8081/api/User",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Validation failed, ...
      console.log("Interceptors", err.response);
      if (err.response.status === 400 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        getAccessToken() != null
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshAccessToken();
          const { accessToken, refreshToken } = rs.data;
          setRefreshToken(refreshToken);
          setAccessToken(accessToken);
          instance.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return instance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
      // Backend not started, ...
      if (err.response.status === 404) {
        if (axios.isAxiosError(err)) {
          return Promise.reject(err.response.data);
        }
        return;
        // Else Toast
      }
    }
    return Promise.reject(err);
  }
);

function refreshAccessToken() {
  return instance.post("/RefreshToken", {
    token: getrefreshToken(),
  });
}

const responseBody: any = (response: any): any => response.data;

const requests = {
  get: (url: string) => instance.get(url).then().then(responseBody),
  getSpecial: (url: string) => instance.get(url),
  post: (url: string, body?: any) =>
    instance.post(url, body).then().then(responseBody),
  postSpecial: (url: string, body?: any) => instance.post(url, body).then(),
  put: (url: string, body?: string) =>
    instance.put(url, body).then().then(responseBody),
  patch: (url: string, body: string) =>
    instance.patch(url, body).then().then(responseBody),
  del: (url: string) => instance.delete(url).then().then(responseBody),
};

const User = {
  login: (user: any) => requests.post(`/login`, user),
  forgotPassword: (email: string) => requests.post(`/ForgotPassword`, email),
  getAllUsers: (start: number, end: number, isAll: boolean = false) =>
    requests.get(
      "/getAllUsers?start=" + start + "&end=" + end + "&isAll=" + isAll
    ),
  register: (user: any) => requests.post("/register", user),
  getUserProfile: (userId: string) =>
    requests.getSpecial("/GetUserProfile?userId=" + userId),
  updateUserProfile: (newUser: any) =>
    requests.post("/UpdateUserProfile", newUser),
  deleteUserForAdmin: (userId: string) =>
    requests.get("/DeleteUserForAdmin?userId=" + userId),
};

export async function GetRequest(url: string) {
  const result = await requests
    .getSpecial(url)
    .then((response) => {
      console.log("response api: ", response);
      return new ServerResponse(true, response.status, response.data);
    })
    .catch((error) => {
      console.log("response api error: ", error);
      return new ServerResponse(false, error.response.status, null, error);
    });
  return result;
}
export async function PostRequest(url: string, body: any) {
  const result = await requests
    .postSpecial(url, body)
    .then((response) => {
      console.log("response post api: ", response);
      return new ServerResponse(true, response.status, response.data);
    })
    .catch((error) => {
      console.log("response post api error: ", error);
      return new ServerResponse(false, 0, null, error);
    });
  return result;
}

export function setAccessToken(token: string) {
  window.localStorage.setItem("accessToken", token);
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem("refreshToken", token);
}

export function getAccessToken(): null | string {
  const accessToken = window.localStorage.getItem("accessToken");
  return accessToken;
}

export function getrefreshToken(): null | string {
  const refreshToken = window.localStorage.getItem("refreshToken");
  return refreshToken;
}

export function removeTokens() {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
}

class ServerResponse {
  public IsSuccess: boolean;
  public Response: any;
  public StatusCode: number;
  public Error: any;

  constructor(
    IsSuccess: boolean,
    StatusCode: number,
    Response: any,
    Error: AxiosError | null = null
  ) {
    this.IsSuccess = IsSuccess;
    this.StatusCode = StatusCode;
    this.Response = Response;
    this.Error = Error;
  }
}
