import expect from 'expect';
import {calcGroupValue, byteArrToFieldMap} from './byte_arr';

const byteArr = {"0":8,"1":38,"2":24,"3":210,"4":45,"5":40,"6":20,"7":48,"8":163,"9":19,"10":56,"11":202,"12":205,"13":30,"14":64,"15":208,"16":195,"17":229,"18":188,"19":5};

const arr = [];
for (let i in byteArr) {
    arr.push(byteArr[i]);
}

expect(
    calcGroupValue([0x16, 0x1])
).toEqual(150);

expect(
    calcGroupValue([0x2c, 0x2])
).toEqual(300);

expect(
    byteArrToFieldMap(arr)
).toEqual({ 1: 38, 3: 5842, 5: 20, 6: 2467, 7: 501450, 8: 1469669840 });
console.log('Byte_Arr Tests passed!');

import msgPackage from './msg_struct';
import protobuf from './protobuf';

expect(
    protobuf.decode(arr, protobuf.build(msgPackage).Summary)
).toEqual({
    'today_walk': 38,
    'history_walk': 5842,
    'today_duration': 20,
    'history_duration': 2467,
    'total_time': 501450,
    'cur_time': 1469669840
});

console.log('Summary Message Decode Tests passed!');
