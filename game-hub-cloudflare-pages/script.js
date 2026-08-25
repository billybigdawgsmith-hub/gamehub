
/*
 * Add your Cloudflare Pages games here.
 */

const games = [
  {
    name: "Minecraft",
    description: "",
    url: "https://algebra-dy2.pages.dev/",
    image: "images/GameOne.png"
  },

  {
    name: "Polytrack",
    description: "",
    url: "https://polytrack.billybigdawgsmith.workers.dev/",
    image: "images/GameTwo.png"
  }
];


const gamesContainer =
  document.getElementById("games");

const emptyState =
  document.getElementById("emptyState");


/*
 * Opens the selected game
 * in a new tab.
 */
function launchGame(game) {

  /*
   * Open a blank tab immediately
   * from the card click.
   */
  const tab = window.open(
    "about:blank",
    "_blank"
  );


  /*
   * Check if the browser blocked
   * the new tab.
   */
  if (!tab) {
    alert(
      "The game could not open. " +
      "Please allow pop-ups for this site."
    );

    return;
  }


  /*
   * New tab title.
   */
  const safeTitle =
    escapeHtml("Google Classroom");


  /*
   * Actual Google Classroom favicon.
   *
   * This is the favicon used by
   * classroom.google.com.
   */
  const classroomIcon =
    "https://classroom.google.com/favicon.ico";


  /*
   * Create the new tab.
   */
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

      <link
        rel="icon"
        type="image/x-icon"
        href="${classroomIcon}"
      >

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


/*
 * Safely escape HTML text.
 */
function escapeHtml(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/*
 * Safely escape HTML attributes.
 */
function escapeAttribute(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}


/*
 * Create the game cards.
 */
function renderGames() {

  /*
   * Show the empty state if there
   * are no games.
   */
  if (!games.length) {
    emptyState.hidden = false;
    return;
  }


  /*
   * The entire card is clickable.
   */
  gamesContainer.innerHTML =
    games.map((game, index) => `
      <button
        class="game-card"
        type="button"
        data-game-index="${index}"
        aria-label="Launch ${escapeHtml(game.name)}"
      >

        <img
          class="game-image"
          src="${escapeAttribute(game.image)}"
          alt="${escapeHtml(game.name)}"
        >

        <h2>
          ${escapeHtml(game.name)}
        </h2>

      </button>
    `).join("");


  /*
   * Make every card launch its game.
   */
  gamesContainer
    .querySelectorAll(".game-card")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          const game =
            games[
              Number(card.dataset.gameIndex)
            ];

          launchGame(game);
        }
      );

    });
}

renderGames();
