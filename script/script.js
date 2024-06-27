// COMING SOON PAGE FUNCTION
// if (!window.location.hostname.startsWith('localhost') && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(window.location.hostname)) {
//     $('body').html(`
//     <div class="maintenance">
//         <div>&#x2699
//         </div>
//         <h1>Under Maintenance</h1>
//     </div>`);
// }

// mobile page maintenance screen
if (window.innerWidth <= 768) {
    $('body').html(`
    <div class="maintenance">
        <div>&#x2699
        </div>
        <h1>Under Maintenance</h1>
    </div>`);
}

$('.mainStyleSheet').attr('href', 'styles/stable.css');

// AUDIO CONTROLLERS
const noiseaudio = $('.noisesound')[0];
const changepagesound = $('.pagechangesound')[0];
const noisebg = $('.bg')[0];

var sysstatus; var connectionstatus = 'stable';
var transitpageAnim = true;
var typeinterval; var blinkinterval = 9999;
changepagesound.volume = 0.5;
noiseaudio.volume = 0.1;

$(noiseaudio).on('ended', function () { this.play(); });

// EVENT LISTENERS
$('#aboutMebtn').on('click', async () => { changeSection('aboutMe'); });
$('#Skillsbtn').on('click', async () => { changeSection('Skills'); });
$('#Projectsbtn').on('click', async () => { changeSection('Projects'); });
$('#Contactsbtn').on('click', async () => { changeSection('Contacts'); });
$('#Exitbtn').on('click', () => { revert(); });

const alerts = $('.alert');
alerts.css('animation', 'blink 2s infinite');

// EASTER EGG ENGINE
const cp = $('.controlpanel');
const statusoptions = ['stable', 'corrupted', 'unstable', 'unknown', 'alert'];
const connectionoptions = ['stable', 'unstable', 'unknown'];

age();