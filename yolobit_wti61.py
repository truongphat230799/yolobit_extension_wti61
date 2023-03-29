import time
import math
from machine import UART, Pin
from micropython import const

class Motion:
    def __init__(self, tx_pin, rx_pin):
        self.tx_pin = tx_pin
        self.rx_pin = rx_pin
        self.uart = UART(2, bits=8, parity=None, stop=1, baudrate=115200, rx=self.rx_pin, tx=self.tx_pin)
        self._buffer = bytearray(11)
        self.flush_rate = 30

    def reset_angle(self):
        self.uart.write(b'\xFF\xAA\x52')
        self.uart.write(b'\xFF\xAA\x67')
        time_start = time.ticks_ms()
        time.sleep(0.1)
        while self.get_angle() > 2:
            time.sleep_ms(50)
            if time.ticks_ms() - time_start > 1000:
                # after 2s then timeout, reset UART connection
                print('Uart connection to angle sensor error')
                self.uart.deinit()
                self.uart = UART(2, bits=8, parity=None, stop=1, baudrate=115200, rx=self.rx_pin, tx=self.tx_pin)
                self.uart.write(b'\xFF\xAA\x52')
                self.uart.write(b'\xFF\xAA\x67')
                self.flush()
                return


    def flush(self):
        for i in range(self.flush_rate):
            if self.uart.read() == None:
                break

    '''
        both_sign = True: Angle return will from -180 to 180
        both_sign = False: Angle return will be 0-360
    '''
    def get_angle(self, both_sign=True):
        self.flush()
        time_start = time.ticks_ms()
        counter = 0
        while True:
            if self.uart.any():
                c = self.uart.read(1)
                if c is None:
                    continue
                else:
                    self._buffer[counter] = c[0]
                    if counter == 0 and c[0] != 0x55:
                        continue
                    counter += 1
                    if counter == 11:
                        # process data
                        if self._buffer[1] == 0x53:
                            yL = self._buffer[6]
                            yH = self._buffer[7]
                            angle = ((yH<<8)|yL)/32768*180
                            if both_sign:
                                if angle > 180:
                                    return (angle - 360)
                                else:
                                    return angle
                            else:
                                return angle
                        # reset index
                        counter = 0
            if time.ticks_ms() - time_start > 200:
                print('Read angle timeout - Return 0')
                return 0

    def wait_angle(self, wait_angle):
        start_angle = self.get_angle(False)
        time_start = time.ticks_ms()
        
        while True:
            current_angle = self.get_angle(False)
            distance = current_angle - start_angle
            print(current_angle, distance)
            if wait_angle > 0:
                if distance > wait_angle:
                    break
            else:
                if distance < wait_angle:
                    continue
                '''
                if angle < 1 or angle > 355:
                    #time.sleep_ms(10)
                    continue
                else:
                    angle = 360-angle
                    if angle > abs(wait_angle):
                        return
                    else:
                        #time.sleep_ms(10)
                        continue
                '''
            if time.ticks_ms() - time_start > 2500:
                print('Wait angle timeout')
                return
