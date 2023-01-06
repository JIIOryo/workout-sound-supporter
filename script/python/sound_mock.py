import json
import os
import sys
import time

# the frequency of "pi!"
f = 750
# the length of "pi!"
length = 0.02
# 2 ^ (1/12)
r = 1.059
# How many scales to shift in Power Up
pun = 1
# the frequency of "pi!" in count down
count_down_f = 493.88
# the length of "piii!" in count down
count_down_piii_length = 0.4

# mockでは実際に音声を再生せずに標準出力に出力するだけ
def pi(SOUND_PIN, length, f):
    # p = GPIO.PWM(SOUND_PIN, 1)
    # p.start(20)
    # p.ChangeFrequency(f)
    time.sleep(length)
    # p.stop()
    print('pi! @pin{} {}Hz for {}sec '.format(SOUND_PIN, f, length))
    return

def pi_1sec(SOUND_PIN, length, f):
    if length <= 0 or 1 <= length:
        print('Please input an length that is greater than 0 seconds and less than 1 second.')
        return
    pi(SOUND_PIN, length, f)
    time.sleep(1 - length)
    return

def power_up(SOUND_PIN):
    FA = 698.46 * r ** pun
    MI = 622.25 * r ** pun
    SO = 783 * r ** pun

    pi(SOUND_PIN, 0.05, FA)
    time.sleep(0.07)
    pi(SOUND_PIN, 0.05, FA)
    time.sleep(0.07)
    pi(SOUND_PIN, 0.05, FA)
    time.sleep(0.07)
    pi(SOUND_PIN, 0.05, FA)
    time.sleep(0.15)
    pi(SOUND_PIN, 0.1, MI)
    time.sleep(0.15)
    pi(SOUND_PIN, 0.1, SO)
    time.sleep(0.15)
    pi(SOUND_PIN, 0.5, FA)

    return

def count_down(SOUND_PIN):
    for _ in range(3):
        pi_1sec(SOUND_PIN, length, count_down_f)
    pi(SOUND_PIN, count_down_piii_length, count_down_f * r ** 5)
    time.sleep(1 - count_down_piii_length)
    return

if __name__ == '__main__':
    # GPIO pin number(BCM) of speaker
    SOUND_PIN = int(os.environ['SOUND_PIN'])

    args = sys.argv
    arg = args[1]
    # args[1]: '[{"intervalSec": 0.5, "soundCount" :10, "setCount": 3, "restSec": 5}, {"intervalSec": 1, "soundCount" : 3, "setCount": 1, "restSec": 0}]'
    workout_list = json.loads(arg)

    # mockではunitの数だけcount_downを鳴らすだけ
    for workout in workout_list:
      count_down(SOUND_PIN)
    
    # power_upを鳴らす
    power_up(SOUND_PIN)
