import Anvil from "@anvilco/anvil";

export const anvilClient = new Anvil({
  apiKey:
    process.env.NODE_ENV === "development"
      ? process.env.ANVIL_DEVELOPMENT
      : process.env.ANVIL_PRODUCTION,
});
