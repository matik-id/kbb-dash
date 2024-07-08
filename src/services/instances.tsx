import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("Authorization");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ` + accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// End of Request interceptor

export interface BaseResponse {
  metadata: IMetadata;
}

export interface IMetadata {
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
}

export interface refreshTokenResponse {
  message: string;
  data: IDataLogin;
}

export interface IDataLogin {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export const refreshToken = async (): Promise<refreshTokenResponse> => {
  const response = await axios.post("/auth/refresh-token", {
    headers: {
      Authorization: `Bearer ${Cookies.get("RefreshToken")}`,
    },
  });
  return response.data;
};

export const SetupInterceptors = () => {
  const router = useRouter();

  instance.interceptors.response.use(
    (response) => {
      if (
        [
          "Not Authenticated",
          "jwt expired",
          "No auth token",
          "Token Expired",
          "cookie token is empty",
        ].includes(response?.data?.message)
      ) {
        Cookies.remove("Authorization");
        clearToken();
        localStorage.clear();
        router.push("/auth/sign-in");
      }
      return response;
    },
    (error) => {
      const err = error?.response;
      if (
        err.status === 401 ||
        [
          "Not Authenticated",
          "jwt expired",
          "No auth token",
          "Token Expired",
          "cookie token is empty",
        ].includes(err?.data?.message)
      ) {
        Cookies.remove("Authorization");
        clearToken();
        localStorage.clear();
        router.push("/auth/sign-in");
      }

      if (error.message === "Network Error") {
        router.push("/no-connections");
      }
      return Promise.reject(error);
    }
  );
};

export const syncToken = () => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "Authorization"
  )}`;
};

export const clearToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};
