export const novuAPIKEY =
  process.env.NODE_ENV === "development"
    ? process.env.NOVU_DEVELOPMENT_API_KEY
    : process.env.NOVU_PRODUCTION_API_KEY;
