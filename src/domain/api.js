import axios from "axios";

const baseUrl = "https://fakestoreapi.com";

const baseUrlCarts = "http://localhost:3000";

export const callApi = async (
  endpoint,
  method,
  headers = {},
  params = {},
  data = {}
) => {
  const options = {
    url: baseUrl + endpoint,
    method,
    headers,
    params,
    data,
  };

  return axios(options).then((response) => {
    const responseAPI = response?.data;
    return responseAPI;
  });
};

export const callApiCarts = async (endpoint, method, data = {}) => {
  const options = {
    url: baseUrlCarts + endpoint,
    method,
    data,
  };

  return axios(options).then((response) => {
    const responseAPI = response?.data;
    return responseAPI;
  });
};
