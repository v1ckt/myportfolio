const aboutme = document.querySelector('#aboutMe');
const skills = document.querySelector('#Skills');
const projects = document.querySelector('#Projects');
const contacts = document.querySelector('#Contacts');

// SREENS CONTENTS
getData('aboutMe').then(async result => {
    aboutme.querySelector('.title').innerHTML = await result.pagetitle;
    aboutme.querySelector('.education').innerHTML += await result.pagecontent.education;
    aboutme.querySelector('.myname').innerHTML += await result.pagecontent.name;
    aboutme.querySelector('.content .presentation .ptitle').innerHTML = await result.pagecontent.texttitle;
    aboutme.querySelector('.content .presentation .pcontent').innerHTML = await result.pagecontent.presentation;
    document.querySelector('header .headerleft img').src = await result.pagecontent.pic;
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
    const items = result.pagecontent.items;
    items.forEach(async (item) => {
        const li = document.createElement('li');
        const h4 = document.createElement('h4');
        const p = document.createElement('p'); const a = document.createElement('button');
        const op = document.createElement('div'); const b = document.createElement('button');
        const text = document.createElement('div'); const image = document.createElement('img');
        const modalWindow = document.createElement('div');

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
            modalWindow.classList.add('modalWindow');
            modalWindow.innerHTML = projModal(item, 'main');

            document.body.appendChild(modalWindow);
            document.querySelector('.mainWindow').style.animation = 'modalWindow 0.2s';
            document.querySelector('#closeModal').addEventListener('click', async () => {
                document.querySelector('.mainWindow').style.animation = 'none';
                await sleep(1);
                document.querySelector('.mainWindow').style.animation = 'modalWindow 0.2s reverse';
                await sleep(200);
                modalWindow.remove();
            });
            document.getElementById('viewProjectbtn').addEventListener('click', () => {
                window.open(item.link, '_blank');
            });
            document.addEventListener('keydown', async (e) => {
                if (e.key === 'Escape') {
                    document.querySelector('.mainWindow button').click();
                }
            });
        });

        projects.querySelector('.projectslist').appendChild(li);
        projects.querySelector('.info p').innerHTML = `Total of featured projects: ${result.pagecontent.items.length}`;
        li.classList.add('glitch');

    });
});