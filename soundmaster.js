// see http://en.wikipedia.org/wiki/Piano_key_frequencies

var initialPianoKey = 0;
var MIDDLE_C = 40;
var keyNum = 0;
var noteOrder = ["C","C#","D", "D#", "E", "F", "F#", "G", "G#","A","A#","B"];
var master;

onconnect = function(e) {
    if(!master) {
        master = e.ports[0];
    } else {
        var clientFrequency = keyNumberToFrequency(keyNum + MIDDLE_C);
        var clientName = noteOrder[keyNum % noteOrder.length];
        e.ports[0].postMessage({frequency:clientFrequency, name:clientName});
        keyNum++;
        e.ports[0].addEventListener("message", function(e) {
            master.postMessage(e.data);
        }, false);
        e.ports[0].start();
    }
}

// num is the key on piano
function keyNumberToFrequency(num) {
    return Math.pow(Math.pow(2, 1/12), num - 49) * 440;
}
