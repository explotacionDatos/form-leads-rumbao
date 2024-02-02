import axios from "axios";
// Accede a la variable de entorno en tiempo de ejecución
const urlBackend = import.meta.env.URL_BACKEND;

export const sendFormRequest = async (data) =>
  await axios.post(urlBackend, data);
