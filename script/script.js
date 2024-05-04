// COMING SOON PAGE FUNCTION
// show manuntention screen if the page isn't on a localhost
if (window.location.hostname === !'127.0.0.1' || window.location.hostname === !'localhost') {
    document.querySelector('body').innerHTML = `
    <div class="maintenance">
        <div>&#x2699
        </div>
        <h1>Under Maintenance</h1>
    </div>`;
}

document.querySelector('.mainStyleSheet').href = 'styles/stable.css';
// AUDIO CONTROLLERS
const noiseaudio = document.querySelector('.noisesound');
const changepagesound = document.querySelector('.pagechangesound');
const noisebg = document.querySelector('.bg');

var sysstatus; var connectionstatus = 'stable';
var transitpageAnim = true;
var typeinterval; var blinkinterval = 9999;
changepagesound.volume = 0.5;
noiseaudio.volume = 0.1;

noiseaudio.addEventListener('ended', () => { this.play(); });

// EVENT LISTENERS
document.querySelector('#aboutMebtn').addEventListener('click',
    async () => { changeSection('aboutMe'); });
document.querySelector('#Skillsbtn').addEventListener('click',
    async () => { changeSection('Skills'); });
document.querySelector('#Projectsbtn').addEventListener('click',
    async () => { changeSection('Projects'); });
document.querySelector('#Contactsbtn').addEventListener('click',
    async () => { changeSection('Contacts'); });
document.querySelector('#Exitbtn').addEventListener('click', () => { revert(); });

const alerts = document.querySelectorAll('.alert');
alerts.forEach((alert) => { alert.style.animation = 'blink 2s infinite'; });

// EASTER EGG ENGINE
const cp = document.querySelector('.controlpanel');
const statusoptions = ['stable', 'corrupted', 'unstable', 'unknown', 'alert'];
const connectionoptions = ['stable', 'unstable', 'unknown'];

age();