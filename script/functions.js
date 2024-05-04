// LOAD FROM JSON
async function getData(...args) {
    const response = await fetch('data/data.json');
    const data = await response.json();
    let result = data['data'];
    for (const arg of args) {
        if (result[arg] === undefined) {
            throw new Error(`Invalid argument: ${arg}`);
        }
        result = result[arg];
    }
    return await result;
}

// START CORRUPTED
async function start() {
    document.querySelector('.mainStyleSheet').href = 'styles/corrupted.css';
    document.querySelector('.easter').classList.add('hidden');
    document.querySelector('#aboutMe .pcontent').classList.remove('hidden');
    document.querySelector('.scriptstable').src = '';
    await startEasterEgg();
}

// REVERT FROM CORRUPTED
async function revert() {
    document.querySelector('.mainStyleSheet').href = 'styles/stable.css';
    document.querySelector('.easter').classList.remove('hidden');
    document.querySelector('#aboutMe .pcontent').classList.add('hidden');
    document.querySelector('.scriptstable').src = 'stable.js';
    window.location.reload();
}


// EASTER EGG
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

async function randomblink(blinkinterval) {
    const divs = document.querySelectorAll('section');
    const interval = Math.floor(Math.random() * blinkinterval);
    await sleep(interval > 1000 ? interval : 5000);
    divs.forEach((div) => { div.style.opacity = '0'; });
    await sleep(50); divs.forEach((div) => { div.style.opacity = '1'; });
    randomblink(blinkinterval);
}

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


// STABLE FUNCTIONS
function projModal(item, type = 'none') {
    const buttons = `
    <div class="btns">
        <button id="closeModal" class="secondary" onclick="closeModal()">Close</button>
        <button id="viewProjectbtn">View Project Repo</button>
    </div>`;
    const content = `
    <div class="modalContent ${type == 'main' ? 'mainWindow' : ''}">
        <p class="title">${item.name}</p>
        <div class="caroussel" dir="ltr" onmouseenter="cAutoScroll(this, '.imgbtn', 'hover')">
            ${item.images.map((img) => `<img src="${img}" id="${img}" alt="${item.name}">`).join('')}
        </div>
    <div class="imgbtn">
    ${item.images.map((i, index) => {
        let classString = 'item';
        if (index === 0) {
            classString += ' active';
        }
        return `<div class="${classString}" id="index${i}" onclick="scrollCaroussel('.caroussel', this)"></div>`;
    }).join('')}
    </div>
    <p>${item.description}</p>
    ${type == 'main' ? buttons : ''}
</div>`;

    return content;
}
function openUrl(url) {
    window.open(url, '_blank');
}
async function closeModal() {
    document.querySelector('.mainWindow').style.animation = 'none';
    await sleep(1);
    document.querySelector('.mainWindow').style.animation = 'modalWindow 0.2s reverse';
    await sleep(200);
    document.querySelector('.modalWindow').remove();
}

function scrollCaroussel(item, index) {
    const caroussel = document.querySelector(item);
    const images = Array.from(caroussel.children);
    const indexValue = index.id.replace('index', '');
    const img = images.find((img) => img.id === indexValue);
    caroussel.scrollLeft = img.offsetLeft;
    document.querySelectorAll('.item').forEach((index) => {
        index.classList.remove('active');
    });
    index.classList.add('active');
}

function cAutoScroll(caroussel, eclicked, controll) {
    const ec = document.querySelector(eclicked);
    const ce = caroussel;
    let interval;
    console.log('start');
    if (controll === 'hover') {
        let index = 0;
        ce.addEventListener('mouseenter', () => {
            interval = setInterval(() => {
                ec.children[index].click();
                index = index === ec.children.length - 1 ? 0 : index + 1;
            }, 1000);
        });
        ce.addEventListener('mouseleave', () => {
            index = index;
            clearInterval(interval);
        });
    }
}

function headerEngine(style) {
    if (style == true) {
        document.querySelector('header').classList.add('collapsed');
        document.querySelector('.sections').classList.add('expanded');
    } else {
        document.querySelector('header').classList.remove('collapsed');
        document.querySelector('.sections').classList.remove('expanded');
    }
}

function cutString(str, start, end) {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex) + end.length;
    return str.substring(startIndex, endIndex);
}

function scrollToo(element, nav) {
    document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('header ul li').forEach((a) => {
        a.classList.remove('active');
    });
    document.querySelector(nav).classList.add('active');
    currentPage = element;
    currentNav = nav;

}