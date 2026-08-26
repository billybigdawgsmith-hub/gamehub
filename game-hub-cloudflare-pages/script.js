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
 * Google Classroom icon.
 */
const classroomIcon =
  "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/google-classroom.webp";


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
   * Title for the new tab.
   */
  const safeTitle =
    escapeHtml("Google Classroom");


  /*
   * Create the new page.
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

      <!-- Google Classroom icon -->
      <link
        rel="icon"
        type="image/webp"
        href="${classroomIcon}"
      >

      <link
        rel="shortcut icon"
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


  /*
   * Set the favicon again after the
   * document has been created.
   *
   * This helps browsers that don't
   * immediately recognize the favicon
   * inside document.write().
   */
  const favicon =
    tab.document.createElement("link");

  favicon.rel = "icon";
  favicon.type = "image/webp";
  favicon.href = classroomIcon;

  tab.document.head.appendChild(favicon);


  /*
   * Set the title again after the
   * document has been created.
   */
  tab.document.title =
    "Google Classroom";
  tab.document.icon = 
    classroomIcon;
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
   * Create the cards.
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