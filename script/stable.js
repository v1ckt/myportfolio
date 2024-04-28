var currentPage;
var currentNav;
document.querySelector('.mainStyleSheet').href = 'styles/stable.css';

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

function headerEngine(style) {
    if (style == true) {
        document.querySelector('header').classList.add('collapsed');
        document.querySelector('.sections').classList.add('expanded');
    } else {
        document.querySelector('header').classList.remove('collapsed');
        document.querySelector('.sections').classList.remove('expanded');
    }
}
document.querySelector("#aboutbtn").addEventListener('click', () => {
    scrollToo('#aboutMe', '#aboutbtn');
    headerEngine(false);
});
document.querySelector("#skillsbtn").addEventListener('click', () => {
    scrollToo('#Skills', '#skillsbtn');
    headerEngine(true);
});
document.querySelector("#projectsbtn").addEventListener('click', () => {
    scrollToo('#Projects', '#projectsbtn');
    headerEngine(true);
});
document.querySelector("#contactsbtn").addEventListener('click', () => {
    scrollToo('#Contacts', '#contactsbtn');
    headerEngine(true);
});

window.addEventListener('load', () => {
    setTimeout(() => {
    const firstLine = document.createElement('p');
    const middleLine = document.createElement('h1');
    const lastLine = document.createElement('p');
    const element = document.querySelector('#aboutMe .content .presentation .pcontent');
    const presentation = document.querySelector('#aboutMe .presentation');
    const text = element ? element.textContent : '';
    const first = cutString(text, 'Hello', 'Vicktor');
    const middle = cutString(text, "I'm", "Developer.");
    const last = cutString(text, 'I recently', 'engineering.');
    const btn = document.createElement('button');

    btn.innerHTML = 'See More';
    btn.classList.add('secondary');
    btn.style.marginTop = '20px';

    btn.addEventListener('click', () => { document.querySelector("#skillsbtn").click(); });

    firstLine.innerHTML = first;
    middleLine.innerHTML = middle;
    lastLine.innerHTML = last;

    presentation.appendChild(firstLine);
    presentation.appendChild(middleLine);
    presentation.appendChild(lastLine);
    presentation.appendChild(btn);

    document.querySelector("#aboutbtn").click();
    }, 100);
});

window.addEventListener('resize', async () => {
    scrollToo(currentPage, currentNav);
});

// Encontra a folha de estilo correta
let styleSheet = Array.from(document.styleSheets).find(sheet => sheet.href.includes('main.css'));
let currentvalue = [];
randrange = (min, max) => Math.random() * (max - min) + min;

['.deco', '.deco.s'].forEach((e) => {
    var rand1, rand2, blur, opacity;
    setInterval(() => {
        let bgblurElement = document.querySelector('.blurbg');
        currentvalue = [rand1, rand2];
        rand1 = randrange(-50, 50);
        rand2 = randrange(-50, 50);
        blur = randrange(80, 100);
        opacity = randrange(10, 80);

        document.querySelector(e).style.transition = 'all 5000ms linear';
        document.querySelector(e).style.transform = `translate(${rand1}vw, ${rand2}vh)`;
        document.querySelector(e).style.opacity = `${opacity}%`;
        bgblurElement.style.transition = 'backdrop-filter 5000ms linear';
        bgblurElement.style.backdropFilter = `blur(${blur.toFixed(0)}px)`;

    }, 5000);
});

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