const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Instantiates a client
const speech = Speech();

// The encoding of the audio file, e.g. 'LINEAR16'
const encoding = 'LINEAR16';

// The sample rate of the audio file in hertz, e.g. 16000
const sampleRateHertz = 16000;

// The BCP-47 language code to use, e.g. 'en-US'
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  },
  interimResults: false // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = speech.streamingRecognize(request)
  .on('error', console.error)
  .on('data', (data) =>
      process.stdout.write(
        (data.results[0] && data.results[0].alternatives[0])
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`));

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0'
  })
  .on('error', console.error)
  .pipe(recognizeStream);
