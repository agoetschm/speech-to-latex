from witai.record import *
from witai.send_to_wit import *
from wolfram.wolfram_alpha_api import *
from latex.preprocess import *
from latex.print_latex import *

# def speech_to_latex(audio_file):
record('audio_input')
audio_file = 'audio_input'
# "integral of x squared"
# "sum from x equal one to ten of x "
print('Waiting on Wit.ai ...')

wit_resp = send_audio_to_wit(audio_file)
# wit_resp = send_audio_to_wit('audio_input')

print('Wit.ai response: ' + wit_resp)

if (len(wit_resp) > 0):
    # wa_resp = wolfram_interpret(wit_resp)
    #
    # print("Wolfram Alpha interpretation: " + str(wa_resp))
    #
    # if(wa_resp != None and len(wa_resp) > 0):
    #     preprocessed = preprocess(wa_resp)
    preprocessed = preprocess(wit_resp)

    print("Preprocessed expression: " + preprocessed)
    print_latex(preprocessed, 'dest')

    # return (wit_resp, wa_resp, preprocessed, "dest-1.png")
