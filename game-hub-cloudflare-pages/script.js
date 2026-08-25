const games = [
  {
    name: "Minecraft",
    url: "https://algebra-dy2.pages.dev/",
    image: "images/GameOne.png"
  },

  {
    name: "Game Two",
    url: "https://polytrack.billybigdawgsmith.workers.dev/",
    image: "images/GameTwo.png"
  },

  {
    name: "Game Three",
    url: "https://game-three.pages.dev",
    image: "images/game-three.jpg"
  }
];


const gamesContainer = document.getElementById("games");
const emptyState = document.getElementById("emptyState");
const gameCount = document.getElementById("gameCount");


function launchGame(game) {

  // Open a blank tab directly from the button click.
  const tab = window.open("about:blank", "_blank");

  if (!tab) {
    alert("The game could not open. Please allow pop-ups for this site.");
    return;
  }

  const safeTitle = escapeHtml(game.name);

  tab.document.open();

  tab.document.write(`
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <title>${safeTitle}</title>

      <style>

        * {
          box-sizing: border-box;
        }

        html,
        body {
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


  gameCount.textContent =
    `${games.length} ${games.length === 1 ? "game" : "games"}`;


  gamesContainer.innerHTML = games.map((game, index) => `

    <article class="game-card">

      <button
        class="game-button"
        type="button"
        data-game-index="${index}"
        aria-label="Launch ${escapeHtml(game.name)}"
      >

        <div class="game-image">

          <img
            src="${escapeAttribute(game.image)}"
            alt="${escapeHtml(game.name)}"
          >

        </div>

        <h2>${escapeHtml(game.name)}</h2>

      </button>

    </article>

  `).join("");


  gamesContainer
    .querySelectorAll(".game-button")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const game =
          games[Number(button.dataset.gameIndex)];

        launchGame(game);

      });

    });

}


renderGames();