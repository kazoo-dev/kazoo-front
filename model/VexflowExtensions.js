/*
 * New attibutes and methods to be used by the UI classes.
 */

/*
 * Stave extensions
 */

import { Stave } from 'vexflow/src/stave'
import { StaveNote } from 'vexflow/src/stavenote'
import { Dot } from 'vexflow/src/dot'
import { BarNote } from 'vexflow/src/barnote'
import { ClefNote } from 'vexflow/src/clefnote'
import { Accidental } from 'vexflow/src/accidental'

const ClefOffsets = {
  "treble": 0,
  "bass" : -21,
  "alto": -10,
  "tenor": -14,
  "percussion": 0,
  "soprano": -4,
  "mezzo-soprano": -7,
  "baritone-c": -17,
  "baritone-f": -17,
  "subbass": -24,
  "french": 6
};

const highlightNoteStyle = {shadowBlur:15, shadowColor:'red', fillStyle:'black', strokeStyle:'black'};
const defaultNoteStyle = {shadowBlur:0, shadowColor:'black', fillStyle:'black', strokeStyle:'black'};

Stave.prototype.tickables = [];

Stave.prototype.setTickables = function(tickables) {
  this.tickables = tickables;
};

Stave.prototype.getTickables = function() {
  return this.tickables;
};

Stave.prototype.getNotes = function() {
  var notes = [];

  for ( var i = 0; i < this.tickables.length; i++) {
    var tickable = this.tickables[i];
    if(tickable instanceof StaveNote)
      notes.push(tickable);
  }
  return notes;
};

Stave.prototype.insertTickableBetween = function(newTickable, previousTickable, nextTickable) {

  if(newTickable instanceof ClefNote){
    //If the stave has no clef modifiers, then add it.
    if(this.getClefModifierIndex() < 0){
      this.addClef(newTickable.clefKey);
      return;
    }
    //If the stave already has a clef, but the user clicked before any other tickable, then replace the stave clef
    else if(previousTickable == null){
      this.replaceClef(newTickable.clefKey);
      return;
    }
    //Else add it as a normal ClefNote as long as the stave already has notes, so leave otherwise
    else if(this.getNotes().length == 0)
      return;


  } else if(newTickable instanceof BarNote){
    //If the BarNote is to be inserted after everything, then modify the end bar of the stave
    if(nextTickable == null){
      this.setEndBarType(newTickable.type);
      return;
    }
    //Else add it as a normal BarNote as long as the stave already has notes, so leave otherwise
    else if(this.getNotes().length == 0)
      return;
  }

  if(nextTickable==null){
    this.pushTickable(newTickable);
  }else{
    var referenceIndex = this.tickables.indexOf(nextTickable);
    this.tickables.splice(referenceIndex, 0, newTickable);
  }
};

Stave.prototype.getClefModifierIndex = function(){
  //Remove all clefs currently in the stave
  for(var i = 0; i < this.modifiers.length; i++){
    var modifier = this.modifiers[i];

    if(modifier instanceof Clef)
      return i;

  }
  return -1;

}

Stave.prototype.replaceClef = function(clef){
  var start_X= this.start_x ;
  this.clef = clef;
  var modifier = new Clef(clef);
  this.modifiers.splice(this.getClefModifierIndex(), 1);
  this.glyphs = [];
  this.addClef(clef);

  this.start_x = start_X;
}

Stave.prototype.getPreviousTickable = function(referenceTickable){
  var referenceIndex = this.tickables.indexOf(referenceTickable);
  if (referenceIndex == 0) return null;
  return this.tickables[referenceIndex-1];
};

Stave.prototype.getNextTickable = function(referenceTickable){
  var referenceIndex = this.tickables.indexOf(referenceTickable);
  if (referenceIndex == this.tickables.length - 1) return null;
  return this.tickables[referenceIndex+1];
};

Stave.prototype.getNextNote = function(referenceNote){
  var referenceIndex = this.tickables.indexOf(referenceNote);
  while(referenceIndex < this.tickables.length){
    referenceIndex++;
    if(this.tickables[referenceIndex] instanceof StaveNote)
      return this.tickables[referenceIndex];
  }

  return null;
};

Stave.prototype.replaceTickable = function(oldTickable,newTickable){
  //Replacing note in beam.
  if(oldTickable.beam!=null){
    var beam = oldTickable.beam;
    var referenceIndex = beam.tickables.indexOf(oldTickable);
    beam.notes[referenceIndex]=newTickable;
  }

  var referenceIndex = this.tickables.indexOf(oldTickable);
  this.tickables[referenceIndex]=newTickable;
};

