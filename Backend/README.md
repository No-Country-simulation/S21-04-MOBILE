# 🎵 Documentación API

Documentación de los endpoints disponibles en la API. Todos los endpoints usan el formato JSON para las solicitudes y respuestas.

---

## Autenticación

## Profile

### Obtener perfil
**GET** `/api/profile/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Respuestas:**
- `200 OK`: Devuelve el perfil.
```json
{
  "data": {
      "id": 5,
      "userId": 1,
      "name": "Test",
      "lastName": "Test",
      "bio": "User for testing",
      "photoUrl": "https://pics.com/2",
      "gender": "Masculino",
      "createdAt": "2025-02-24T15:27:22.000Z"
    }
}
```
- `404 Not Found`: Perfil no encontrado.
```
{
  "error": "Perfil no encontrado"
}
```
- `500 Error Server`: Error en el servidor.

---


### Crear perfil
**POST** `/api/profile`

**Body JSON:**
```json
{
  "userId": "number",
  "name": "string",
  "lastName": "string",
  "bio": "string",
  "photoURL": "string",
  "gender": "string"
}
```

**Respuestas:**
- `201 Created`: Perfil creado exitosamente.
```
{
  "message": "Perfil creado exitosamente",
  "data": {
    "id": 1,
    "userId": 1,
    "name": "Test",
    "lastName": "Test",
    "bio": "User for testing",
    "photoUrl": "https://pics.com/2",
    "gender": "Masculino",
    "createdAt": "2025-02-24T15:27:22.000Z"
  }
}
```
- `400 Bad Request`: Datos inválidos.
```
{
  "error": "userId, name y lastName son obligatorios"
}
```
- `500 Error Server`: Error en el servidor.

---

### Actualizar perfil
**PUT** `/api/profile/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Body JSON:**
```json
{
  "userId": "string",
  "lastName": "string",
  "bio": "string",
  "photoURL": "string",
  "gender": "string"
}
```

**Respuestas:**
- `200 OK`: Perfil actualizado.
```
{
  "message": "Perfil actualizado exitosamente"
}
```
- `404 Not Found`: Perfil no encontrado.
```
{
  "error": "El perfil no encontrado"
}
```
- `500 Error Server`: Error en el servidor.

---

### Eliminar perfil 
**DELETE** `/api/profile/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Respuestas:**
- `200 OK`: Perfil eliminado.
```json
{
  "message": "Perfil eliminado exitosamente"
}
```
- `404 Not Found`: Perfil no encontrado.
```json
{
  "error": "El perfil no existe"
}
```
- `500 Error Server`: Error en el servidor.



## Contact

### Obtener datos de contacto
**GET** `/api/contact/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Respuestas:**
- `200 OK`: Devuelve los datos de contacto.
```json
{
  "data": {
      "id": 1,
      "userId": 1,
      "spotify": "@username",
      "youtube": "@username",
      "phone": "+54 9 999 9999 999",
      "createdAt": "2025-02-24T15:27:22.000Z"
    }
}
```
- `404 Not Found`: Perfil no encontrado.
```json
{
  "error": "Datos de contacto no encontrado"
}
```
- `500 Error Server`: Error en el servidor.

---

### Crear datos de contacto
**POST** `/api/contact`

**Body JSON:**
```json
{
  "userId": "number",
  "spotify": "string",
  "youtube": "string",
  "phone": "string",
}
```

**Respuestas:**
- `201 Created`: Datos de contacto creado exitosamente.
```json
{
  "message": "Datos de contacto creado exitosamente",
  "data": {
    "id": 1,
    "userId": 1,
    "spotify": "@username",
    "youtube": "@username",
    "phone": "+54 9 9999 999",
    "createdAt": "2025-02-24T15:27:22.000Z"
  }
}
```
- `400 Bad Request`: Datos inválidos.
```json
{
  "error": "spotify, youtube y phone son obligatorios"
}
```
- `500 Error Server`: Error en el servidor.

---

### Actualizar datos de contacto
**PUT** `/api/contact/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Body JSON:**
```json
{
  "spotify": "string",
  "youtube": "string",
  "phone": "string"
}
```

**Respuestas:**
- `200 OK`: Datos de contacto actualizado.
```json
{
  "message": "Datos de contacto actualizado exitosamente"
}
```
- `404 Not Found`: Datos de contacto no encontrado.
```json
{
  "error": "Datos de contacto no encontrado"
}
```
- `500 Error Server`: Error en el servidor.

---

### Eliminar datos de contacto 
**DELETE** `/api/contact/{id}`

**Parámetros:**
- `id` (integer): ID del usuario.

**Respuestas:**
- `200 OK`: Datos de contacto eliminado.
```json
{
  "message": "Datos de contacto eliminado exitosamente"
}
```
- `404 Not Found`: Datos de contacto no encontrado.
```json
{
  "error": "Datos de contacto no encontrado"
}
```
- `500 Error Server`: Error en el servidor.

## 🚀 **Instrucciones para correr el proyecto**

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/usuario/proyecto-api.git
   cd proyecto-api
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor:  
   ```bash
   npm start
   ```
<!-- ## 📩 **Contacto**
Si encontrás algún error o tenés sugerencias, contactame en: [tu-email@example.com](mailto:tu-email@example.com) -->