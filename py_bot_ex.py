from pynput.keyboard import Key, Controller
from time import sleep
import cv2
import numpy as np
import pyautogui
import imutils
from random import randint
import cv2

keyboard = Controller()

def find_template():
	img_rgb = cv2.imread('images/test_1.png')
	img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
	template = cv2.imread('images/mountain.png',0)
	w, h = template.shape[::-1]
	res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
	threshold = 0.9
	loc = np.where( res >= threshold)

	for pt in zip(*loc[::-1]):
		cv2.rectangle(img_rgb, pt, (pt[0] + w, pt[1] + h), (0,255,255), 2)

	cv2.imshow('Detected',img_rgb)
	cv2.waitKey(0)
	cv2.destroyAllWindows()

class Bot():
    def __init__(self):
        self.screenshot = None
        self.movements = ""

    def w_key(self):
        print('w')
        keyboard.press('w')
        sleep(0.2)
        keyboard.release('w')
        sleep(0.2)

    def a_key(self):
        print('a')
        keyboard.press('a')
        sleep(0.2)
        keyboard.release('a')
        sleep(0.2)

    def s_key(self):
        print('s')
        keyboard.press('s')
        sleep(0.2)
        keyboard.release('s')
        sleep(0.2)

    def d_key(self):
        print('d')
        keyboard.press('d')
        sleep(0.2)
        keyboard.release('d')
        sleep(0.2)

    def do_screenshot(self):
        image = pyautogui.screenshot()
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        self.screenshot = image

    def way_find(self):
        img_rgb = self.screenshot
        threshold = 0.9
        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
        template = cv2.imread('w_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.w_key()

        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
        template = cv2.imread('a_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.a_key()

        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
        template = cv2.imread('s_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.s_key()

        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
        template = cv2.imread('d_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.d_key()

    def graph_compile(self, image, threshold):
        template = cv2.imread('w_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(imgagey,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.graph.add_node(self.movements, movement_str_transformation(self.movements + "w"))

        template = cv2.imread('a_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(imgagey,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.graph.add_node(self.movements, movement_str_twransformation(self.movements + "a"))

        template = cv2.imread('s_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(imgagey,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.graph.add_node(self.movements, movement_str_transformation(self.movements + "s"))

        template = cv2.imread('d_key.png',0)
        w, h = template.shape[::-1]
        res = cv2.matchTemplate(imgagey,template,cv2.TM_CCOEFF_NORMED)
        loc = np.where( res >= threshold)

        if(loc[0].size > 0):
            self.graph.add_node(self.movements, movement_str_transformation(self.movements + "d"))

    def movement_str_transformation(self):
        self.movements.replace("ws", "")
        self.movements.replace("sw", "")
        self.movements.replace("ad", "")
        self.movements.replace("da", "")

    def path_select(number_of_paths, func):
        path = randint(0, number_of_paths)
        func[path]()

    def start(self):
        while True:
            self.do_screenshot()
            self.way_find()

bot = Bot()
find_template()
