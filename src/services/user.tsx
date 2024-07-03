import { BaseResponse, instance } from './instances';

export interface IRoot {
    status: number
    message: string
    data: IData
    timestamp: string
    path: string
}

export interface IData {
    records: IRecord[];
    metadata: Metadata;
}

export interface IRecord {
    id: number
    number: string
    email: string
    password: string
    fullname: string
    phone: string
    gender: string
    position: string
    pob: string
    dob: string
    address: string
    education: string
    profession: string
    company: string
    nik: string
    photo: string
    file_ktp: string
    likes: number
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at: any
}

export interface Metadata {
    page: number
    per_page: number
    page_count: number
    total_count: number
}

export interface UpdateUserPayload extends CreateUserPayload {
    id: string;
}

export interface CreateUserPayload {
    email: string;
    password?: string;
    number: string
    fullname: string
    phone: string
    gender: string
    position: string
    pob: string
    dob: string
    address: string
    education: string
    profession: string
    company: string
    nik: string
    photo: string
    file_ktp: string
    likes: number
    is_active?: boolean;
}

export interface GetUserPayload {
    sort_by: string;
    q?: string;
}

export interface CreateUserResponse extends BaseResponse {
    data: IRoot;
}

export interface GetUsersResponse {
    data: IData;
}
export interface GetUserResponse extends BaseResponse {
    data: IRecord;
}

export interface ResetPasswordUserPayload {
    user: string;
    password: string;
}


// Service Endpoints

const url = '/user'

export const createUser = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
    const response = await instance.post(url, payload);
    return response.data;
}

export const updateUser = async ({ id, ...payload }: UpdateUserPayload) => {
    const updatedPayload = {
        ...payload,
        id: id,
    }
    const response = await instance.post(`${url}`, updatedPayload);
    return response.data;
}

export const getUsers = async (payload: GetUserPayload): Promise<GetUsersResponse> => {
    const response = await instance.get('/user', { params: payload });
    return response.data;
};

export const getUser = async (id: string | string[] | undefined): Promise<GetUserResponse> => {
    const response = await instance.get(`${url}/${id}`);
    return response.data;
};

export const resetPassUser = async (payload : ResetPasswordUserPayload) => {
    const response = await instance.post(`${url}/rpw`, payload);
    return response.data;
}