import axios from "axios";
import url from "./url.json";

export const sendFormRequest = async (data) =>
  await axios.post(url.url_server, data);
