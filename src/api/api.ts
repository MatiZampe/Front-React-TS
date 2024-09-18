import { ApiListResponse, KeyValuePair } from "./types";
import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env["VITE_API_URL"],
});

export const getResource = async <T>(resource: string, authHeader: string | null) => {
    return await client.get<T>(resource, {
        headers: { Authorization: authHeader },
    });
};

export const getResourceList = async <T>(
    resource: string,
    authHeader: string | null
) => {
    return await client.get<ApiListResponse<T>>(resource, {
        headers: { Authorization: authHeader },
        params: {
            "range.Start": 0,
            "range.End": 10000,
        },
    });
};

export const postResource = async (
    resource: string,
    authHeader: string | null,
    data: KeyValuePair | KeyValuePair[]
) => {
    return await client.post(`/${resource}`, data, {
        headers: { Authorization: authHeader },
    });
};