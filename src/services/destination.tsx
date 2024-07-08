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
  name: string;
  category: string;
  coordinate: string;
  thumbnail: string;
  image1: string;
  image2: string;
  image3: string;
  video: string;
  address: string;
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

export interface UpdateDestinationPayload extends CreateDestinationPayload {
  id: number;
}

export interface CreateDestinationPayload {
  name: string;
  category: string;
  coordinate: string;
  thumbnail: string;
  image1: string;
  image2: string;
  image3: string;
  video: string;
  address: string;
  content: string;
  is_publish?: boolean;

}

export interface GetDestinationPayload {
sort_by: string;
}

export interface CreateDestinationResponse extends BaseResponse {
  data: IRoot;
}

export interface GetDestinationsResponse {
  status: number
  message: string
  data: IData
  timestamp: string
  path: string
}


export interface GetDestinationResponse extends BaseResponse {
  data: IRecord;
}
export interface DeleteDestinationResponse extends BaseResponse {
  message: String;
}

// Service Endpoints

const url = "/destination";

export const createDestination = async (
  payload: CreateDestinationPayload
): Promise<CreateDestinationResponse> => {
  const response = await instance.post(url, payload);
  return response.data;
};

export const updateDestination = async ({
  id,
  ...payload
}: UpdateDestinationPayload) => {
  const updatedPayload = {
    ...payload,
    id: id,
  };
  const response = await instance.post(`${url}`, updatedPayload);
  return response.data;
};

export const getDestinations = async (
  payload: GetDestinationPayload
): Promise<GetDestinationsResponse> => {
  const response = await instance.get("/destination", { params: payload });
  return response.data;
};

export const getDestination = async (
  id: string | string[] | undefined
): Promise<GetDestinationResponse> => {
  const response = await instance.get(`${url}/${id}`);
  return response.data;
};

export const deleteDestination = async (
  id: string | string[] | undefined
): Promise<DeleteDestinationResponse> => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};
