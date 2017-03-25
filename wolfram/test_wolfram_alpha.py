import wolframalpha
import os

client = wolframalpha.Client(os.environ.get('WOLFRAM_ALPHA_APP_ID'))

res = client.query('one plus two')

print(res['pod'][0]['subpod']['plaintext'])