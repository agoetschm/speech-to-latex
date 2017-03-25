import requests

payload = {'q': 'how are you?'}
headers = {'Authorization': 'Bearer $TOKEN'}
r = requests.get('https://api.wit.ai/message', params=payload, headers=headers)

print(r.url)
print(r.text)