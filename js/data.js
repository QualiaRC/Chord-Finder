/*********************************************************
 *                                                       *
 *   data.js                                             *
 *     Data used for piano.js                            *
 *                                                       *
 *   Copyright (c) 2018 Ryan Clark all rights reserved.  *
 *   https://github.com/QualiaRC                         *
 *                                                       *
 *********************************************************/


// Integers from 0-11 representing note names.
// Index 0 for sharps, 1 for flats.
var notes = {
    0: ["C",  "C" ],
    1: ["C#", "Db"],
    2: ["D",  "D" ],
    3: ["D#", "Eb"],
    4: ["E",  "E" ],
    5: ["F",  "F" ],
    6: ["F#", "Gb"],
    7: ["G",  "G" ],
    8: ["G#", "Ab"],
    9: ["A",  "A" ],
    10:["A#", "Bb"],
    11:["B",  "B" ]
}


// Chords are represented by a list of the intervals,
// and an integer representing the root note (Used for inversions)
var chords = {
    "major": [[0, 4, 7], 0],
    "minor": [[0, 3, 7], 0],

    "augmented": [[0, 4, 8], 0],
    "diminished": [[0, 3, 6], 0],

    "suspended second": [[0, 2, 7], 0],
    "suspended fourth": [[0, 5, 7], 0],

    "major seventh": [[0, 4, 7, 11], 0],
    "dominant seventh": [[0, 4, 7, 10], 0],
    "minor seventh": [[0, 3, 7, 11], 0],

    "diminished first inversion": [[0, 3, 9], 2],
    "diminished second inversion": [[0, 6, 9], 1],

    "major first inversion": [[0, 3, 8], 2],
    "major second inversion": [[0, 5, 9], 1],

    "major seventh first inversion": [[0, 3, 7, 8], 3],
    "major seventh second inversion": [[0, 4, 5, 9], 2],
    "major seventh third inversion": [[0, 1, 5, 8], 1]
}


// Given the note number, grabs the appropriate note name.
// Default 2nd argument is true, which returns sharps. 
// False returns flats.
function getNoteLetter(noteNumber, sharp) {
    if (sharp === undefined) {
        sharp = true;
    }
    if (sharp) {
        return notes[noteNumber][0];
    }
    return notes[noteNumber][1];
}