export const messageStatus = (status: string): { status: string } => {
  switch (status) {
    case "queued":
      return {
        status: "En cola",
      };
    case "sent":
      return {
        status: "Enviado",
      };
    case "failed":
      return {
        status: "Fallido",
      };
    case "delivered":
      return {
        status: "Entregado",
      };
    case "undelivered":
      return {
        status: "No entregado",
      };
    case "received":
      return {
        status: "Recibido",
      };
    default:
      return {
        status: "Desconocido",
      };
  }
};
