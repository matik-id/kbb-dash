import { BaseResponse, instance } from "./instances";

export interface IRoot {
  status: number;
  message: string;
  data: IData;
  timestamp: string;
  path: string;
}

export interface IData {
  records: IRecord[];
  metadata: Metadata;
}

export interface IRecord {
  id: number;
  fullname: string;
  username: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Metadata {
  page: number;
  per_page: number;
  page_count: number;
  total_count: number;
}

export interface UpdateAdminPayload extends CreateAdminPayload {
  id: number;
}

export interface CreateAdminPayload {
  fullname: string;
  username: string;
  password?: string;
}

export interface GetAdminPayload {
sort_by: string;
  q?: string;
}

export interface CreateAdminResponse extends BaseResponse {
  data: IRoot;
}

export interface GetAdminsResponse {
  status: number
  message: string
  data: IData
  timestamp: string
  path: string
}


export interface GetAdminResponse extends BaseResponse {
  data: IRecord;
}
export interface DeleteAdminResponse extends BaseResponse {
  message: String;
}

// Service Endpoints

const url = "/admin";

export const createAdmin = async (
  payload: CreateAdminPayload
): Promise<CreateAdminResponse> => {
  const response = await instance.post(url, payload);
  return response.data;
};

export const updateAdmin = async ({
  id,
  ...payload
}: UpdateAdminPayload) => {
  const updatedPayload = {
    ...payload,
    id: id,
  };
  const response = await instance.post(`${url}`, updatedPayload);
  return response.data;
};

export const getAdmins = async (
  payload: GetAdminPayload
): Promise<GetAdminsResponse> => {
  const response = await instance.get("/admin", { params: payload });
  return response.data;
};

export const getAdmin = async (
  id: string | string[] | undefined
): Promise<GetAdminResponse> => {
  const response = await instance.get(`${url}/${id}`);
  return response.data;
};

export const deleteAdmin = async (
  id: string | string[] | undefined
): Promise<DeleteAdminResponse> => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};
