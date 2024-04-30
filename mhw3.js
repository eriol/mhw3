const MENU_OPEN = 'images/bars-solid.svg';
const MENU_CLOSE = 'images/xmark-solid.svg';
const DESKTOP_RCOL_BCK_IMAGE = 'url(images/ancient-greece-horse-race.webp)';
const DESKTOP_RCOL_BCK_IMAGE2 = 'url(images/ancient-greece-boxing.webp)';
const features = [
  'Misura le tue prestazioni.',
  'Entra in contatto con gli amici e condividi la tua avventura.',
  'Monitora e analizza tutti gli aspetti della tua attività.',
  'ἀθλητική è il social network per gli atleti.',
  'Esplora nuovi percorsi e competi con una comunità globale.',
];
const MAX_CHOICES = 3;

const ATHLETES_API_URL = 'https://wp24-athletes.colca.mornie.org';
const ATHLETES_API_URL_RANDOM = ATHLETES_API_URL + '/random';
const DEITIES_API_URL = 'https://wp24-deities.colca.mornie.org';
const DEITIES_API_URL_RANDOM = DEITIES_API_URL + '/random';
const DEITIES_API_CLIENT_ID = 'eriol';
// This is something you MUST not to do, but it's required for the
// homework. Anyway I wrote this API and although it uses OAuth2 it's
// read only and the data are public.
const DEITIES_API_CLIENT_SECRET = '1qaz2wsx3edc4rfv5tgb6yhn7ujm';
const DEITIES_API_URL_TOKEN = DEITIES_API_URL + '/token';
const DEITIES_API_URL_RANDOM_DEITY = DEITIES_API_URL + '/random';

const menu = document.querySelector('#menu');
const menuPanel = document.querySelector('#menu_panel');
const menuPanelNav = document.querySelector('#menu_panel nav');
const menuModal = document.querySelector('#menu_modal');
const menuIcon = document.querySelector('#menu img');
const desktopRightColumn = document.querySelector('.right_column');
const featureExploreButton = document.querySelector('#features-explore');
const featureMore = document.querySelector('#features-more');
const subscriptionExploreButton = document.querySelector(
  '#subscription-explore',
);
const subscriptionMore = document.querySelector('#subscription-more');
const fidippide = document.querySelector('.fidippide');
const athleteInfo = document.querySelector('.athletes .info');
const athletePhoto = document.querySelector('.athletes .photo');
const deities = document.querySelector('.deities');

// Open and close the side menu panel.
function onMenuClicked(event) {
  event.stopPropagation();

  menuPanel.classList.toggle('show');
  menuPanelNav.classList.toggle('show');
  menuModal.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
  // We use a data attribute to save the menu state in order
  // to change the menu icon.
  if (menuIcon.dataset.state === 'open') {
    menuIcon.src = MENU_CLOSE;
    menuIcon.dataset.state = 'close';
  } else {
    menuIcon.dataset.state = 'open';
    menuIcon.src = MENU_OPEN;
  }
}

// Change desktop right column background image on mouseover
// and mouseout.
function onDesktopRightColumnMouseOver(event) {
  event.currentTarget.style.backgroundImage = DESKTOP_RCOL_BCK_IMAGE2;
}
function onDesktopRightColumnMouseOut(event) {
  event.currentTarget.style.backgroundImage = DESKTOP_RCOL_BCK_IMAGE;
}

// Choose 3 random features and display them.
// We also change the button text on click.
function onFeatureMoreClickToOpen(event) {
  const already_choosen = new Set();
  featureMore.innerHTML = '';

  for (let i = 0; i < MAX_CHOICES; i++) {
    while (true) {
      const index = Math.floor(Math.random() * features.length);
      if (already_choosen.has(index)) {
        continue;
      }
      already_choosen.add(index);
      break;
    }
  }
  for (const index of already_choosen) {
    const newDiv = document.createElement('div');
    newDiv.textContent = features[index];
    featureMore.appendChild(newDiv);
  }

  featureMore.classList.remove('hidden');
  const button = event.currentTarget;
  button.textContent = 'CHIUDI';
  button.removeEventListener('click', onFeatureMoreClickToOpen);
  button.addEventListener('click', onFeatureMoreClickToClose);
}

