const aboutme = document.querySelector('#aboutMe');
const skills = document.querySelector('#Skills');
const projects = document.querySelector('#Projects');
const contacts = document.querySelector('#Contacts');

// JSON
async function getData(...args) {
    const response = await fetch('/data.json');
    const data = await response.json();
    let result = data['data'];
    for (const arg of args) {
        result = result[arg];
        if (result === undefined) { throw new Error('Invalid argument'); }
    }
    return result;
}

// SREENS CONTENTS

getData('aboutMe').then(async result => {
    aboutme.querySelector('.title').innerHTML = result.pagetitle;
    aboutme.querySelector('.education').innerHTML += result.pagecontent.education;
    aboutme.querySelector('.myname').innerHTML += result.pagecontent.name;
    aboutme.querySelector('.pic').src = result.pagecontent.pic;
    aboutme.querySelector('.content .presentation .ptitle').innerHTML = result.pagecontent.texttitle;
    aboutme.querySelector('.content .presentation .pcontent').innerHTML = result.pagecontent.presentation;
});

getData('skills').then(async result => {
    skills.querySelector('.title').innerHTML = result.pagetitle;
    skills.querySelector('.content .presentation .pcontent').innerHTML = result.pagecontent.presentation;
    skills.querySelector('.info .field').innerHTML += result.pagecontent.field;
    skills.querySelector('.info .passion').innerHTML += result.pagecontent.passion;
    skills.querySelector('.info .hobbie').innerHTML += result.pagecontent.hobbie;


    const allskills = [].concat(result.pagecontent.tools,
        result.pagecontent.languages, result.pagecontent.frameworks);

    allskills.sort().forEach((skill) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const img = document.createElement('img');
        img.style.width = '52px'; img.src = `media/icons/skills/${skill}.svg`;
        img.classList.add('glitchText'); p.innerHTML = skill;
        li.appendChild(img); li.appendChild(p);
        skills.querySelector('.toolslist').appendChild(li);
    });

    const presentation2 = document.createElement('p');
    presentation2.innerHTML = result.pagecontent.presentation2;
    skills.querySelector('.content').appendChild(presentation2);
});

getData('projects').then(async result => {
    projects.querySelector('.title').innerHTML = result.pagetitle;
    projects.querySelector('.content .presentation .ptitle').innerHTML = result.pagecontent.title;
    projects.querySelector('.content .presentation .pcontent').innerHTML = result.pagecontent.presentation;

    result.pagecontent.items.forEach((item) => {
        const li = document.createElement('li'); const h4 = document.createElement('h4');
        const p = document.createElement('p'); const a = document.createElement('p');
        h4.innerHTML = item.name; p.innerHTML = item.description;
        a.innerHTML = 'View Project on GitHub';
        li.appendChild(h4); li.appendChild(p); li.appendChild(a);
        li.addEventListener('click', () => window.open(item.link, '_blank'));
        projects.querySelector('.projectslist').appendChild(li);
        projects.querySelector('.info p').innerHTML = `Total of featured projects: ${result.pagecontent.items.length}`;
        li.classList.add('glitch');
    });
});