Stave.prototype.removeTickable = function(tickable){
  this.tickables.splice(this.tickables.indexOf(tickable), 1);
}

Stave.prototype.pushTickable = function(newTickable){
  this.tickables.push(newTickable);
};

Stave.prototype.beams = [];

Stave.prototype.setBeams = function(beamList) {
  this.beams = beamList;
};

Stave.prototype.getBeams = function() {
  return this.beams;
};


Stave.prototype.pushBeam = function(newBeam){
  this.beams.push(newBeam);
};


/*
 * StaveNote extensions
 */
/**
 * @param keyName The name of the Key
 * @returns the index of the key in the Note, or -1 if it doesn't contain the key
 */
StaveNote.prototype.indexOfKey = function(keyName){
  return this.keys.indexOf(keyName);
};


StaveNote.prototype.getPlayEvents = function(playInfo){
  //Prepare the notes to be sent
  var notes = [];

  for(var i = 0; i < this.keys.length; i++){
    const sanitizedNote = [this.keys[i][0].toUpperCase(), ...this.keys[i].slice(1)].join('')
      .replace('#', '')
      .replace('b', '')
      .replace('/', '')
    if (this.isRest()) {
      notes.push('')
    } else {
      notes.push(MIDI.keyToNote[sanitizedNote]);
    }
  }

  //Set clef offset for notes
  for (var i = 0; i < notes.length; i++) {
    notes[i] += ClefOffsets[playInfo.clef];
  };

  var keyPressTime = playInfo.defaultTime / this.duration;

  //Set the modifiers for this note (update note value)
  for (var i = 0; i < this.modifiers.length; i++) {
    var modifier = this.modifiers[i];
    if(modifier instanceof Accidental){
      var modValue;

      switch(modifier.type){
        case "bb":
          modValue = -2;
          break;
        case "b":
          modValue = -1;
          break;
        case "n":
          modValue = 0;
          break;
        case "#":
          modValue = 1;
          break;
        case "##":
          modValue = 2;
          break;
      }

      notes[modifier.index] += modValue;
    }else if(modifier instanceof Dot){
      keyPressTime *= 1.5;
    }


  };

  //	velocity is set as 127



  var events = [];


  events.push({
    type: 'channel',
    channel: 0,
    subtype: notes.length==1?'noteOn':'chordOn',
    noteNumber: notes.length==1?notes[0]:notes,
    velocity: 127,
    queuedTime: playInfo.delay,
    note: this
  });
  events.push({
    type: 'channel',
    channel: 0,
    subtype: notes.length==1?'noteOff':'chordOff',
    noteNumber: notes.length==1?notes[0]:notes,
    queuedTime: playInfo.delay + keyPressTime,
    note: this
  });


  //increment the delay
  playInfo.delay = playInfo.delay + keyPressTime;

  return events;
};


//TODO Clone Ties
StaveNote.prototype.clone = function(newProps){
  var currentProps = {
    keys: this.keys,
    stem_direction: this.getStemDirection(),
    duration: this.duration,
    noteType: this.noteType
  } ;


  var mergedProps = mergeProperties(currentProps, newProps);
  mergedProps.duration = mergedProps.duration + mergedProps.noteType;

  var newNote = new StaveNote(mergedProps);

  //Setting the style as the same style as the note head
  newNote.setStyle(this.note_heads[0].style);



  if(this.modifierContext!=null && this.getDots()!=null)
    newNote.addDotToAll();

  newNote.beam = this.beam;

  //Clone modifiers
  for (var i = 0; i < this.modifiers.length; i++) {
    if(this.modifiers[0] instanceof Accidental){
      newNote.addAccidental(this.modifiers[i].index, new Accidental(this.modifiers[i].type));
    }

  };

  return newNote;
};

StaveNote.prototype.setHighlight = function(highlight){
  if(highlight)
    this.setStyle(highlightNoteStyle);
  else
    this.setStyle(defaultNoteStyle);
};

/**
 * Return new note, from actions:
 * "UP"		=> up on stave
 * "DOWN"	=> down on stave
 * "SHARP"	=> add sharp
 * @param action
 * @returns
 */
