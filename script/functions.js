// LOAD FROM JSON
async function getData(...args) {
    let result;
    await $.getJSON('data/data.json', function (data) {
        result = data['data'];
        for (const arg of args) {
            if (result[arg] === undefined) {
                throw new Error(`Invalid argument: ${arg}`);
            }
            result = result[arg];
        }
    });
    return result;
}

// START CORRUPTED
async function start() {
    $('.mainStyleSheet').attr('href', 'styles/corrupted.css');
    $('.easter').addClass('hidden');
    $('#aboutMe .pcontent').removeClass('hidden');
    $('.scriptstable').attr('src', '');
    await startEasterEgg();
}

// REVERT FROM CORRUPTED
async function revert() {
    $('.mainStyleSheet').attr('href', 'styles/stable.css');
    $('.easter').removeClass('hidden');
    $('#aboutMe .pcontent').addClass('hidden');
    $('.scriptstable').attr('src', 'stable.js');
    location.reload();
}


// EASTER EGG
async function startEasterEgg() {
    const $loadElement = $('.load');

    changeSection('load');
    $('.easter').addClass('hidden');

    $loadElement.removeClass('hidden');
    changeSection('load');

    await sleep(1000);
    $loadElement.addClass('hidden');
    changeSection('start');

    const $startText = $('.start div h1');
    const $loadText = $('.start div p');
    $startText.hide();
    $loadText.hide();

    await sleep(2000);
    $startText.show();
    typeWriter($startText, 150);

    await sleep(3000);
    $loadText.show();
    typeWriter($loadText, 150);
    await sleep(4000);
    $loadText.text('ERROR - CORRUPTED SYSTEM DATA');
    easterEgg();
    noiseaudio.play();
    await sleep(1000);

    changeSection('homePage');
}

async function easterEgg() {
    $('.controlpanel #con').text(`Connection: ${connectionstatus}`);
    $('.controlpanel #sys').text(`System status: ${sysstatus}`);

    $(window).on('focus', function () {
        noiseaudio.play();
    });
    $(window).on('blur', function () {
        noiseaudio.pause();
    });

    if (sysstatus == 'corrupted') {
        $('.mainStyleSheet').attr('href', 'styles/corrupted.css');
        $('.easter').addClass('hidden');
        $('#notifier').removeClass('hidden');
        randomblink(blinkinterval);
        transitpageAnim = true;
        // typeinterval = 50;

    } else if (sysstatus == 'stable') {
        $('.easter').removeClass('hidden');
        noiseaudio.pause();
        changepagesound.volume = 0;
        transitpageAnim = false;
        typeinterval = 0;

    } else {
        $('#notifier').addClass('hidden');
    }
}

async function randomblink(blinkinterval) {
    const $divs = $('section');
    const interval = Math.floor(Math.random() * blinkinterval);
    await sleep(interval > 1000 ? interval : 5000);
    $divs.css('opacity', '0');
    await sleep(50);
    $divs.css('opacity', '1');
    randomblink(blinkinterval);
}

function typeWriter($element, interval) {
    const textArray = $element.text().split('');
    $element.text('');
    textArray.forEach((letter, i) => {
        setTimeout(() => $element.append(letter),
            (typeinterval == 0 ? typeinterval : interval) * i);
    });
}

