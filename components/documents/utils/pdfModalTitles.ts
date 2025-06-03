export const pdfModalTitles = (withMaleAgent: boolean) => {
  if (withMaleAgent) {
    return [
      { title: "Seleccione el idioma para el modelo PDF" },
      { title: "Seleccione el agente de seguros" },
      { title: "Escoja el telefono del agente William" },
      { title: "Seleccione la fecha de nacimiento del asegurado." },
      { title: "Seleccione la fecha de expiracion para el documento" },
      { title: "Copie y pegue el link en el mensaje" },
    ];
  } else {
    return [
      { title: "Seleccione el idioma para el modelo PDF" },
      { title: "Seleccione el agente de seguros" },
      { title: "Seleccione la fecha de nacimiento del asegurado." },
      { title: "Seleccione la fecha de expiracion para el documento" },
      { title: "Copie y pegue el link en el mensaje" },
    ];
  }
};
