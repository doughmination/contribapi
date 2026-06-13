import { queryCodeberg } from "./codeberg";
import { queryGithub } from "./github";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export default {
	async fetch(request, env): Promise<Response> {
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: corsHeaders,
			});
		} else if (request.method != "GET") {
			return new Response("OwO wutz that");
		}

		const responses = await Promise.all([queryGithub(env), queryCodeberg(env)]);
		const merged = Object.assign({}, ...responses);

		return Response.json(merged, {
			headers: {
				...corsHeaders,
				"Cache-Control": "public, max-age=3600",
			},
		});
	},
} satisfies ExportedHandler<Env>;
