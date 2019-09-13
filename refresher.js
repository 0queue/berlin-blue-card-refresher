var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

//All arguments are optional:

//duration of the tone in milliseconds. Default is 500
//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone

// from https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
function beep(duration, frequency, volume, type, callback) {

    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume) { gainNode.gain.value = volume; };
    if (frequency) { oscillator.frequency.value = frequency; }
    if (type) { oscillator.type = type; }
    if (callback) { oscillator.onended = callback; }

    oscillator.start();
    setTimeout(function () { oscillator.stop() }, (duration ? duration : 500));
};

function checkCalendar() {
    let cal = document.getElementById("el2");

    if (!cal)
        return;
    let children = cal.getElementsByTagName("*");

    for (var i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.style.color === "rgb(0, 0, 255)") {
            beep(5000);
            return true;
        }
    }

    return false;
}

setTimeout(function () {
    if (!checkCalendar()) {
        console.log((new Date()).toString() + ": No blue found, refreshing in two minutes");
        setTimeout(function () {
            console.log("trying to refresh");
            // dosubmit();
            window.wrappedJSObject.dosubmit()
        }, 2 * 60 * 1000);
    } else {
        console.log("BLUE HAS BEEN FOUND")
    }
}, 500);
