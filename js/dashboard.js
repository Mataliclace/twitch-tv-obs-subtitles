(e=>{'use strict';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Main
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
async function main() {

    // UI Elements
    const captureFrame = document.querySelector('#subtitle-display');
    const obsLink      = document.querySelector('#obs-url');
    const heroHeader   = document.querySelector('#header');
    const instructions = document.querySelector('#instructions');
    const step1        = document.querySelector('#step-1');
    const step2        = document.querySelector('#step-2');

    // Subtitles Application Page
    const obsDomain = 'https://stephenlb.github.io';
    const obsPath   = '/twitch-tv-obs-subtitles';

    // Detect if speech transcription is available
    const available = speechAvailable();

    // Set Frame Warning if Speech Unavailable
    if (!available) {
        captureFrame.src = `${obsDomain}${obsPath}/unavailable.html`;
        instructions.className = 'no-installation-guide';
        return;
    }

    // Detect Twitch App and Get API Keys
    const appName = 'Twitch TV Subtitles';
    const user    = await portal.autoApp(appName);
    const obsVars = {
        subkey  : user.keys.subscribe_key
    ,   pubkey  : user.keys.publish_key
    ,   channel : 'subtitles'
    };

    const obsParams = Object.keys(obsVars).map(
        k => `${k}=${obsVars[k]}`
    ).join('&');

    const obsSource = `${obsDomain}${obsPath}/subtitles.html?${obsParams}`;

    // Hide Step 1 & 2 Since we did them.
    step1.style.display = 'none';
    step2.style.display = 'none';

    // Hide Shooting Stars for OBS Performance
    heroHeader.className = 'no-stars';

    // Update OBS Browser Source URL and Live Capture Frame
    captureFrame.src = obsSource;
    obsLink.value    = obsSource;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Speech Transcription Available
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function speechAvailable() {
    const recognition = new (
        window.SpeechRecognition       ||
        window.webkitSpeechRecognition ||
        Object
    )();
    return !!recognition.start;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Easy Wait Command
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
function delay(duration) {
    return new Promise( resolve => setTimeout( resolve, duration ) );
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Run Main
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
main();

})();
