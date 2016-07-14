/* @func: 7位byte数组 -> varint值，用于把小端序字节转成Int
 * @param: byteArr{array}: 7位byte数组
 * @return: {int}
 */
const calcGroupValue = (byteArr) => {
    let intVal = 0;
    for (let i = 0, l = byteArr.length; i < l; i++) {
        intVal += byteArr[i] * Math.pow(2, i*7);
    }
    return intVal;
};

/* @func: byte数组-> int32数组
 * @comment:
 * {0: 8, 1: 48} -> {1: 48}
 */
const byteArrToFieldMap = (byteArr) => {
    // 计算byte数组长度
    if (typeof byteArr.length == 'undefined') {
        let len = 0;
        for (let i in byteArr) {
            len ++;
        }
        byteArr.length = len;
    }
    let isKey = true,
        type = 0,
        fieldNumber = 0,
        byteGroup = [],
        fieldMap = {};
    for (let i=0; i< byteArr.length; i++) {
        let byte = byteArr[i];
        //console.log('byte[%d]: %d, isKey: %s', i, byte, isKey);
        if (isKey) {
            type = byte & 0x7; //低3位 -> wire type
            fieldNumber = (byte >> 3) & 0x1f; //7-3位 -> fieldNumber
            isKey = false;
            byteGroup = [];
        } else {
            let msb = (byte >> 7) & 0x1,
                val = byte & 0x7f;
            byteGroup.push(val);
            if (msb === 0) {
                isKey = true; // 非key字节msb == 0, 说明该varint结束
                fieldMap[fieldNumber] = calcGroupValue(byteGroup);
            }
        }
        //console.log('    fieldNumber: %d, type: %d', fieldNumber, type);
    }
    return fieldMap;
};

/* @func: 字节数组 + 消息格式 -> 格式化消息
 * @param: 
 *    msgStruct{object}: 
 *      {  1: 'today_walk',
 *         2: 'today_run'... }
 *    byteArr{object}:
 *      { 0: 8, 1: 48, 2: 16 ...}
 * @return:
 *    { 'today_walk': 48,
 *      'today_run': 0 ... }
 */
const decode = (byteArr, msgStruct) => {
    let fieldMap = byteArrToFieldMap(byteArr),
        msg = {};
    for (let fieldIndex in msgStruct) {
        if (fieldMap.hasOwnProperty(fieldIndex)) {
            let fieldName = msgStruct[fieldIndex];
            msg[fieldName] = fieldMap[fieldIndex];
        }
    }
    return msg;
};

export {calcGroupValue, byteArrToFieldMap, decode}
