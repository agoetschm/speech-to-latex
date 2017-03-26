from wit import Wit
# https://github.com/wit-ai/pywit
import os

client = Wit(access_token=os.environ.get('WIT_TOKEN'))

resp = None
with open('file.wav', 'rb') as f:
    resp = client.speech(f, None, headers={'Content-Type': 'audio/wav', 'Accept': 'application/json'})
print('Yay, got Wit.ai response: ' + str(resp['_text']))
