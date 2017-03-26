import pyaudio
import wave


def record(filename):
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 44100
    CHUNK = 1024
    DEFAULT_DURATION = 5
    WAVE_OUTPUT_FILENAME = filename + ".wav"

    audio = pyaudio.PyAudio()

    seconds = raw_input("How long should I record (default is " + str(DEFAULT_DURATION) + ") ? [seconds] ")
    if (len(seconds) == 0):
        seconds = DEFAULT_DURATION

    raw_input("Press 'Enter' to record")

    # start Recording
    stream = audio.open(format=FORMAT, channels=CHANNELS,
                        rate=RATE, input=True,
                        frames_per_buffer=CHUNK)
    print ("Recording...")
    frames = []

    for i in range(0, int(RATE / CHUNK * int(seconds))):
        data = stream.read(CHUNK)
        frames.append(data)
    print ("Finished recording.")

    # stop Recording
    stream.stop_stream()
    stream.close()
    audio.terminate()

    waveFile = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    waveFile.setnchannels(CHANNELS)
    waveFile.setsampwidth(audio.get_sample_size(FORMAT))
    waveFile.setframerate(RATE)
    waveFile.writeframes(b''.join(frames))
    waveFile.close()
