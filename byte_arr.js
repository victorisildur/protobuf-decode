/* @func: 7位byte数组 -> varint值，用于把小端序字节转成Int
 * @param: byteArr{array}: 7位byte数组
 * @return: {int}
 */
export const calcGroupValue = (byteArr) => {
    let intVal = 0;
    for (let i = 0, l = byteArr.length; i < l; i++) {
        intVal += byteArr[i] * Math.pow(2, i*7);
    }
    return intVal;
};

/* @func: byte数组-> int32数组
 *    {0: 8, 1: 48} -> {1: 48}
 * @param: byte数组
 * @return: fieldMap
 * @comment:
 *    tag: 1 byte, 由field number + wire type组成
 *    byteGroup: varint连续byte, 以msb==0的字节结尾
 *    整个数组由 tag + byteGroup 组成
 *    fieldMap:  key是field number, value是varint值
 */
export const byteArrToFieldMap = (byteArr) => {
    let isKey = true,
        wireType = 0,
        fieldNumber = 0,
        byteGroup = [],
        fieldMap = {};
    for (let i=0; i< byteArr.length; i++) {
        let byte = byteArr[i];
        //console.log('byte[%d]: %d, isKey: %s', i, byte, isKey);
        if (isKey) {
            wireType = byte & 0x7; //低3位 -> wire type
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
        //console.log('    fieldNumber: %d, wireType: %d', fieldNumber, wireType);
    }
    return fieldMap;
};

/* @func: byte数组 -> fieldMap
 * @param: byteArr{array}
 * @return: fieldMap{object}，其中repeat元素，key为field number, value为[fieldMap...]
 */
export const byteArrToNestedMap = (byteArr) => {
    let isKey = true,
        payload = -1,
        wireType = 0,
        fieldNumber = 0,
        map = {};
    for (let i=0; i< byteArr.length; ) {
        let byte = byteArr[i];
        if (isKey) {
            // 低3位 -> wire type
            wireType = byte & 0x7;
            // 7-3位 -> fieldNumber
            fieldNumber = (byte >> 3) & 0x1f;
            console.log('    fieldNumber: %d, wireType: %d', fieldNumber, wireType);
            isKey = false;
            i = i + 1;
        } else {
            if (wireType === 2) {
                payload = byte;
                console.log('    payload: %d', payload);
                // payload是embedded element的长度，对它可以映射成fieldMap
                let fieldMap = byteArrToFieldMap(byteArr.slice(i+1, i+1+payload));
                console.log('    fieldMap: ', fieldMap);
                // embedded元素，生成的fieldMap，push到map对应项里
                if (!map[fieldNumber])
                    map[fieldNumber] = [];
                map[fieldNumber].push(fieldMap);
                i = i + 1 + payload;
                isKey = true;
            } else if (wireType === 0) {
                let fieldMap = byteArrToFieldMap(byteArr.slice(i-1));
                console.log('    fieldMap: ', fieldMap);
                // 非embedded元素，生成的fieldMap直接拼到map里
                for (let k in fieldMap) {
                    map[k] = fieldMap[k];
                }
                i = byteArr.length;
            }
        }
    }
    return map;
};
