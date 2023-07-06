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
export async function getAllComposition() {
  const response = await fetchClient.get(
    BASE_URL + `/vendor/layouts/compositions?page=0&limit=1000`
  );

  return response.data.data;
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
  await fetchClient.delete(`${BASE_URL}/vendor/display/media?mediaId=${id}`);
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

export async function deleteScreen(id) {
  return await fetchClient.delete(
    `${BASE_URL}/vendor/display/screen?screenId=${id}`
  );
}

export async function getLayouts() {
  const response = await fetchClient.get(`${BASE_URL}/vendor/layouts`);
  return response.data.data;
}
export async function postComposition(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/layouts/composition`,
      postData
    );
    return response.data.statusCode === 200;
  } catch (error) {
    return false;
  }
}

export async function putComposition(postData) {
  try {
    const response = await fetchClient.put(
      `${BASE_URL}/vendor/layouts/composition`,
      postData
    );
    return response.data.statusCode === 200;
  } catch (error) {
    return false;
  }
}

export async function deleteCompositionById(id) {
  await fetchClient.delete(
    `${BASE_URL}/vendor/layouts/composition?compositionId=${id}`
  );
}

export async function getCompositionById(url) {
  const response = await fetchClient.get(BASE_URL + `${url}`);
  return response.data.data;
}

export async function getMedia(path) {
  const response = await fetchClient.get(
    `${BASE_URL}/vendor/display/mediaFile?path=${path}`
  );
  return response.data.data;
}

export async function uploadBlob(blob) {
  const imageResponse = await fetchClient.get(blob, { responseType: "blob" });
  const blobData = imageResponse.data;

  const formData = new FormData();
  // Extract filename and extension from the Blob URL
  const url = new URL(blob);
  const pathnameParts = url.pathname.split("/");
  const filenameWithExtension = pathnameParts[pathnameParts.length - 1];

  // Append the Blob to the FormData object
  formData.append("file", blobData, filenameWithExtension);

  const response = await fetchClient.post(
    `${BASE_URL}/vendor/layouts/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
}

export async function pushAddSchedule(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/push/schedule`,
      postData
    );
    return response;
  } catch (error) {
    return false;
  }
}

export async function pushAddDates(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/push/dates`,
      postData
    );
    return response;
  } catch (error) {
    return false;
  }
}

export async function saveSequence(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/push/sequence`,
      postData
    );
    return response;
  } catch (error) {
    return false;
  }
}
export async function getAllDaySequence(scheduleId) {
  const response = await fetchClient.get(
    BASE_URL + `/vendor/push/sequenceList?scheduleId=${scheduleId}`
  );
  return response.data.data;
}



export async function getAllSchedule() {
  const response = await fetchClient.get(BASE_URL + `/vendor/push/schedules`);
  return response;
}

export async function deleteSequence(sequenceId, scheduleId) {
  const response = await fetchClient.delete(
    `${BASE_URL}/vendor/push/sequence?scheduleId=${scheduleId}&sequenceId=${sequenceId}`
  );
  return response;
}
export async function deleteSchedule(scheduleId) {
  const response = await fetchClient.delete(
    `${BASE_URL}/vendor/push/schedule?scheduleId=${scheduleId}`
  );
  return response;
}

export async function assignDefaultComposition(postData) {
  try {
    const response = await fetchClient.put(
      `${BASE_URL}/vendor/profile/defaultComposition`,
      postData
    );
    return response;
  } catch (error) {
    return false;
  }
}

export async function vendorProfile() {
  const response = await fetchClient.get(BASE_URL + `/vendor/profile`);
  return response;
}
