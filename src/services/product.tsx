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
  owner: string;
  phone: string;
  thumbnail: string;
  image1: string;
  image2: string;
  image3: string;
  price: number; 
  content: string;
  is_publish: boolean;
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

export interface UpdateProductPayload extends CreateProductPayload {
  id: number;
}

export interface CreateProductPayload {
  title: string;
  owner: string;
  phone: string;
  thumbnail: string;
  image1: string;
  image2: string;
  image3: string;
  price: number;
  content: string;
  is_publish?: boolean;

}

export interface GetProductPayload {
sort_by: string;
}

export interface CreateProductResponse extends BaseResponse {
  data: IRoot;
}

export interface GetProductsResponse {
  status: number
  message: string
  data: IData
  timestamp: string
  path: string
}


export interface GetProductResponse extends BaseResponse {
  data: IRecord;
}
export interface DeleteProductResponse extends BaseResponse {
  message: String;
}

// Service Endpoints

const url = "/product";

export const createProduct = async (
  payload: CreateProductPayload
): Promise<CreateProductResponse> => {
  const response = await instance.post(url, payload);
  return response.data;
};

export const updateProduct = async ({
  id,
  ...payload
}: UpdateProductPayload) => {
  const updatedPayload = {
    ...payload,
    id: id,
  };
  const response = await instance.post(`${url}`, updatedPayload);
  return response.data;
};

export const getProducts = async (
  payload: GetProductPayload
): Promise<GetProductsResponse> => {
  const response = await instance.get("/product", { params: payload });
  return response.data;
};

export const getProduct = async (
  id: string | string[] | undefined
): Promise<GetProductResponse> => {
  const response = await instance.get(`${url}/${id}`);
  return response.data;
};

export const deleteProduct = async (
  id: string | string[] | undefined
): Promise<DeleteProductResponse> => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};
