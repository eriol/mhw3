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
