
var FSM = {};

/**
 *
 * @param {function(function)} inputFn - Should invoke the callback with event data, e.g. "readline".
 * @param {function(string)} log - Out put goes here, e.g. console.log.
 * @param {function} exit - called when machine terminates, e.g. process.exit.
 */
FSM.machine = function finiteStateMachine(inputFn, log, exit) {
    'use strict';
    var finalStates = [],
        self = this;
    this.currentState = 'Initial';
    this.currentStateId = '/1319592604/2090816916';

    finalStates.push('/1319592604/1364444264');
    finalStates.push('/1319592604/484262466');


    log('Current state: ' + self.currentState + '(' + self.currentStateId + ')');
    log('Enter an event: ');

    inputFn(function (currentInput) {
        if (self.currentStateId === "/1319592604/1784105995") {
            if (currentInput === '24') {
                log('Switching state to State1 (1)');
                self.currentStateId = '/1319592604/1364444264';
                self.currentState = 'End';
            } else {
                log('Possible events for transition(s): 24');
            }
        } else if (self.currentStateId === "/1319592604/2090816916") {
            if (currentInput === '01') {
                log('Switching state to State1 (1)');
                self.currentStateId = '/1319592604/524989402';
                self.currentState = 'State1';
            } else if (currentInput === '02') {
                log('Switching state to State1 (1)');
                self.currentStateId = '/1319592604/1784105995';
                self.currentState = 'State2';
            } else {
                log('Possible events for transition(s): 01, 02');
            }
        } else if (self.currentStateId === "/1319592604/524989402") {
            if (currentInput === '12') {
                log('Switching state to State1 (1)');
                self.currentStateId = '/1319592604/1784105995';
                self.currentState = 'State2';
            } else if (currentInput === '13') {
                log('Switching state to State1 (1)');
                self.currentStateId = '/1319592604/484262466';
                self.currentState = 'End';
            } else {
                log('Possible events for transition(s): 12, 13');
            }
        }

        if (currentInput === 'exit') {
            exit();
        } else if (finalStates.indexOf(self.currentStateId) !== -1) {
            log('At a final state ' + self.currentState + '(' + self.currentStateId + ')');
            exit();
        } else {
            log('Current state: ' + self.currentState + '(' + self.currentStateId + ')');
            log('Enter an event: ');
        }
    });
};

FSM.Helpers = function () {
    'use strict';
    var self = this,
        currentInput = '',
        breakLoop = false;

    this.log = function (str) {
        currentInput += str + '\n';
    };

    this.inputFn = function (callback) {
        var newInput = window.prompt(currentInput);
        callback(newInput);
        if (breakLoop === false) {
            self.inputFn(callback);
        }
    };
    this.exit = function () {
        breakLoop = true;
    }
};



//
//FSM.helpers = new FSM.Helpers();
//
//FSM.machine(FSM.helpers.inputFn, FSM.helpers.log, FSM.helpers.exit);
