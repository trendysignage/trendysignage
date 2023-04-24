import fetchClient from "./fetchClient";

export const BASE_URL = "http://144.126.143.140:5000";

export function login(email, password) {
  const role = "vendor";
  const postData = {
    email,
    password,
    role,
  };

  return fetchClient.post(`${BASE_URL}/vendor/auth/login`, postData);
}

export async function getAllScreens() {
  const response = await fetchClient.get(BASE_URL + `/vendor/display/screen`);
  return response.data.data;
}

export async function getAllMedia() {
  const response = await fetchClient.get(BASE_URL + `/vendor/display/media`);
  return response.data.data.media;
}

export function addScreen(data) {
  return fetchClient.post(`${BASE_URL}/vendor/display/screen`, data);
}

export async function addScreenCode(deviceToken) {
  const postData = {
    deviceToken: deviceToken,
  };
  const response = await fetchClient.post(`${BASE_URL}/device/auth`, postData);
  return response.data.data;
}

export async function validateScreenCode(code) {
  const postData = {
    code: code,
  };

  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/display/deviceCode`,
      postData
    );
    return response.data.statusCode === 200;
  } catch (error) {
    return false;
  }
}

export async function addMedia(formData) {
  const response = await fetchClient.post(
    `${BASE_URL}/vendor/display/media`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
export async function deleteMedia(id) {
  const response = await fetchClient.delete(
    `${BASE_URL}/vendor/display/media?mediaId=${id}`
  );
}

export async function publishMedia(postData) {

  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/display/publish`,
      postData
    );
    return response.data.statusCode === 200;
  } catch (error) {
    return false;
  }
}

export async function  deleteScreen(id) {
  return await fetchClient.delete(
    `${BASE_URL}/vendor/display/screen?screenId=${id}`
  );
}

