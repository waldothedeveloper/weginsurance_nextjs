import { failureNotification } from "@/components/notifications/failureNotification";

export const handleUploadErrors = (error: unknown | any) => {
  switch (error.code) {
    case "storage/unauthorized":
      failureNotification(`El usuario no esta autorizado a subir archivos`);
      // reject(`User doesn't have permission to access the object ${error}`);
      break;
    case "storage/canceled":
      failureNotification(`Se ha cancelado la subida del archivo`);
      // reject(`User canceled the upload ${error}`);
      break;
    case "storage/unknown":
      failureNotification(`Ha ocurrido un error desconocido`);
      // reject(`Unknown error occurred, inspect error.serverResponse ${error}`);
      break;
  }
};
