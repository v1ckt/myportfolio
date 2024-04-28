const colorSchemes = {
    'default': {
        'hue': 202,
        'secondary-hue': rotateHue(202)
    },
};

function rotateHue(hue) {
    return hue - 150;
}

function setStyleProperty(property, value) {
    document.documentElement.style.setProperty(property, value);
}

function themeApply(color) {
    const colorScheme = colorSchemes[color];
    if (!colorScheme) {
        throw new Error(`Invalid color: ${color}`);
    }
    setStyleProperty('--accent-hue', `${colorScheme['hue']}`);
    setStyleProperty('--secondary-hue', `${colorScheme['secondary-hue']}`);
}

function uCS() {
    const colors = Object.keys(colorSchemes);
    const rand = Math.floor(Math.random() * colors.length);
    const color = colors[rand];
    
    themeApply(color);
}

function lightDark() {
    const newTheme = document.querySelector("html").getAttribute("data-theme") === "light" ? "dark" : "light";
    document.querySelector("html").setAttribute("data-theme", newTheme);
}