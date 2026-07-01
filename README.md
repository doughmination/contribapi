# contribapi

tiny extensible api to merge contribution heatmap from forgejo (git.gay, codeberg, etc)
and github.

> [!IMPORTANT]
> This repo is NOT by me, this is works by [dragsbruh](https://codeberg.org/dragsbruh), and you can find the original repo on [Codeberg](https://codeberg.org/dragsbruh/contribapi).
> I originally made edits so I could keep up with it, but I still want the original owner attributed

> [!NOTE]
> I did add a copy of ESAL-2.0 in commits, but this was an accident due to updating all my repos at once. Please ignore this in the commit history, it was not intentional.

## usage

this runs as a cloudflare worker

### configuration

for testing, put these variables in `.dev.vars`. in production you will need to use wrangler
to update worker secrets with this command:

```sh
pnpx wrangler secret put <name>
# it will prompt you for value
```

**1. codeberg**

codeberg (or forgejo in general) do not need api keys to get user heatmap.

```env
CODEBERG_USERNAME=doughmination
```

**2. github**

github needs an api key. i recommend you use a fine grained personal access token
with access to commit statuses of all repos.

https://github.com/settings/personal-access-tokens

```env
GITHUB_USERNAME=doughmination
GITHUB_TOKEN=github_pat_xxxxxxxxxx
```

**other forgejo instances**

ill use [git.gay](https://git.gay) in this example

- copy `src/forgejo.example.ts` to, `src/gitdotgay.ts`
- read comments in `src/gitdotgay.ts` and change as described, its like 4 changes
- read `queryForges` function in `src/index.ts` and add your query function as shown

to remove github/etc, its the same, you just remove `queryGithub`

### deploying

```sh
pnpm deploy
```
