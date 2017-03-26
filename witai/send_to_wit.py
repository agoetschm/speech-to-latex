from wit import Wit
# https://github.com/wit-ai/pywit
import os


def send_audio_to_wit(filename):
    client = Wit(access_token=str(os.environ.get('WIT_TOKEN')))

    text = None
    with open(str(filename) + '.wav', 'rb') as f:
        resp = client.speech(f, None, headers={'Content-Type': 'audio/wav'})
        text = str(resp['_text'])
    return text
