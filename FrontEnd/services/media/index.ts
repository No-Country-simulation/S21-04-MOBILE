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
