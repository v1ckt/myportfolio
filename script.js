// AUDIO CONTROLLERS
const noiseaudio = document.querySelector('.noisesound');
const changepagesound = document.querySelector('.pagechangesound');
const noisebg = document.querySelector('.bg');

var sysstatus; var connectionstatus = 'stable';
var transitpageAnim = true;
var typeinterval; var blinkinterval = 9999;
changepagesound.volume = 0.5;
noiseaudio.volume = 0.1;

noiseaudio.addEventListener('ended', () => { this.play(); });

// SECTION CONTROLLERS
async function transitpage(activeSection) {
    if (transitpageAnim == true) {
        changepagesound.play();
        await sleep(20); activeSection.style.background = 'black';
        await sleep(20); activeSection.style.background = 'white';
        await sleep(20); activeSection.style.background = 'transparent';
    } else { activeSection.style.background = 'transparent'; }
}

async function changeSection(name) {
    const sections = document.querySelectorAll('section');
    const activeSection = document.querySelector('section.active');
    const thissection = document.querySelector(`#${name}`);
    if (activeSection) { await transitpage(activeSection); }
    await sleep(50);
    sections.forEach((section) => {
        section.classList.remove('active');
    });
    thissection.classList.add('active');
}

function backSection() {
    const activeSection = document.querySelector('section.active');
    const sections = document.querySelectorAll('section');
    const index = Array.from(sections).indexOf(activeSection);
    if (index > 0) { changeSection(sections[index - 1].id); }
}

function goHomePage() { changeSection('homePage'); }

// VISUAL FUNCTIONS
function typeWriter(element, interval) {
    const textArray = element.innerHTML.split(''); element.innerHTML = '';
    textArray.forEach((letter, i) => {
        setTimeout(() => element.innerHTML += letter,
            (typeinterval == 0 ? typeinterval : interval) * i);
    });
}

function age() {
    const agetext = document.querySelector('.myage');
    const birthdate = new Date('2002-12-31'); const today = new Date();
    const age = today.getFullYear() - (birthdate.getFullYear() + 1)
        + Math.floor((today.getMonth() - birthdate.getMonth()) / 12 + 1);
    agetext.innerHTML = `Age: ${age}`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function opencontrolpanel() {
    cp.classList.toggle('hidden');
}

// EVENT LISTENERS
document.querySelector('#aboutMebtn').addEventListener('click',
    async () => { changeSection('aboutMe'); });
document.querySelector('#Skillsbtn').addEventListener('click',
    async () => { changeSection('Skills'); });
document.querySelector('#Projectsbtn').addEventListener('click',
    async () => { changeSection('Projects'); });
document.querySelector('#Contactsbtn').addEventListener('click',
    async () => { changeSection('Contacts'); });
document.querySelector('#Exitbtn').addEventListener('click', () => { revert(); });

const alerts = document.querySelectorAll('.alert');
alerts.forEach((alert) => { alert.style.animation = 'blink 2s infinite'; });

async function randomblink(blinkinterval) {
    const divs = document.querySelectorAll('section');
    const interval = Math.floor(Math.random() * blinkinterval);
    await sleep(interval > 1000 ? interval : 5000);
    divs.forEach((div) => { div.style.opacity = '0'; });
    await sleep(50); divs.forEach((div) => { div.style.opacity = '1'; });
    randomblink(blinkinterval);
}

// EASTER EGG ENGINE
const cp = document.querySelector('.controlpanel');
const statusoptions = ['stable', 'corrupted', 'unstable', 'unknown', 'alert'];
const connectionoptions = ['stable', 'unstable', 'unknown'];

async function easterEgg() {
    document.querySelector('.controlpanel #con').innerHTML = `Connection: ${connectionstatus}`;
    document.querySelector('.controlpanel #sys').innerHTML = `System status: ${sysstatus}`;

    window.addEventListener('focus', function () {
        noiseaudio.play();
    });
    window.addEventListener('blur', function () {
        noiseaudio.pause();
    });

    if (sysstatus == 'corrupted') {
        document.querySelector('.mainStyleSheet').href = 'styles/corrupted.css';
        document.querySelector('.easter').classList.add('hidden');
        document.querySelector('#notifier').classList.remove('hidden');
        randomblink(blinkinterval);
        transitpageAnim = true;
        // typeinterval = 50;

    } else if (sysstatus == 'stable') {
        document.querySelector('.easter').classList.remove('hidden');
        noiseaudio.pause();
        changepagesound.volume = 0;
        transitpageAnim = false;
        typeinterval = 0;

    } else {
        document.querySelector('#notifier').classList.add('hidden');
    }

}

age();

// WINDOW LOAD
async function startEasterEgg() {
    const loadElement = document.querySelector('.load');

    changeSection('load');
    document.querySelector('.easter').classList.add('hidden');

    loadElement.classList.remove('hidden');
    changeSection('load');

    await sleep(1000);
    loadElement.classList.add('hidden');
    changeSection('start');

    const startText = document.querySelector('.start div h1');
    const loadText = document.querySelector('.start div p');
    startText.style.display = 'none';
    loadText.style.display = 'none';

    await sleep(2000);
    startText.style.display = 'flex';
    typeWriter(startText, 150);

    await sleep(3000);
    loadText.style.display = 'flex';
    typeWriter(loadText, 150);
    await sleep(4000);
    loadText.innerHTML = 'ERROR - CORRUPTED SYSTEM DATA';
    easterEgg();
    noiseaudio.play();
    await sleep(1000);

    changeSection('homePage');
}

async function start() {
    document.querySelector('.mainStyleSheet').href = 'styles/corrupted.css';
    document.querySelector('.easter').classList.add('hidden');
    document.querySelector('#aboutMe .pcontent').classList.remove('hidden');
    document.querySelector('.scriptstable').src = '';
    await startEasterEgg();
}

async function revert() {
    document.querySelector('.mainStyleSheet').href = 'styles/stable.css';
    document.querySelector('.easter').classList.remove('hidden');
    document.querySelector('#aboutMe .pcontent').classList.add('hidden');
    document.querySelector('.scriptstable').src = 'stable.js';
    window.location.reload();
}