function age() {
    const $agetext = $('.myage');
    const birthdate = new Date('2002-12-31');
    const today = new Date();
    const age = today.getFullYear() - (birthdate.getFullYear() + 1)
        + Math.floor((today.getMonth() - birthdate.getMonth()) / 12 + 1);
    $agetext.text(`Age: ${age}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function opencontrolpanel() {
    cp.classList.toggle('hidden');
}

async function transitpage(activeSection) {
    const $activeSection = $(activeSection);
    if (transitpageAnim == true) {
        changepagesound.play();
        await sleep(20); $activeSection.css('background', 'black');
        await sleep(20); $activeSection.css('background', 'white');
        await sleep(20); $activeSection.css('background', 'transparent');
    } else {
        $activeSection.css('background', 'transparent');
    }
}

async function changeSection(name) {
    const sections = $('section');
    const activeSection = $('section.active');
    const thissection = $(`#${name}`);
    if (activeSection) { await transitpage(activeSection); }
    await sleep(50);
    thissection.addClass('active');
    sections.not(thissection).removeClass('active');
}

function backSection() {
    const activeSection = $('section.active');
    const sections = $('section');
    const index = sections.index(activeSection);
    if (index > 0) { changeSection(sections.eq(index - 1).attr('id')); }
}

function goHomePage() { changeSection('homePage'); }

// STABLE FUNCTIONS
async function projModal(passedName, type = 'none') {
    const result = await getData('projects');
    const item = result.pagecontent.items.find((i) => i.name === passedName);

    const buttons = `
    <div class="btns">
        <button id="closeModal" class="secondary" onclick="closeModal()">Close</button>
        <button id="viewProjectbtn" onclick="openUrl('${item.link}')">View Project Repo</button>
    </div>`;

    const images = item.images.map((img, index) => `
    <img src="${img}" id="${img}" alt="${item.name}">
    <div class=""${index === 0 ? 'item active' : 'item'} id="index${img}" onclick="scrollCaroussel('.caroussel', this)"></div>
    `).join('');

    const content = `
    <div class="modalWindow">
        <div class="modalContent ${type === 'main' ? 'mainWindow' : ''}">
            <p class="title">${item.name}</p>
            <div class="caroussel" dir="ltr">
                ${images}
            </div>
            <div class="imgbtn">
                ${item.images.map((img, index) => `
                    <div class="item ${index === 0 ? 'active' : ''}" id="index${img}" onclick="scrollCaroussel('.caroussel', this)"></div>
                `).join('')}
            </div>
            <p>${item.description}</p>
            ${type === 'main' ? buttons : ''}
        </div>
    </div>`;
    $('body').append(content);
    $('.mainWindow').css('animation', 'modalWindow 0.2s');
    $('.caroussel').scroll(function () {
        scrollPos = $(this).scrollLeft();
        const images = $(this).children().toArray();
        const imgWitdh = images[0].offsetWidth;
        const index = Math.round(scrollPos / imgWitdh);
        $('.item').removeClass('active');
        $(`.item:eq(${index})`).addClass('active');
    });
    cAutoScroll('.caroussel', '.imgbtn');
}

function openUrl(url) {
    return window.open(url, '_blank');
}

async function closeModal() {
    $('.mainWindow').css('animation', 'none');
    await sleep(1);
    $('.mainWindow').css('animation', 'modalWindow 0.2s reverse');
    await sleep(200);
    $('.modalWindow').remove();
}

function scrollCaroussel(item, index) {
    const images = $(item).children().toArray();
    const indexValue = index.id.replace('index', '');
    const img = images.find((img) => img.id === indexValue);
    $(item).scrollLeft(img.offsetLeft);
    $('.item').removeClass('active');
    $(index).addClass('active');
}

function cAutoScroll(caroussel, timedisplay = '') {
    const elements = $(caroussel).children().toArray();
    if (elements.length === 0) {
        console.error('No elements found for:', caroussel);
        return;
    }
    const elementsWidth = elements[0].offsetWidth;
    const elementsCount = elements.length / 2;
    const maxScroll = ($(caroussel).scrollLeft() / elementsWidth).toFixed(0);

    setTimeout(function () {
        if (maxScroll < elementsCount - 1) {
            $(caroussel).scrollLeft($(caroussel).scrollLeft() + elementsWidth);
        } else {
            $(caroussel).scrollLeft(0);
        }
        cAutoScroll(caroussel, timedisplay);
    }, 3000);
}

function headerEngine(style) {
    style == true ? $('.sections').addClass('expanded') : $('.sections').removeClass('expanded');
    style == true ? $('header').addClass('collapsed') : $('header').removeClass('collapsed');
}

function cutString(str, start, end) {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex) + end.length;
    return str.substring(startIndex, endIndex);
}

async function scrollToo(element, nav, header = true) {
    headerEngine(header);
    $('header ul li').removeClass('active');
    await sleep(110);
    $(element).get(0).scrollIntoView({ behavior: 'smooth', block: 'start' });
    $(nav).addClass('active');
    currentPage = element;
    currentNav = nav;
}

function scrollSlide(caroussel, direction = 1) {
    const element = $(caroussel)[0];
    const newScrollPosition = direction === 1 ? element.scrollLeft + element.offsetWidth :
        element.scrollLeft - element.offsetWidth;
    element.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
    });
}