import { z } from "zod";
import { Day, daySchema, USER_AGENT } from "./common";

export const codebergResponse = z.array(daySchema);

export async function queryCodeberg(env: Env): Promise<{ codeberg: Day[] }> {
	const response = await fetch(
		`https://codeberg.org/api/v1/users/${env.CODEBERG_USERNAME}/heatmap`,
		{
			headers: {
				"User-Agent": USER_AGENT,
			},
		},
	);
	return { codeberg: codebergResponse.parse(await response.json()) };
}
