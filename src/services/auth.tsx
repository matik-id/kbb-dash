import { BaseResponse, instance } from "./instances";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  active: boolean
  code: number
  email: string
  expire: string
  forceCpw: boolean
  id: number
  message: string
  name: string
  role: string
  token: string
}

const url = "/auth/sign-in";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await instance.post(url, payload, { auth: payload });
  return response.data;
};
