import MIDI, { WebAudio } from 'midi.js'

export class Reproductor {
  constructor() {
    this.currentEventIndex = 0
    this.currentTime = 0
    this.events = []
    this.playing = false
    this.callback = () => {}
    this.loadInstrument('acoustic_grand_piano')
  }

  loadInstrument(instrumentName) {
    MIDI.loadPlugin({
      soundfontUrl: './static/soundfont/',
      instrument: instrumentName,
    })
  }

  onPlayFinished(callback) {
    this.callback = callback
  }

  addEvents(events) {
    this.events = this.events.concat(events)
  }

  fireEvent(event) {
    switch (event.subtype) {
      case 'noteOn':
        WebAudio.noteOn(event.channel, event.noteNumber, event.velocity, 0)
        event.note.setHighlight(true)
        break
      case 'noteOff':
        WebAudio.noteOff(event.channel, event.noteNumber, 0)
        event.note.setHighlight(false)
        break
      case 'chordOn':
        WebAudio.chordOn(event.channel, event.noteNumber, event.velocity, 0)
        event.note.setHighlight(true)
        break
      case 'chordOff':
        WebAudio.chordOff(event.channel, event.noteNumber, 0)
        event.note.setHighlight(false)
        break
    }
  }

  play() {
    this.playing = true
    if (this.currentEventIndex >= this.events.length) {
      this.playing = false
      return this.callback()
    }

    const event = this.events[this.currentEventIndex]

    if (this.currentTime <= event.queuedTime) {
      //Fire the event
      this.fireEvent(event)

      //Increment the current event and add current time
      if (this.currentEventIndex + 1 >= this.events.length) {
        this.playing = false
        return this.callback()
      }
      const timeUntilNextEvent = this.events[this.currentEventIndex + 1].queuedTime -
        this.events[this.currentEventIndex].queuedTime

      this.currentEventIndex++
      this.currentTime += timeUntilNextEvent

      this.scheduledId = setTimeout(this.play.bind(this), timeUntilNextEvent * 1000)
    }
  }

  stop() {
    if (this.scheduledId) {
      clearTimeout(this.scheduledId)
      this.clear()
      this.playing = false
      while (this.events.length) {
        var event = this.events.pop()
        if (event.subtype === 'noteOff' || event.subtype === 'chordOff')
          this.fireEvent(event)
      }
    }
  }

  clear() {
    this.scheduledId = null
    this.currentTime = 0
    this.currentEventIndex = 0
  }
}
