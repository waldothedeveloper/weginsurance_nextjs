export const pdfModalTitles = (withMaleAgent: boolean) => {
  if (withMaleAgent) {
    return [
      { title: "Selecione el idioma para el modelo PDF" },
      { title: "Selecione el agente de seguros" },
      { title: "Escoja el telefono del agente William" },
      { title: "Selecione la fecha de nacimiento del asegurado." },
      { title: "Selecione la fecha de expiracion para el documento" },
      { title: "Copie y pegue el link en el mensaje" },
    ];
  } else {
    return [
      { title: "Selecione el idioma para el modelo PDF" },
      { title: "Selejione el agente de seguros" },
      { title: "Selecione la fecha de nacimiento del asegurado." },
      { title: "Selecione la fecha de expiracion para el documento" },
      { title: "Copie y pegue el link en el mensaje" },
    ];
  }
};
