/*
 * Add your Cloudflare Pages games here.
 *
 * Example:
 * {
 *   name: "My Game",
 *   description: "A short description of the game.",
 *   url: "https://my-game.pages.dev",
 *   icon: "🎮"
 * }
 */

const games = [
  {
    name: "Minecraft",
    description: "",
    url: "https://algebra-dy2.pages.dev/",
    icon: "🎮"
  },
  {
    name: "Polytrack",
    description: "",
    url: "https://polytrack.billybigdawgsmith.workers.dev/",
    icon: "🕹️"
  },
  {
    name: "Game Three",
    description: "Replace this with your third game's description.",
    url: "https://game-three.pages.dev",
    icon: "👾"
  }
];

const gamesContainer = document.getElementById("games");
const emptyState = document.getElementById("emptyState");
const gameCount = document.getElementById("gameCount");

function launchGame(game) {
  /*
   * Open a blank tab first. This is important because browsers generally
   * block popups when a new window is not opened directly from a click.
   */
  const tab = window.open("about:blank", "_blank");

  if (!tab) {
    alert("The game could not open. Please allow pop-ups for this site.");
    return;
  }

  const safeTitle = escapeHtml("Google Classroom");

  tab.document.open();
  tab.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${safeTitle}</title>
      <style>
        * {
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #000;
        }

        iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
      </style>
    </head>
    <body>
      <iframe
        src="${escapeAttribute(game.url)}"
        title="${safeTitle}"
        allow="fullscreen; autoplay; gamepad"
        allowfullscreen>
      </iframe>
    </body>
    </html>
  `);
  tab.document.close();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderGames() {
  if (!games.length) {
    emptyState.hidden = false;
    gameCount.textContent = "0 games";
    return;
  }


  gamesContainer.innerHTML = games.map((game, index) => `
    <article class="game-card">
      <div class="game-icon" aria-hidden="true">${escapeHtml(game.icon || "🎮")}</div>
      <h2>${escapeHtml(game.name)}</h2>
      <p>${escapeHtml(game.description || "")}</p>
      <button class="play-button" type="button" data-game-index="${index}">
        Launch Game
      </button>
    </article>
  `).join("");

  gamesContainer.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", () => {
      const game = games[Number(button.dataset.gameIndex)];
      launchGame(game);
    });
  });
}

renderGames();
