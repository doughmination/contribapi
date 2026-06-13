import { z } from "zod";
import { Day, USER_AGENT } from "./common";

const graphqlQuery = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            color
          }
        }
      }
    }
  }
}`;

export const githubResponse = z
	.object({
		data: z.object({
			user: z.object({
				contributionsCollection: z.object({
					contributionCalendar: z.object({
						weeks: z.array(
							z.object({
								contributionDays: z.array(
									z
										.object({
											date: z.coerce.date(),
											contributionCount: z.number(),
										})
										.transform((o) => ({
											timestamp: Math.floor(o.date.getTime() / 1000),
											contributions: o.contributionCount,
										})),
								),
							}),
						),
					}),
				}),
			}),
		}),
	})
	.transform((o) => ({
		github: o.data.user.contributionsCollection.contributionCalendar.weeks
			.map((d) => d.contributionDays)
			.flat(),
	}));

export async function queryGithub(env: Env): Promise<{ github: Day[] }> {
	const response = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"User-Agent": USER_AGENT,
			"Content-Type": "application/json",
			Authorization: `Bearer ${env.GITHUB_TOKEN}`,
		},
		body: JSON.stringify({
			query: graphqlQuery,
			variables: { username: env.GITHUB_USERNAME },
		}),
	});
	return githubResponse.parse(await response.json());
}
