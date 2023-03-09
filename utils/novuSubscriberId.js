export const novuSubscriberId =
  process.env.NODE_ENV === "development"
    ? "weginsurance_development_novu_subscriber"
    : "weginsurance_production_novu_subscriber";
