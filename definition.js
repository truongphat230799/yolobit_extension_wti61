const ColorBlock = "#2ECC71";
Blockly.Blocks['yolobit_motion_start'] = {
    init: function() {
      this.jsonInit(
        {
          type: "yolobit_sound_start",
          message0: "khởi tạo cảm biến góc chân TX %1 RX %2",
          previousStatement: null,
          nextStatement: null,
          args0: [
            {
              type: "field_dropdown",
              name: "TX",
              "options": [
                [
                  "P3",
                  "pin3"
                ],
                [
                  "P0",
                  "pin0"
                ],
                [
                  "P1",
                  "pin1"
                ],
                [
                  "P2",
                  "pin2"
                ],
                [
                  "P4",
                  "pin4"
                ],
                [
                  "P5",
                  "pin5"
                ],
                [
                  "P6",
                  "pin6"
                ],
                [
                  "P7",
                  "pin7"
                ],
                [
                  "P8",
                  "pin8"
                ],
                [
                  "P9",
                  "pin9"
                ],
                [
                  "P10",
                  "pin10"
                ],
                [
                  "P11",
                  "pin11"
                ],
                [
                  "P12",
                  "pin12"
                ],
                [
                  "P13",
                  "pin13"
                ],
                [
                  "P14",
                  "pin14"
                ],
                [
                  "P15",
                  "pin15"
                ],
                [
                  "P16",
                  "pin16"
                ],
                [
                  "P19",
                  "pin19"
                ],
                [
                  "P20",
                  "pin20"
                ]
              ]
            },
            {
              "type": "field_dropdown",
              "name": "RX",
              "options": [
                [
                  "P6",
                  "pin6"
                ],
                [
                  "P0",
                  "pin0"
                ],
                [
                  "P1",
                  "pin1"
                ],
                [
                  "P2",
                  "pin2"
                ],
                [
                  "P3",
                  "pin3"
                ],
                [
                  "P4",
                  "pin4"
                ],
                [
                  "P5",
                  "pin5"
                ],              
                [
                  "P7",
                  "pin7"
                ],
                [
                  "P8",
                  "pin8"
                ],
                [
                  "P9",
                  "pin9"
                ],
                [
                  "P10",
                  "pin10"
                ],
                [
                  "P11",
                  "pin11"
                ],              
                [
                  "P12",
                  "pin12"
                ],
                [
                  "P13",
                  "pin13"
                ],
                [
                  "P14",
                  "pin14"
                ],
                [
                  "P15",
                  "pin15"
                ],
                [
                  "P16",
                  "pin16"
                ],
                [
                  "P19",
                  "pin19"
                ],
                [
                  "P20",
                  "pin20"
                ]
              ]
            }
          ],
          colour: ColorBlock,
          tooltip: "",
          helpUrl: ""
        }
      );
    }
  };
  Blockly.Python['yolobit_motion_start'] = function(block) {
    // TODO: Assemble Python into code variable.
    var tx = block.getFieldValue('TX');
    var rx = block.getFieldValue('RX');
    Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
    Blockly.Python.definitions_['import_motion_wti61'] = 'from yolobit_wti61 import *';
    Blockly.Python.definitions_['create_motion'] = 'motion = machine.UART(2, bits=8, parity=None, stop=1, baudrate=115200, rx=' + rx + '.pin, tx=' + tx + '.pin)';
    var code = '';
    return code;
};

Blockly.Blocks['yolobit_motion_reset'] = {
    init: function() {
      this.jsonInit(
        {
            "type": "yolobit_motion_reset",
            "message0": "đặt lại giá trị góc",
            "previousStatement": null,
            "nextStatement": null,
            "colour": ColorBlock,
            "tooltip": "",
            "helpUrl": ""
        }
      );
    }
};
Blockly.Python['yolobit_motion_reset'] = function(block) {
    // TODO: Assemble Python into code variable.
    var code = 'motion.reset_angle()\n';
    return code;
  };
  Blockly.Blocks['yolobit_get_angle'] = {
    init: function() {
      this.jsonInit(
        {
            "type": "yolobit_get_angle",
            "message0": "giá trị góc",
            "output": null,
            "colour": ColorBlock,
            "tooltip": "",
            "helpUrl": ""
        }
      );
    }
};

Blockly.Python['yolobit_get_angle'] = function(block) {
    // TODO: Assemble Python into code variable.
    var code = 'motion.get_angle()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['yolobit_wait_angle'] = {
    init: function() {
      this.jsonInit(
        {
            "type": "yolobit_wait_angle",
            "message0": "chờ đến góc %2 %1",
            "args0": [
              {
                "type": "field_number",
                "name": "wait_angle",
                "value": 0,
                "min": -180,
                "max": 180
              },
              {
                "type": "input_dummy",
              }
            ],
            "output": null,
            "colour": ColorBlock,
            "tooltip": "",
            "helpUrl": ""
        }
      );
    }
};
Blockly.Python['yolobit_wait_angle'] = function(block) {
    var wait_angle = block.getFieldValue('wait_angle');
    // TODO: Assemble Python into code variable.
    var code = 'motion.wait_angle('+wait_angle+')';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
  };
