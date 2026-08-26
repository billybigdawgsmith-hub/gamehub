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
  },
  {
    name: "Idle Breakout",
    url: "https://billybigdawgsmith-hub.github.io/idle-breakout/",
    image: "images/GameThree.jpg"
  }
];


/*
 * Page elements.
 */

const gamesContainer =
  document.getElementById("games");

const emptyState =
  document.getElementById("emptyState");


/*
 * Google Classroom icon.
 *
 * This is the exact icon URL you provided.
 */

const classroomIcon =
  "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-classroom.webp";


/*
 * Opens a game in a new tab.
 */

function launchGame(game) {

  /*
   * Open the new tab immediately
   * from the user's click.
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
   * Create the HTML for the new tab.
   *
   * Instead of leaving the tab as
   * about:blank, we create a real
   * Blob document.
   */

  const html = `
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <title>Google Classroom</title>

      <link
        rel="icon"
        type="image/webp"
        href="${classroomIcon}"
      >

      <link
        rel="shortcut icon"
        type="image/webp"
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
        title="Google Classroom"
        allow="fullscreen; autoplay; gamepad"
        allowfullscreen>
      </iframe>

    </body>

    </html>
  `;


  /*
   * Turn the HTML into a real document.
   */

  const blob = new Blob(
    [html],
    {
      type: "text/html"
    }
  );


  /*
   * Create a temporary URL for the
   * new document.
   */

  const blobUrl =
    URL.createObjectURL(blob);


  /*
   * Navigate the new tab to the
   * Blob document.
   *
   * This is what makes the favicon
   * work much more reliably than
   * using about:blank.
   */

  tab.location.href = blobUrl;


  /*
   * Clean up the temporary URL
   * after the browser has loaded it.
   */

  setTimeout(() => {

    URL.revokeObjectURL(blobUrl);

  }, 10000);
}


/*
 * Safely escape HTML text.
 */

function escapeHtml(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}


/*
 * Safely escape HTML attributes.
 */

function escapeAttribute(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    );
}


/*
 * Create all game cards.
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
   * Create the game cards.
   *
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
   * Make every game card clickable.
   */

  gamesContainer
    .querySelectorAll(".game-card")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          const game =
            games[
              Number(
                card.dataset.gameIndex
              )
            ];

          launchGame(game);
        }
      );

    });
}


/*
 * Render the games when the page loads.
 */

renderGames();