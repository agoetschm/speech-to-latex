import wolframalpha
import os


def wolfram_interpret(text):
    client = wolframalpha.Client(os.environ.get('WOLFRAM_ALPHA_APP_ID'))
    res = client.query(text)
    # print(res)
    if (int(res['@numpods']) > 0):
        return res['pod'][0]['subpod']['plaintext']
    else:
        return None
