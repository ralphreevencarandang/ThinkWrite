import axios from "axios";

const instance = axios.create({
  baseURL: 'http://locahost:3000/api/',
});


export default instance