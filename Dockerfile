# Establece la imagen base
FROM node:20.12.0

# Crea el directorio de la aplicación en el contenedor
WORKDIR /usr/src/app

# Copia los archivos del paquete.json y el paquete-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto que tu aplicación utilizará
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]