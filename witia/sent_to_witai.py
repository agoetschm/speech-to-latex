import requests
from witia.record import *

rec = recorder()
rec.record(5)


# payload = {'q': 'how are you?'}
headers = {'Authorization': 'Bearer MFOK5ZXG4Q3I7MOTPGPEWILZLMNFEW7Q', "Content-Type": "audio/wav"}
# r = requests.get('https://api.wit.ai/message', params=payload, headers=headers)
f = open('file.wav', 'rb')
r= requests.post('http://api.wit.ai/message', files={'file.wav': f}, headers=headers)


print(r.url)
print(r.text)