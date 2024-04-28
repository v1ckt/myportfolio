const aboutme = document.querySelector('#aboutMe');
const skills = document.querySelector('#Skills');
const projects = document.querySelector('#Projects');
const contacts = document.querySelector('#Contacts');

// JSON
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

// SREENS CONTENTS

getData('aboutMe').then(async result => {
    aboutme.querySelector('.title').innerHTML = await result.pagetitle;
    aboutme.querySelector('.education').innerHTML += await result.pagecontent.education;
    aboutme.querySelector('.myname').innerHTML += await result.pagecontent.name;
    aboutme.querySelector('.content .presentation .ptitle').innerHTML = await result.pagecontent.texttitle;
    aboutme.querySelector('.content .presentation .pcontent').innerHTML = await result.pagecontent.presentation;
});

getData('skills').then(async result => {
    skills.querySelector('.title').innerHTML = await result.pagetitle;
    skills.querySelector('.content .presentation .pcontent').innerHTML = await result.pagecontent.presentation;
    skills.querySelector('.info .field').innerHTML += await result.pagecontent.field;
    skills.querySelector('.info .passion').innerHTML += await result.pagecontent.passion;
    skills.querySelector('.info .hobbie').innerHTML += await result.pagecontent.hobbie;


    const allskills = [].concat(result.pagecontent.tools,
        result.pagecontent.languages, result.pagecontent.frameworks);

    allskills.sort().forEach(async (skill) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        const p = document.createElement('p');
        const img = document.createElement('img');
        img.style.width = '52px'; img.src = `media/icons/skills/${skill}.svg`;
        img.classList.add('glitchText'); p.innerHTML = await skill;
        btn.appendChild(img); btn.appendChild(p);
        li.appendChild(btn);
        skills.querySelector('.toolslist').appendChild(li);
    });

    const presentation2 = document.createElement('p');
    presentation2.innerHTML = await result.pagecontent.presentation2;
    skills.querySelector('.content').appendChild(presentation2);
});

getData('projects').then(async result => {
    projects.querySelector('.title').innerHTML = await result.pagetitle;
    projects.querySelector('.content .presentation .ptitle').innerHTML = await result.pagecontent.title;
    projects.querySelector('.content .presentation .pcontent').innerHTML = await result.pagecontent.presentation;

    result.pagecontent.items.forEach(async (item) => {
        const li = document.createElement('li');
        const h4 = document.createElement('h4');
        const p = document.createElement('p'); const a = document.createElement('button');
        const op = document.createElement('div'); const b = document.createElement('button');
        const text = document.createElement('div'); const image = document.createElement('img');

        h4.innerHTML = item.name; p.innerHTML = item.description;
        a.innerHTML = 'Details';
        b.innerHTML = 'Project Repo';
        image.src = item.images[0];

        a.classList.add('secondary');

        text.appendChild(h4); text.appendChild(p); text.classList.add('text');
        op.appendChild(b); op.appendChild(a); op.classList.add('options');
        li.appendChild(image); li.appendChild(text); li.appendChild(op);

        li.querySelector('button:first-of-type').addEventListener('click', () =>
            window.open(item.link, '_blank'));
        li.querySelector('button:last-of-type').addEventListener('click', () => {
            const modalWindow = document.createElement('div');
            modalWindow.classList.add('modalWindow');
            modalWindow.innerHTML =
                modalWindow.innerHTML =
                `<div class="modalContent">
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
                <div class="btns">
                    <button id="closeModal" class="secondary">Close</button>
                    <button id="viewProjectbtn">View Project Repo</button>
                </div>
            </div>`;
            document.body.appendChild(modalWindow);
            document.querySelector('.modalContent').style.animation = 'modalWindow 0.2s';
            document.getElementById('closeModal').addEventListener('click', async () => {
                document.querySelector('.modalContent').style.animation = 'none';
                await sleep(1);
                document.querySelector('.modalContent').style.animation = 'modalWindow 0.2s reverse';
                await sleep(200);
                modalWindow.remove();
            });
            document.getElementById('viewProjectbtn').addEventListener('click', () => {
                window.open(item.link, '_blank');
            });
            document.addEventListener('keydown', async (e) => {
                if (e.key === 'Escape') {
                    document.querySelector('.modalContent').style.animation = 'none';
                    await sleep(1);
                    document.querySelector('.modalContent').style.animation = 'modalWindow 0.2s reverse';
                    await sleep(200);
                    document.querySelector('.caroussel').scrollLeft = 0;
                    modalWindow.remove();
                }
            });
        });
        
        projects.querySelector('.projectslist').appendChild(li);
        projects.querySelector('.info p').innerHTML = `Total of featured projects: ${result.pagecontent.items.length}`;
        li.classList.add('glitch');
        
    });
});