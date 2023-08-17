import axios, { AxiosRequestConfig } from "axios";

const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const getEndpointUrl = (endPoint: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_API_URL}${endPoint}`;
};

export const getApi = <T = any>(
  endPoint: string,
  additionalHeaders = {},
  config: AxiosRequestConfig = {}
) => {
  const headers = { ...commonHeaders, ...additionalHeaders };
  return axios
    .get<T>(getEndpointUrl(endPoint), {
      headers,
      ...config,
      withCredentials: true,
    })
    .then((response) => response)
    .catch((e) => {
      // you can do some error handling here like sending some event or any other thing
      throw e;
    });
};

export const postApi = <T>(
  endPoint: string,
  data = {},
  additionalHeaders = {},
  config: AxiosRequestConfig = {}
) => {
  const headers = { ...commonHeaders, ...additionalHeaders };
  return axios
    .post<T>(getEndpointUrl(endPoint), data, {
      headers,
      ...config,
      withCredentials: true,
    })
    .then((response) => response)
    .catch((e) => {
      // you can do some error handling here like sending some event or any other thing
      throw e;
    });
};

export const patchApi = <T>(
  endPoint: string,
  data = {},
  additionalHeaders = {},
  config: AxiosRequestConfig = {}
) => {
  const headers = { ...commonHeaders, ...additionalHeaders };
  return axios
    .patch<T>(getEndpointUrl(endPoint), data, {
      headers,
      ...config,
      withCredentials: true,
    })
    .then((response) => response)
    .catch((e) => {
      // you can do some error handling here like sending some event or any other thing
      throw e;
    });
};

export const putApi = <T>(
  endPoint: string,
  data = {},
  additionalHeaders = {},
  config: AxiosRequestConfig = {}
) => {
  const headers = { ...commonHeaders, ...additionalHeaders };
  return axios
    .put<T>(getEndpointUrl(endPoint), data, {
      headers,
      ...config,
      withCredentials: true,
    })
    .then((response) => response)
    .catch((e) => {
      // you can do some error handling here like sending some event or any other thing
      throw e;
    });
};

export const deleteApi = <T>(
  endPoint: string,
  data = {},
  additionalHeaders = {},
  config: AxiosRequestConfig = {}
) => {
  const headers = { ...commonHeaders, ...additionalHeaders };
  return axios
    .delete<T>(getEndpointUrl(endPoint), {
      headers,
      data,
      ...config,
      withCredentials: true,
    })
    .then((response) => response)
    .catch((e) => {
      // you can do some error handling here like sending some event or any other thing
      throw e;
    });
};
