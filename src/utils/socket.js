import { io } from 'socket.io-client';
import {BASE_URL} from "./api"

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const tokenDetailsString = localStorage.getItem('userDetails');
const tokenDetails = JSON.parse(tokenDetailsString);
const token = tokenDetails?.token?.token;

export const socket = io(BASE_URL, {
    query: {token:token},
    autoConnect: false,
    transports: ['websocket'],
    secure: true,
    // extraHeaders: {
    //   "my-custom-header": "abcd"
    // }
  });