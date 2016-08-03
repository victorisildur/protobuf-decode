import expect from 'expect';

var ProtoBuf = require('protobufjs');

var byteObj = {"0":10,"1":14,"2":8,"3":224,"4":155,"5":225,"6":188,"7":5,"8":16,"9":0,"10":24,"11":172,"12":45,"13":32,"14":143,"15":19,"16":10,"17":12,"18":8,"19":217,"20":190,"21":230,"22":188,"23":5,"24":16,"25":0,"26":24,"27":38,"28":32,"29":20,"30":10,"31":12,"32":8,"33":216,"34":225,"35":235,"36":188,"37":5,"38":16,"39":0,"40":24,"41":0,"42":32,"43":0,"44":10,"45":12,"46":8,"47":216,"48":132,"49":241,"50":188,"51":5,"52":16,"53":0,"54":24,"55":0,"56":32,"57":0,"58":10,"59":12,"60":8,"61":216,"62":167,"63":246,"64":188,"65":5,"66":16,"67":0,"68":24,"69":0,"70":32,"71":0,"72":16,"73":0};
var byteArr = [];
for (var i in byteObj) {
    byteArr.push(byteObj[i]);
}
var protoString =  "package qfind;\n\n\n    //记步信息总览\n        message Summary {\n            optional uint32 today_walk = 1;             //今天走路步数\n            optional uint32 today_run = 2;              //今天跑步步数\n            optional uint32 history_walk = 3;           //历史走路总步数\n            optional uint32 history_run = 4;            //历史跑步总步数\n            optional uint32 today_duration = 5;         //今天运动时长， 单位s\n            optional uint32 history_duration = 6;       //历史运动总时长，单位s\n     optional uint32 total_time = 7;             //从绑定开始到现在的时间,单位s\n     optional uint32 cur_time = 8;               //当前时间\n        }\n\n        //单次运动详情\n        message StepDetail {\n            optional uint32 start_time = 1;             //单次运动开始时间， UTC\n            optional uint32 end_time = 2;               //单次运动结束时间， UTC\n            optional uint32 run = 3;                    //跑步步数\n            optional uint32 walk = 4;                   //走路步数\n        }\n\n        //今天记步详细数据\n        message TodayStepDetail {\n            repeated StepDetail details = 1;            //今天运动详情，数组\n        }\n\n        // 历史记步详情\n        message HistoryDetail {\n            optional uint32 date = 1;                   //日期，UTC时间\n            optional uint32 run = 2;                    //跑步步数\n            optional uint32 walk = 3;                   //走路步数\n            optional uint32 duration = 4;               //运动时长\n        }\n\n        //历史记步数据\n        message HistoryData {\n            repeated HistoryDetail details = 1;         //历史运动详情， 数组\n        optional uint32 tag = 2; //历史数据标记, 手Q回包用\n        }\n\n";
var builder = ProtoBuf.loadProto(protoString).build('qfind'),
    historyDataBuilder = builder.HistoryData;

const msg = historyDataBuilder.decode(byteArr);

console.log('Offical Lib Tests passed!');

import protobuf from './protobuf';
import msgPackage from './msg_struct';

expect(
    protobuf.decode(byteArr, protobuf.build(msgPackage).HistoryData)
).toEqual({
    details: [
        {
            date: 1469599200,
            duration: 2447,
            run: 0,
            walk: 5804
        }, {
            date: 1469685593,
            duration: 20,
            run: 0,
            walk: 38
        }, {
            date: 1469771992,
            duration: 0,
            run: 0,
            walk: 0
        }, {
            date: 1469858392,
            duration: 0,
            run: 0,
            walk: 0
        }, {
            date: 1469944792,
            duration: 0,
            run: 0,
            walk: 0 }
    ],
    tag: 0
});

console.log('My Lib Tests passed!');
