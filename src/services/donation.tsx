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
  type: string;
  location: string;
  image: string;
  content: string;
  target_balance : number;
  balance_collected : number;
  date_start : string;
  date_end : string;
  is_urgent : boolean;
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

export interface UpdateDonationPayload extends CreateDonationPayload {
  id: number;
}

export interface CreateDonationPayload {
    title: string;
    type: string;
    location: string;
    image: string;
    content: string;
    target_balance : number;
    balance_collected : number;
    date_start : string;
    date_end : string;
    is_urgent? : boolean;
    is_publish? : boolean;

}

export interface GetDonationPayload {
sort_by: string;
}

export interface CreateDonationResponse extends BaseResponse {
  data: IRoot;
}

export interface GetDonationsResponse {
  status: number
  message: string
  data: IData
  timestamp: string
  path: string
}


export interface GetDonationResponse extends BaseResponse {
  data: IRecord;
}
export interface DeleteDonationResponse extends BaseResponse {
  message: String;
}

// Service Endpoints

const url = "/donation";

export const createDonation = async (
  payload: CreateDonationPayload
): Promise<CreateDonationResponse> => {
  const response = await instance.post(url, payload);
  return response.data;
};

export const updateDonation = async ({
  id,
  ...payload
}: UpdateDonationPayload) => {
  const updatedPayload = {
    ...payload,
    id: id,
  };
  const response = await instance.post(`${url}`, updatedPayload);
  return response.data;
};

export const getDonations = async (
  payload: GetDonationPayload
): Promise<GetDonationsResponse> => {
  const response = await instance.get("/donation", { params: payload });
  return response.data;
};

export const getDonation = async (
  id: string | string[] | undefined
): Promise<GetDonationResponse> => {
  const response = await instance.get(`${url}/${id}`);
  return response.data;
};

export const deleteDonation = async (
  id: string | string[] | undefined
): Promise<DeleteDonationResponse> => {
  const response = await instance.delete(`${url}/${id}`);
  return response.data;
};
