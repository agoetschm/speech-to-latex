from wit import Wit
# https://github.com/wit-ai/pywit
import os
from witai.record import *

rec = recorder()
rec.record(5)


client = Wit(access_token='MFOK5ZXG4Q3I7MOTPGPEWILZLMNFEW7Q')

resp = None
with open('file.wav', 'rb') as f:
    resp = client.speech(f, None, headers={'Content-Type': 'audio/wav', 'Accept': 'application/json'})
print('Yay, got Wit.ai response: ' + str(resp['_text']))
