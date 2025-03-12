import { storage } from "../storage-config";

export const uploadFile = async (fileUri: string): Promise<string | null> => {
    if (!fileUri) return null;

    try {

        const response = await fetch(fileUri);
        const blob = await response.blob();

        const filename = fileUri.split("/").pop();
        if (!filename) throw new Error("No se pudo obtener el nombre del archivo.");

        console.log("Nombre del archivo:", filename);

        const storageRef = storage.ref().child(`posts/${filename}`);

        console.log("Referencia en Storage:", storageRef.fullPath);

        const snapshot = await storageRef.put(blob);

        const downloadUrl = await snapshot.ref.getDownloadURL();

        return downloadUrl;
    } catch (error) {
        console.error("Error al subir archivo:", error);
        return null;
    }
};

export const uploadAudio = async (fileUri: string): Promise<string | null> => {
    if (!fileUri) return null;

    try {
        // Convertir a Blob
        const response = await fetch(fileUri);
        const blob = await response.blob();

        // Obtener el nombre del archivo
        const filename = fileUri.split("/").pop();
        if (!filename) throw new Error("No se pudo obtener el nombre del archivo.");

        console.log("Nombre del archivo:", filename);

        // Crear referencia en Firebase Storage (usando v8)
        const storageRef = storage.ref().child(`audios/${filename}`);

        console.log("Referencia en Storage:", storageRef.fullPath);

        // Subir el archivo
        const snapshot = await storageRef.put(blob);

        // Obtener la URL de descarga
        const downloadUrl = await snapshot.ref.getDownloadURL();

        console.log("Audio subido correctamente:", downloadUrl);
        return downloadUrl;
    } catch (error) {
        console.error("Error al subir el audio:", error);
        return null;
    }
};
