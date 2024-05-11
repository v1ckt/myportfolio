const aboutme = $('#aboutMe');
const skills = $('#Skills');
const projects = $('#Projects');
const contacts = $('#Contacts');

// SREENS CONTENTS
getData('aboutMe').then(async result => {
    aboutme.find('.title').html(await result.pagetitle);
    aboutme.find('.education').append(await result.pagecontent.education);
    aboutme.find('.myname').append(await result.pagecontent.name);
    aboutme.find('.content .presentation .ptitle').html(await result.pagecontent.texttitle);
    aboutme.find('.content .presentation .pcontent').html(await result.pagecontent.presentation);
    $('header .headerleft img').attr('src', await result.pagecontent.pic);
});

getData('skills').then(async result => {
    skills.find('.title').html(await result.pagetitle);
    skills.find('.content .presentation .pcontent').append(await result.pagecontent.presentation);
    skills.find('.info .field').append(await result.pagecontent.field);
    skills.find('.info .passion').append(await result.pagecontent.passion);
    skills.find('.info .hobbie').append(await result.pagecontent.hobbie);

    skills.find('.content').append('<h1 style="order: -1;">Skills</h1>');
    skills.find('.content').append('<spam style="order: 1;">Click in the skill to see more.</spam>');

    const allskills = [].concat(result.pagecontent.languages, result.pagecontent.frameworks,
        result.pagecontent.tools);

    allskills.forEach(async (skill) => {
        skills.find('.toolslist').append(`
        <li>
            <button>
            <div class="skillimg">
                <img src="media/icons/skills/${skill}.svg" class="glitchText" style="width: inherit;">
            </div>
            <p>${skill}</p>
            </button>
        </li>`);
    });

    const presentation2 = $('<p></p>').append(await result.pagecontent.presentation2);
    skills.find('.content').append(presentation2);
});

getData('projects').then(async result => {
    projects.find('.title').append(await result.pagetitle);
    projects.find('.content .presentation .ptitle').append(await result.pagecontent.title);
    projects.find('.content .presentation .pcontent').append(await result.pagecontent.presentation);
    const items = result.pagecontent.items;
    items.forEach(async (item) => {
        const ul = projects.find('.projectslist');
        ul.append(`
        <li class="glitch">
            <img src="${item.images[0]}">
            <div class="text">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
            <div class="options">
                <button id="btnrepo" onclick="openUrl('${item.link}')">Project Repo</button>
                <button id="btndetails" class="secondary" onclick="(projModal('${item.name}', 'main'))">Details</button>
            </div>
        </li>`);
    });
});

getData('contacts').then(async result => {
    contacts.find('.content .presentation .pagetitle').append(await result.pagecontent.title);
    contacts.find('.content .presentation .pcontent p').append(await result.pagecontent.presentation);

    const ul = $('<ul></ul>').addClass('sociallist');
    contacts.find('.content .presentation .pcontent').append(ul);

    const socials = result.pagecontent.social;
    socials.forEach(async (item) => {
        $('.sociallist').append(`
        <li>
            <button href="${item.link}" target="_blank">
                <img src="${item.icon}">
            </button>
        </li>`);
    });
});

getData('footer').then(async result => {
    $('footer').html(`
    <div class="footercontent">
        <p>${await result}</p>
    </div>`);
});
