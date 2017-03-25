from wit import Wit
import os

client = Wit(access_token=os.environ.get('WIT_TOKEN'))

resp = None
with open('file.wav', 'rb') as f:
    resp = client.speech(f, None, {'Content-Type': 'audio/wav'})
print('Yay, got Wit.ai response: ' + str(resp))
