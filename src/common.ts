import { z } from "zod";

export const USER_AGENT = "contribapi/0.1.0-dev (https://codeberg.org/dragsbruh/contribapi)";

export const daySchema = z.strictObject({
	timestamp: z.int().positive(),
	contributions: z.int().positive(),
});

export type Day = z.infer<typeof daySchema>;