// Close the more features section and restore the button.
function onFeatureMoreClickToClose(event) {
  featureMore.classList.add('hidden');
  const button = event.currentTarget;
  button.textContent = 'ESPLORA';
  button.removeEventListener('click', onFeatureMoreClickToClose);
  button.addEventListener('click', onFeatureMoreClickToOpen);
}

// Open and close more subscription section.
// It change/restore also the explore button.
function onSubscriptionExploreClicked(event) {
  subscriptionMore.classList.toggle('hidden');
  const button = event.currentTarget;
  if (button.textContent === 'ESPLORA') {
    button.textContent = 'CHIUDI';
  } else {
    button.textContent = 'ESPLORA';
  }
}

// Change Fidippide name taking the new value from a data attribute.
function changeFidippide(event) {
  fidippide.textContent = fidippide.dataset.name;
}

menu.addEventListener('click', onMenuClicked);
desktopRightColumn.addEventListener('mouseover', onDesktopRightColumnMouseOver);
desktopRightColumn.addEventListener('mouseout', onDesktopRightColumnMouseOut);
featureExploreButton.addEventListener('click', onFeatureMoreClickToOpen);
subscriptionExploreButton.addEventListener(
  'click',
  onSubscriptionExploreClicked,
);
fidippide.addEventListener('mouseover', changeFidippide);

fetch(ATHLETES_API_URL_RANDOM).then(onAthletesResponse).then(onAthletesJson);

function onAthletesResponse(response) {
  return response.json();
}

function onAthletesJson(json) {
  const newH2 = document.createElement('h2');
  newH2.textContent = json.name;
  athleteInfo.appendChild(newH2);
  const newP = document.createElement('p');
  newP.textContent = json.famous_for;
  athleteInfo.appendChild(newP);

  const newImg = document.createElement('img');
  newImg.src = ATHLETES_API_URL + '/images/' + json.slug + '?size=M';
  athletePhoto.appendChild(newImg);
}

let token;

const deitiesTokenUrl = new URL(DEITIES_API_URL_TOKEN);
deitiesTokenUrl.searchParams.append('grant_type', 'client_credentials');
deitiesTokenUrl.searchParams.append('client_id', DEITIES_API_CLIENT_ID);
deitiesTokenUrl.searchParams.append('client_secret', DEITIES_API_CLIENT_SECRET);

fetch(deitiesTokenUrl.href).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response) {
  return response.json();
}

function onTokenJson(json) {
  token = json.access_token;

  loadOlympusInfluence();
}

function loadOlympusInfluence() {
  fetch(DEITIES_API_URL_RANDOM_DEITY, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Request-Method': 'GET',
    },
  }).then(onRandomDeityResponse).then(
    onRandomDeityJson,
  );
}

function onRandomDeityResponse(response) {
  return response.json();
}

function onRandomDeityJson(json) {
  const newH2 = document.createElement('h2');
  newH2.textContent = json.name;
  deities.appendChild(newH2);

  deityInfluence(json.id);
}

function deityInfluence(deity_id) {
  const u = new URL('./deities/' + deity_id + '/influence', DEITIES_API_URL);
  console.log(u.href);
  fetch(u.href, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Request-Method': 'GET',
    },
  }).then(onDeityInfluenceResponse).then(
    onDeityInfluenceJson,
  );
}

function onDeityInfluenceResponse(response) {
  return response.json();
}

function onDeityInfluenceJson(json) {
  console.log(json);
  const randomSport = json[Math.floor(Math.random() * json.length)];
  let what;
  if (randomSport.influence < 1) {
    what = 'malus';
  } else {
    what = 'bonus';
  }

  const newP = document.createElement('p');
  newP.textContent = 'ti darà un ' + what + ' in '
    + randomSport.name.toLowerCase() + '.';
  deities.appendChild(newP);

  console.log(randomSport);
}
