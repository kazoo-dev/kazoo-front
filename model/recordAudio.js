export async function createAudioRecorder(start) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const recorder = new MediaRecorder(stream)
  const chunks = []
  recorder.addEventListener('dataavailable', e => chunks.push(e.data))
  if (start) recorder.start()
  return {
    start: () => recorder.start(),
    stop:() => new Promise(resolve => {
      recorder.addEventListener('stop', () => {
        const blob = new Blob(chunks)
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        resolve(Object.assign(audio, { blob, url }))
      })
      recorder.stop()
    })
  }
}
