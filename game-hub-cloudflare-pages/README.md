# Game Hub

A simple static game hub designed for Cloudflare Pages.

## Deploy

Upload this folder to a Git repository and connect the repository to Cloudflare Pages.

Build settings:

- Framework preset: None
- Build command: None
- Build output directory: `/`

## Add games

Open `script.js` and edit the `games` array:

```js
const games = [
  {
    name: "My Game",
    description: "My awesome game.",
    url: "https://my-game.pages.dev",
    icon: "🎮"
  }
];
```

Each game launches in a new browser tab with the game loaded inside a full-window iframe.

## Important: iframe restrictions

Your game site must allow itself to be embedded by another site.

If your game sends `X-Frame-Options: DENY` or a restrictive
`Content-Security-Policy` such as `frame-ancestors 'none'`, browsers will
block the iframe.

Because these are your own Cloudflare Pages sites, check the headers/configuration
on each game if it refuses to load in the hub.

## Pop-ups

The hub opens the new tab directly from the button click. If the browser blocks
it, allow pop-ups for the hub domain.

## Local testing

You can open `index.html` directly for basic testing, but using a small local
web server is recommended.
