import axios from "axios";
import url from "./url.json";
console.log(url);
export const sendFormRequest = async (data) =>
  await axios.post(url.url_server, data);
