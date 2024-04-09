var currentPage = '#aboutMe';
document.querySelector('.mainStyleSheet').href = 'styles/stable.css';

function cutString(str, start, end) {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end, startIndex) + end.length;
    return str.substring(startIndex, endIndex);
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('collapsed');
    } else {
        header.classList.remove('collapsed');
    }
});

function scrollTo(element, nav) {
    document.querySelector(element).scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('header ul li').forEach((a) => {
        a.classList.remove('active');
    });
    document.querySelector(nav).classList.toggle('active');
}

document.querySelector("#aboutbtn").addEventListener('click', () => { scrollTo('#aboutMe', '#aboutbtn') });
document.querySelector("#skillsbtn").addEventListener('click', () => { scrollTo('#Skills', '#skillsbtn') });
document.querySelector("#projectsbtn").addEventListener('click', () => { scrollTo('#Projects', '#projectsbtn') });
document.querySelector("#contactsbtn").addEventListener('click', () => { scrollTo('#Contacts', '#contactsbtn') });

window.addEventListener('load', () => {
    const firstLine = document.createElement('p');
    const middleLine = document.createElement('h1');
    const lastLine = document.createElement('p');
    const element = document.querySelector('#aboutMe .content .presentation .pcontent');
    
    const presentation = document.querySelector('#aboutMe .presentation');
    
    const text = element ? element.textContent : '';
    
    const first = cutString(text, 'Hello', 'Vicktor');
    const middle = cutString(text, "I'm", "Developer.");
    const last = cutString(text, 'I recently', 'engineering.');
    
    firstLine.innerHTML = first;
    middleLine.innerHTML = middle;
    lastLine.innerHTML = last;
    
    presentation.appendChild(firstLine);
    presentation.appendChild(middleLine);
    presentation.appendChild(lastLine);
    
    document.querySelector('header .headerleft h4').innerHTML = cutString(text, 'Vicktor', 'Teixeira');
    scrollTo('#aboutMe', '#aboutbtn');
});

window.addEventListener('reload', () => {
    // scrollTo(currentPage);
});