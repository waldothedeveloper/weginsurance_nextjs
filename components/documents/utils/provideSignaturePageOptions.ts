export const provideSignaturePageOptions = () => {
  return {
    // String overrides for the UI
    title: "Use su firma",

    // Description supports markdown
    description:
      "__{{organization.name}}__ requiere su firma __({{signer.name}})__ para los siguientes documentos __{{packet.name}}__.",

    signatureLabel: "firma",
    initialLabel: "iniciales",

    acceptTitle: "Aceptar su firma",
    acceptDescription:
      "A continuación se muestra cómo aparecerán su firma e iniciales en todos los lugares donde necesite firmar todos los documentos.",
    acceptButtonText: "Yo acepto mi firma y mis iniciales",

    drawSignatureTitle: "Dibuje su firma con el dedo",
    drawSignatureDescription:
      "Su firma aparecerá en todos los documentos que necesite firmar.",
    drawSignatureButtonText: "Yo acepto mi firma",

    drawInitialsTitle: "Dibuje sus iniciales",
    drawInitialsDescription:
      "Sus iniciales aparecerán en todos los documentos donde necesite poner sus iniciales.",
    drawInitialsButtonText: "Yo Acepto mis iniciales",

    signTitle: "Firmar todos los documentos",
    signDescription:
      "Haga clic a continuación para firmar y fechar todos los documentos.",
    signDescriptionCompleted: "Los documentos han sido completados y firmados.",
    signConsentText:
      "He revisado los documentos y doy mi consentimiento para el uso de firmas electrónicas.",
    signButtonText: `Firme el documento {{packet.name}}`,

    completedButtonText: "Ir a la pagina de descarga",

    error: "Oops occurio un error:",

    // Page color customization. We will programmatically generate related colors
    // like text and hover colors based on the colors you choose.
    style: {
      primaryColor: "#1985a1", // Buttons, title underline, loading spinner
      successColor: "#1985a1", // Completed actions
      infoColor: "#46494c", // Info actions, uncompleted items
      linkColor: "#1985a1", // Links

      // See the section below for more white labeling options
    },
  };
};
