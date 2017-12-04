//const record = require('node-record-lpcm16');


  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');

  // Creates a client
  const client = new Speech();

  const encoding = 'OGG_OPUS';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

// // Instantiates a client
// const speech = Speech();
//
// const request = {
//   config: {
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode
//   },
//   interimResults: false // If you want interim results, set this to true
// };
//
// // Create a recognize stream
// const recognizeStream = speech.streamingRecognize(request)
//   .on('error', console.error)
//   .on('data', (data) =>
//       process.stdout.write(
//         (data.results[0] && data.results[0].alternatives[0])
//           ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
//           : `\n\nReached transcription time limit, press Ctrl+C\n`));
//
// // Start recording and send the microphone input to the Speech API
// record
//   .start({
//     sampleRateHertz: sampleRateHertz,
//     threshold: 0,
//     // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
//     verbose: false,
//     recordProgram: 'rec', // Try also "arecord" or "sox"
//     silence: '10.0'
//   })
//   .on('error', console.error)
//   .pipe(recognizeStream);

function recognizeSync(blob, callback){
  console.log('begin recognizeSync')


  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    speechContexts: {
      phrases: ["fraction", "end", "one", "to", "sum", "of"]
    },
  };
  const audio = {
    content: blob.toString('base64'), //fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  console.log('sending request...');
  client.getProjectId(function(err, str){
    console.log('project id ' + str);
  })
  // Detects speech in the audio file
  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcription: `, transcription);
      callback(transcription)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = {
  recognize: recognizeSync
};
