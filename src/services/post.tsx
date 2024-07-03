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
  title: string;
  image: string;
  content: string;
  type: string;
  date_start: string;
  date_end: string;
  is_publish: string;
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

export interface UpdatePostPayload extends CreatePostPayload {
  id: number;
}

export interface CreatePostPayload {
  fullname: string;
  username: string;
  password?: string;
  title: string;
  image: string;
  content: string;
  type: string;
  date_start: string;
  date_end: string;
  is_publish: string;

}

export interface GetPostPayload {
sort_by: string;
  q?: string;
}

export interface CreatePostResponse extends BaseResponse {
  data: IRoot;
}

export interface GetPostsResponse {
  status: number
  message: string
  data: IData
  timestamp: string
  path: string
}


export interface GetPostResponse extends BaseResponse {
  data: IRecord;
}
export interface DeletePostResponse extends BaseResponse {
  message: String;
}

// Service Endpoints

const url = "/post";

export const createPost = async (
  payload: CreatePostPayload
): Promise<CreatePostResponse> => {
  const response = await instance.post(url, payload);
  return response.data;
};

export const updatePost = async ({
  id,
  ...payload
}: UpdatePostPayload) => {
  const updatedPayload = {
    ...payload,
    id: id,
  };
  const response = await instance.post(`${url}`, updatedPayload);
  return response.data;
};

export const getPosts = async (
  payload: GetPostPayload
): Promise<GetPostsResponse> => {
  const response = await instance.get("/post", { params: payload });
  return response.data;
};

export const getPost = async (
  id: string | string[] | undefined
): Promise<GetPostResponse> => {
  const response = await instance.get(`${url}/${id}`);
  return response.data;
};

export const deletePost = async (
  id: string | string[] | undefined
): Promise<DeletePostResponse> => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};
