/*********************************************************
 *                                                       *
 *   piano.js                                            *
 *     Creates piano elements inside of a #piano div.    *
 *     Keys can be selected, and a display will update   *
 *     and show chord names depending on which keys      *
 *     are active.                                       *
 *                                                       *
 *     Needs #piano, #display and #sub-display divs      *
 *                                                       *
 *   Copyright (c) 2018 Ryan Clark all rights reserved.  *
 *   https://github.com/QualiaRC                         *
 *                                                       *
 *********************************************************/


var octaves = 3;
var pianoContainer;
var tableContainer;
var activeKeys = []


// Initialize everything when the page is ready.
$(document).ready(function () {
    pianoContainer = $("#piano");
    initPiano();
});


// On window resize, rescale the piano.
$(window).resize(function () {scalePiano();});


// Creates the elements for the piano inside
// of the pianoContainer div. Sizes elements
// at the end via scalePiano() function call.
function initPiano() {
    var redStripe = $("<div>", { "id": "red-stripe" });
    var whiteRow = $("<div>", { "id": "white-row" });
    var blackRow = $("<div>", { "id": "black-row" });

    for (var i = 0; i < octaves; i++) {
        activeKeys.push((i * 12 + j), false);
        for (var j = 0; j < 12; j++) {
            if (!(getNoteLetter(j).indexOf('#') > 0)) {
                // White keys
                var key = $("<div>", { 
                    "class": "white-key has-hover", 
                    "id": "key-" + (i * 12 + j) 
                });
                key.click(function () { setKey(this, "white"); });
                whiteRow.append(key);
            } else {
                // Black keys
                var key = $("<div>", { 
                    "class": "black-key has-hover", 
                    "id": "key-" + (i * 12 + j) 
                });
                key.click(function () { setKey(this, "black"); });

                if (j === 3 || j === 10) {
                    key.addClass("spaced-key");
                }
                blackRow.append(key);
            }
        }
    }
    blackRow.height(0);
    whiteRow.height(0);

    pianoContainer.append(redStripe, whiteRow, blackRow);

    scalePiano();
}


// Sizes the piano elements to be proportional
// to the width of the window.
function scalePiano() {
    var whiteWidth = pianoContainer.width() / octaves / 7 - 2;
    var blackWidth = whiteWidth / 2;

    var whiteHeight = whiteWidth * 6;
    var blackHeight = whiteHeight * 3 / 4;

    $("#black-row").css("margin-left", whiteWidth - blackWidth / 2);

    $(".white-key").each(function () {
        $(this).width(whiteWidth);
        $(this).height(whiteHeight);
    });
    $(".black-key").each(function () {
        $(this).width(blackWidth);
        $(this).height(blackHeight);

        if ($(this).hasClass("spaced-key")) {
            $(this).css("margin-right", 2 * whiteWidth - blackWidth + 2);
        } else {
            $(this).css("margin-right", whiteWidth - blackWidth);
        }
    });
    
    $("#red-stripe").width(Math.ceil(pianoContainer.width()) - 3);
    $("#red-stripe").height(whiteHeight / 100);

    $("#black-row").children().last().css("margin-right", "0");
    $("#piano").height(whiteHeight);
}


// Function to be called on key click.
// Changes the key classes, and updates the display.
function setKey(element, color) {
    var keyNum = $(element).attr('id').substring(
        $(element).attr('id').indexOf('-') + 1, $(element).attr('id').length);
    if (!activeKeys[keyNum]) {
        activeKeys[keyNum] = true;
        $(element).removeClass("has-hover");
        $(element).addClass("is-selected");
    } else {
        activeKeys[keyNum] = false;
        $(element).addClass("has-hover");
        $(element).removeClass("is-selected");
    }
    updateDisplay();
}


// Gets the active keys and updates the display
// to show the selected chord (if applicable)
function updateDisplay() {
    var keyList = [];

    // get all notes
    var fistKey = 0;
    var firstFound = false;
    for (var i = 0; i < activeKeys.length; i++) {
        if (activeKeys[i] === true) {
            if (!firstFound) {
                firstKey = i;
                firstFound = true;
            }
            keyList.push(i - firstKey);
        }
    }

    var found = false;

    for (var key in chords) {
        if (keyList.sort().join(',') === chords[key][0].sort().join(',')) {

            var root = firstKey + chords[key][0][chords[key][1]];
            while (root > 11) {
                root -= 12;
            }

            $("#display").text(
                "Current Chord: " + getNoteLetter(root) + " " + key);
            if (getNoteLetter(root).indexOf('#') > 0) {
                $("#sub-display").css("visibility", "visible");
                $("#sub-display").text(
                    "(" + getNoteLetter(root, false) + " " + key + ")");
            }

            found = true;
        }
    }

    if (!found) {
        $("#display").text("Current Chord: None");
        $("#sub-display").css("visibility", "hidden");
    }
}