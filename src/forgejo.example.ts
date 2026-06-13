import { z } from "zod";
import { Day, daySchema, USER_AGENT } from "./common";

// CHANGE `forgejoResponse`
export const forgejoResponse = z.array(daySchema);

// CHANGE `queryForgejo` AND `{ forgejo: Day[] }`
export async function queryForgejo(env: Env): Promise<{ forgejo: Day[] }> {
	const response = await fetch(
		// CHANGE `https://example.com` and `env.FORGEJO_USERNAME`
		`https://example.com/api/v1/users/${env.FORGEJO_USERNAME}/heatmap`,
		{
			headers: {
				"User-Agent": USER_AGENT,
			},
		},
	);
	// CHANGE `forgejo:` and `forgejoResponse`
	return { forgejo: forgejoResponse.parse(await response.json()) };
}
