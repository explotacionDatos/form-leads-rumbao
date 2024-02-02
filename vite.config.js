import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

// Ruta al archivo JSON
const rutaArchivo = "./src/api/url.json";
const urlEnv = process.env.URL_SERVER;
// Lee el contenido del archivo
fs.readFile(rutaArchivo, "utf-8", (error, data) => {
  if (error) {
    console.error("Error al leer el archivo:", error);
    return;
  }

  // Parsea el contenido JSON
  const objetoJSON = JSON.parse(data);

  // Modifica el valor del campo deseado
  objetoJSON.url_server = urlEnv;

  // Convierte el objeto modificado de nuevo a JSON
  const nuevoContenido = JSON.stringify(objetoJSON, null, 2);

  // Escribe el nuevo contenido en el archivo
  fs.writeFile(rutaArchivo, nuevoContenido, "utf-8", (error) => {
    if (error) {
      console.error("Error al escribir en el archivo:", error);
      return;
    }
    console.log("Archivo modificado con éxito.");
  });
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: process.env.NODE_LOCAL_PORT,
  },
});
