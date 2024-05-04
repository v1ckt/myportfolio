var currentPage;
var currentNav;
document.querySelector('.mainStyleSheet').href = 'styles/stable.css';

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
        const element = document.querySelector('#aboutMe .content .presentation .pcontent');
        const presentation = document.querySelector('#aboutMe .presentation');
        const text = element ? element.textContent : '';

        presentation.innerHTML +=
            `<p>${cutString(text, 'Hello', 'Vicktor')}</p>
            <h1>${cutString(text, "I'm", "Developer")}</h1>
            <p>${cutString(text, 'I recently', 'engineering.')}</p>
            <div class="btns" style="margin-top:20px;">
                <button class="secondary">See More</button>
                <button>Download CV</button>
            </div>`;

        document.querySelector('.btns > .secondary').addEventListener('click', () => { document.querySelector("#skillsbtn").click(); });
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