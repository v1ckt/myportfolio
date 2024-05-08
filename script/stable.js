var currentPage;
var currentNav;
$('.mainStyleSheet').attr('href', 'styles/stable.css');

$("#aboutbtn").on('click', () => {
    scrollToo('#aboutMe', '#aboutbtn', 'false');
});
$("#skillsbtn").on('click', () => {
    scrollToo('#Skills', '#skillsbtn');
});
$("#projectsbtn").on('click', () => {
    scrollToo('#Projects', '#projectsbtn');
});
$("#contactsbtn").on('click', () => {
    scrollToo('#Contacts', '#contactsbtn');
});

$(window).on('load', () => {
    setTimeout(() => {
        const element = $('#aboutMe .content .presentation .pcontent');
        const presentation = $('#aboutMe .presentation');
        const text = element ? element.text() : '';

        presentation.append(
            `<p>${cutString(text, 'Hello', 'Vicktor')}</p>
            <h1>${cutString(text, "I'm", "Developer")}</h1>
            <p>${cutString(text, 'I recently', 'engineering.')}</p>
            <div class="btns" style="margin-top:20px;">
                <button class="secondary">See More</button>
                <button>Download CV</button>
            </div>`);

        $('.btns > .secondary').on('click', () => { $("#skillsbtn").click(); });
        $("#aboutbtn").click();
    }, 100);
});

$(window).on('resize', async () => {
    setTimeout(() => {
        scrollToo(currentPage, currentNav);
    }, 150);
});

// Encontra a folha de estilo correta
let styleSheet = Array.from(document.styleSheets).find(sheet => sheet.href.includes('main.css'));
let currentvalue = [];
randrange = (min, max) => Math.random() * (max - min) + min;

['.deco', '.deco.s'].forEach((e) => {
    var rand1, rand2, blur, opacity;
    setInterval(() => {
        let bgblurElement = $('.blurbg');
        currentvalue = [rand1, rand2];
        rand1 = randrange(-50, 50);
        rand2 = randrange(-50, 50);
        blur = randrange(80, 100);
        opacity = randrange(10, 80);

        $(e).css({
            'transition': 'all 5000ms linear',
            'transform': `translate(${rand1}vw, ${rand2}vh)`,
            'opacity': `${opacity}%`
        });
        bgblurElement.css({
            'transition': 'backdrop-filter 5000ms linear',
            'backdrop-filter': `blur(${blur.toFixed(0)}px)`
        });

    }, 5000);
});