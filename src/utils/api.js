import fetchClient from "./fetchClient";
import axios from "axios";
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
let Parser = require('rss-parser');



export function login(email, password) {
  const role = "vendor";
  const postData = {
    email,
    password,
    role,
  };

  return fetchClient.post(`${BASE_URL}/vendor/auth/login`, postData);
}

export function socialLoginApi(email, name, token) {
  const postData = {
    email,
    name,
    socialId:token,
  };

  return fetchClient.post(`${BASE_URL}/vendor/auth/socialLogin`, postData);
}

export function register(name,email, password) {
  const role = "vendor";
  const postData = {
    name,
    email,
    password,
    //phoneNumber,
    role,
  };

  return fetchClient.post(`${BASE_URL}/vendor/auth/signup`, postData);
}

export async function otpVerification(otp) {
  const response = await fetchClient.post(BASE_URL + `/vendor/auth/verifyOtp`,otp);
  return response.data.data;
}

export async function mfaEnablePost(mfa) {
  const response = await fetchClient.post(BASE_URL + `/vendor/profile/mfa`,mfa);
  return response.data.data;
}

export async function verification2fa(otp) {
  const response = await fetchClient.post(BASE_URL + `/vendor/auth/verifyOtp`,otp);
  return response.data.data;
}


export async function sentOtpAgain() {
  const response = await fetchClient.post(BASE_URL + `/vendor/auth/resendOtp`);
  return response.data.data;
}


export async function getResetPassword(email) {
  const response = await fetchClient.post(BASE_URL + `/vendor/auth/forgotPassword`,email);
  return response.data.data;
}

