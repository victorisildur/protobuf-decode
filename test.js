import expect from 'expect';
import {calcGroupValue, byteArrToFieldMap, decode} from './protobuf';

const byteArr = {
    '0': 8, '1': 48, '2': 16, '3': 0, '4': 24, '5': 228, '6': 47,
    '7': 32, '8': 236, '9': 7
};

const msgStruct = {
    '1': 'today_walk',
    '2': 'today_run',
    '3': 'history_walk',
    '4': 'history_run',
    '5': 'today_duration',
    '6': 'history_duration',
    '7': 'total_time',
    '8': 'cur_time'
};

expect(
    calcGroupValue([0x16, 0x1])
).toEqual(150);

expect(
    calcGroupValue([0x2c, 0x2])
).toEqual(300);

expect(
    byteArrToFieldMap(byteArr)
).toEqual({1: 48, 2: 0, 3: 6116, 4: 1004});

expect(
    decode(byteArr, msgStruct)
).toEqual({
    'today_walk': 48,
    'today_run': 0,
    'history_walk': 6116,
    'history_run': 1004
});

console.log('Tests passed!');
