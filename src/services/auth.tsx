import { BaseResponse, instance } from "./instances";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface Data {
  user_id: number
  number: any
  phone: string
  fullname: string
  access_token: string
}


export interface LoginResponse extends BaseResponse {
  status: number
  message: string
  data: Data
  timestamp: string
  path: string
}

const url = "/auth/admin/login";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  // add basic auth
  // instance.defaults.headers.common["Authorization"] = `Basic ` + payload.username + ":" + payload.password;
  const response = await instance.post(url, payload, { auth: payload });
  return response.data;
};