export async function getAllScreens(str=null) {
  let response = "";
  if(str){
    response = await fetchClient.get(BASE_URL + `/vendor/display/screen?${str}`);
  }else{
    response = await fetchClient.get(BASE_URL + `/vendor/display/screen`);
  }
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

export const permission = {
  SCREEN:{ view:false, add:false, edit:false,delete:false},
  ASSETS:{ view:false, add:false, edit:false,delete:false},
  COMPOSITION:{ view:false, add:false, edit:false,delete:false},
  APPS:{ view:false, add:false, edit:false,delete:false},
  REPORTS:{ view:false, add:false, edit:false,delete:false},
  QUICKPLAY:{ view:false, add:false, edit:false,delete:false},
  SCHEDULE:{ view:false, add:false, edit:false,delete:false},
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
    console.log("err", error?.response?.data)
    return error?.response?.data;
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

export async function pushUpdateSchedule(postData) {
  try {
    const response = await fetchClient.put(
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

export async function updateSequence(postData) {
  try {
    const response = await fetchClient.put(
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

export async function getQuickPlay() {
  const response = await fetchClient.get(BASE_URL + `/vendor/push/quickplay`);
  return response;
}

export async function setQuickplay(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/push/quickplay`,
      postData
    );
    return response.data.statusCode === 200;
  } catch (error) {
    return false;
  }
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

export async function deleteQuickPlay(quickPlayId) {
  const response = await fetchClient.delete(
    `${BASE_URL}/vendor/push/quickplay?id=${quickPlayId}`
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

export async function setDefaultComposition(postData) {
  try {
    const response = await fetchClient.post(
      `${BASE_URL}/vendor/push/defaultComposition`,
      postData
    );
    return response;
  } catch (error) {
    return false;
  }
}

export async function getDefaultComposition(postData) {
  try {
    const response = await fetchClient.get(
      `${BASE_URL}/vendor/push/defaultComposition`,
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

export async function getReports(startDate, endDate, reportSlug) {
  let type = "";
  if (reportSlug == "media-report") {
    type = "mediaReport";
  }
  if (reportSlug == "uptime-report") {
    type = "uptimeReport";
  }
  if (reportSlug == "audit-logs") {
    type = "auditLogs";
  }
  const response = await fetchClient.get(
    BASE_URL +
      `/vendor/profile/${type}?page=0&limit=1000&startDate=${startDate}&endDate=${endDate}`
  );

  return response;
}

export async function getSingleSequence(scheduleId, seqId) {
  const response = await fetchClient.get(
    BASE_URL +
      `/vendor/push/sequence?scheduleId=${scheduleId}&sequenceId=${seqId}`
  );
  return response.data.data;
}

export async function getUsers() {
  const response = await fetchClient.get(BASE_URL + `/vendor/profile/users`);
  return response.data.data;
}

export async function addUsers(postdata) {
  const response = await fetchClient.post(
    BASE_URL + `/vendor/profile/users`,
    postdata
  );
  return response;
}

export async function updateUsers(postdata) {
  const response = await fetchClient.put(
    BASE_URL + `/vendor/profile/users`,
    postdata
  );
  return response.data.data;
}

export async function deleteUsers(userId) {
  const response = await fetchClient.delete(
    BASE_URL + `/vendor/profile/users?userId=${userId}`
  );
  return response.data.data;
}

export async function getGroups() {
  const response = await fetchClient.get(BASE_URL + `/vendor/profile/groups`);
  return response.data.data;
}

export async function addGroups(postdata) {
  const response = await fetchClient.post(
    BASE_URL + `/vendor/profile/groups`,
    postdata
  );
  return response;
}

export async function assignScreenGroups(postdata) {
  const response = await fetchClient.put(
    BASE_URL + `/vendor/display/assignGroups`,
    postdata
  );
  return response;
}

export async function updateGroups(postdata) {
  const response = await fetchClient.put(
    BASE_URL + `/vendor/profile/groups`,
    postdata
  );
  return response.data.data;
}

export async function deleteGroups(groupId) {
  const response = await fetchClient.delete(
    BASE_URL + `/vendor/profile/groups?groupId=${groupId}`
  );
  return response.data.data;
}

export async function getRoles() {
  const response = await fetchClient.get(BASE_URL + `/vendor/profile/roles`);
  return response.data.data;
}

export async function updateRoles(postdata) {
  const response = await fetchClient.put(
    BASE_URL + `/vendor/profile/roles`,
    postdata
  );
  return response.data.data;
}

export async function getDeviceProfile() {
  const response = await fetchClient.get(
    BASE_URL + `/vendor/profile/deviceProfile?limit=100`
  );
  return response.data.data;
}

export async function addDeviceProfile(postdata) {
  const response = await fetchClient.post(
    BASE_URL + `/vendor/profile/deviceProfile`,
    postdata
  );
  return response;
}

export async function addApps(postdata) {
  const response = await fetchClient.post(BASE_URL + `/vendor/apps`, postdata);
  return response;
}

export async function updateApps(postdata) {
  const response = await fetchClient.put(BASE_URL + `/vendor/apps`, postdata);
  return response;
}

export async function updateDeviceProfile(postdata) {
  const response = await fetchClient.put(
    BASE_URL + `/vendor/profile/deviceProfile`,
    postdata
  );
  return response.data.data;
}

export async function deleteDeviceProfile(userId) {
  const response = await fetchClient.delete(
    BASE_URL + `/vendor/profile/deviceProfile?profileId=${userId}`
  );
  return response.data.data;
}

export async function assignScreenProfile(postdata) {
  const response = await fetchClient.post(
    BASE_URL + `/vendor/profile/assign`,
    postdata
  );
  return response;
}

export async function getWeather(lat, long) {

  const rapidHeader = {
    headers: {
      'X-RapidAPI-Key': 'b5a487d7c7msh1ee9860be40a063p14b519jsna3a79db4aac0',
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    }
  }
  const response = await fetchClient.get(
    `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${long}`,rapidHeader
  );
  return response.data;

}

export async function getStock(type) {

  const rapidHeader = {
    headers: {
      'X-RapidAPI-Key': 'b5a487d7c7msh1ee9860be40a063p14b519jsna3a79db4aac0',
      'X-RapidAPI-Host': 'stock-surge.p.rapidapi.com'
    }
  }
  const response = await fetchClient.get(
    `https://stock-surge.p.rapidapi.com/api/v1/performance/${type}`,rapidHeader
  );
  return response.data;

}

export async function getQuotes(formData) {

  const rapidHeader = {
    headers: {
      'X-RapidAPI-Key': 'b5a487d7c7msh1ee9860be40a063p14b519jsna3a79db4aac0',
      'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
    }
  }
  const response = await fetchClient.get(
    `https://andruxnet-random-famous-quotes.p.rapidapi.com?cat=${formData.cat}&count=${formData.count}`, rapidHeader
  );
  return response.data;

}

export async function getNews(keyword) {

  const rapidHeader = {
    headers: {
      'X-RapidAPI-Key': 'b5a487d7c7msh1ee9860be40a063p14b519jsna3a79db4aac0',
      'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
    }
  }
  const response = await fetchClient.get(
    `https://google-news13.p.rapidapi.com/search?keyword=${keyword}&lr:`, rapidHeader
  );
  return response.data;

}

export async function getAllMediaFilter() {
  const response = await fetchClient.get(
    BASE_URL + `/vendor/display/media?limit=100`
  );
  return response.data.data.media;
}

export async function getAllMediaDetail(id) {
  const response = await fetchClient.get(
    BASE_URL + `/vendor/display/media/detail?mediaId=${id}`
  );
  return response.data.data.media;
}


export function getPermission() {
  return fetchClient.get(BASE_URL + `/vendor/profile/vendorRole`);
}

export async function rssParser() {
  
  let parser = new Parser();
  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log("feed",feed);
}


export async function addTags(postdata) {
  const response = await fetchClient.post(BASE_URL + `/vendor/profile/tags`, postdata);
  return response;
}

export async function getAllTags(str) {
  const response = await fetchClient.get(BASE_URL + `/vendor/profile/tags?type=${str}`);
  return response.data.data;
}