StaveNote.prototype.change = function(action){
  var newKeys = new Array();
  //for each key
  for (var k in this.keys){
    var splitted = this.keys[k].split("/");
    splitted[0] = splitted[0].toUpperCase();
    //first char is the note
    var note = splitted[0].substring(0,1);
    var accidentals = splitted[0].substring(1);
    var octave = parseInt(splitted[1]);

    //search index of key in NoteMap.noteMap
    var index = 0;
    for (var x in NoteMap.noteMap){
      if (NoteMap.noteMap[x] == note){
        index = x;
        break;
      }
    }

    //do the ACTION
    if (action == "UP") //increment key
      index++;
    else if (action == "DOWN") //descrease key
      index--;
    else if (action == "SHARP"){
      //TODO add other cases
      switch (accidentals){
        case "":
        case null:
        case undefined:
          accidentals = "#";
          break;
        case "#":
          accidentals = "##";
          break;
      }
      alert(accidentals);
    }
    //octave changes
    if (index == NoteMap.noteMap.length){
      index = 0;
      octave++;
    }else if (index < 0){
      index = NoteMap.noteMap.length-1;
      octave--;
    }
    //push new key
    note = NoteMap.noteMap[index];
    newKeys.push(note + accidentals+"/"+octave);
  }
  var dur = this.duration;
  var type = this.noteType;
  if (action == "PAUSE"){
    if (type == "n") type = "r";
    else if (type == "r") type = "n";
    dur = parseNoteDurationString(this.duration);
    var dots = "";
    for (var i=0;i<dur.dots;i++) dots+="d";
    dur = dur.duration+dots+type;
  }
  //create new note with new parameters
  return this.clone({keys: newKeys, duration:dur });
};


/*
 * Dot extensions
 */

/*
 * Overriding the Draw method so that the dot stops going up at every draw call
 */
Dot.prototype.draw= function() {
  if (!this.context) throw new Error("NoContext",
    "Can't draw dot without a context.");
  if (!(this.note && (this.index != null))) throw new Error("NoAttachedNote",
    "Can't draw dot without a note and index.");

  var line_space = this.note.stave.options.spacing_between_lines_px;

  var start = this.note.getModifierStartXY(this.position, this.index);

  // Set the starting y coordinate to the base of the stem for TabNotes
  if (this.note.getCategory() === 'tabnotes') {
    start.y = this.note.getStemExtents().baseY;
  }

  var dot_x = (start.x + this.x_shift) + this.width - this.radius;
  //This next commented line is the original Draw
  //var dot_y = start.y + this.y_shift + (this.dot_shiftY * line_space);
  //This next line is the modified Draw
  var dot_y = start.y + this.y_shift;
  var ctx = this.context;

  ctx.beginPath();
  ctx.arc(dot_x, dot_y, this.radius, 0, Math.PI * 2, false);
  ctx.fill();
};

/*
 * Barnote Extensions
 */
BarNote.prototype.clone = function(){
  var newBarNote = new BarNote();
  newBarNote.setType(this.getType());
  newBarNote.setStave(this.getStave());
  newBarNote.setTickContext(this.getTickContext());
  return newBarNote;
};

BarNote.prototype.getPlayEvents = function(playInfo, currentEvents){
  var newEvents = [];

  function markBeginRepeatIndex(){
    //mark current index as repeating point
    playInfo.beginRepeatIndex = currentEvents.length + newEvents.length;
  }

  function addRepeatEvents(){
    //Add all events since repeat index
    for(var i = playInfo.beginRepeatIndex || 0; i < currentEvents.length; i++){
      newEvents.push(currentEvents[i]);
    }
  }

  switch(this.type){
    case Barline.type.REPEAT_BEGIN:
      markBeginRepeatIndex();
      break;
    case Barline.type.REPEAT_END:
      addRepeatEvents();
      break;
    case Barline.type.REPEAT_BOTH:
      addRepeatEvents();
      markBeginRepeatIndex();
      break;
  }

  return newEvents;
}

/*
 * ClefNote Extensions
 */

ClefNote.prototype.clone = function (){
  var newClef = new ClefNote(this.clefKey);
  newClef.clefKey = this.clefKey;
  newClef.setTickContext(new TickContext());
  newClef.getTickContext().setX(this.getTickContext().getX());
  return newClef;
};


ClefNote.prototype.getPlayEvents = function (playInfo){
  //update current clef
  playInfo.clef = this.clefKey;
  return [];
};
