import { principalClientSchema } from "./principalClientSchema";
import { significantPartnerSchema } from "./significantPartnerSchema";
import { z } from "zod";

const stepSchema = z.object({
  id: z.number(),
  tag: z.string(),
  status: z.enum(["current", "upcoming", "complete"]),
  icon: z.any().optional(),
  title: z.string(),
  description: z.string(),
  data: z.union([principalClientSchema, significantPartnerSchema]),
});

const stepsDataSchema = z.array(stepSchema).refine(
  (steps) => {
    return steps.every((step, index) => {
      if (index === 0) {
        return principalClientSchema.safeParse(step.data).success;
      } else {
        return significantPartnerSchema.safeParse(step.data).success;
      }
    });
  },
  {
    message: "Invalid schema for steps data",
  }
);

export { stepsDataSchema };
