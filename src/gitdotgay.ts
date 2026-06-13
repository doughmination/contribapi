import { z } from "zod";
import { Day, daySchema, USER_AGENT } from "./common";

export const gitdotgayResponse = z.array(daySchema);

export async function queryGitdotGay(env: Env): Promise<{ gitdotgay: Day[] }> {
	const response = await fetch(
		// CHANGE `https://example.com` and `env.FORGEJO_USERNAME`
		`https://git.gay/api/v1/users/${env.GITDOTGAY_USERNAME}/heatmap`,
		{
			headers: {
				"User-Agent": USER_AGENT,
			},
		},
	);

	return { gitdotgay: gitdotgayResponse.parse(await response.json()) };
}
