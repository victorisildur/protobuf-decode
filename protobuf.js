import {byteArrToNestedMap} from './byte_arr';

/* @func: Builder类
 * @param: 
 *     message{object} JSON格式message格式
 *     builders{object} 前序message builders, key为message名
 * @comment: 
 *     this.fieldInfos{object}: {1: {id:1, name:'date', type:'uint32'}, ...}
 *     this.builder{object}: {'Summary': builder, 'HistoryData': builder, ...}
 */
class Builder {
    constructor(message, builders) {
        this.name = message.name;
        this.fieldInfos = {};
        message.fields.forEach(field => {
            this.fieldInfos[field.id] = field;
        });
        this.builders = builders;
    }
    /* fieldMap -> message */
    _isBasicType(type) {
        let regex = /uint32|sint32|varint/;
        return regex.test(type);
    }
    map(fieldMap) {
        let map = {};
        for (let fnum in fieldMap) {
            let fieldInfo = this.fieldInfos[fnum];
            if (!fieldInfo) {
                throw new Error('Proto has not defined field number ' + fnum + ' for message ' + this.name);
            }
            if (this._isBasicType(fieldInfo.type)) {
                // 原始类型
                map[fieldInfo.name] = fieldMap[fnum];
            } else {
                // embedded元素
                let type = fieldInfo.type;
                if (!this.builders[type]) {
                    throw new Error('Proto has not defined message type ' + type + ' for message ' + this.name);
                }
                map[fieldInfo.name] = fieldMap[fnum].map(fieldMapInArr => {
                    return this.builders[type].map(fieldMapInArr);
                });
            }
        }
        return map;
    }
}

/* @func: JSON package struct -> builders{object}
 * @param: 
 *     package{object} JSON格式proto package定义
 * @return: 
 *     builders{object} builders, key为message名
 */
const build = msgPackage => {
    let builders = {};
    msgPackage.messages.forEach(message => {
        let builder = new Builder(message, builders);
        builders[builder.name] = builder;
    });
    return builders;
};



/* @func: byteArr -> {'details': [{'date':0,...}...], 'tag': 0}
 * @param:
 *     byteArr{object}: byte数组
 *     builder{Buider}: Builder类实例，对应具体message
 * @return:
 *     {object}: 解好的message
 */
const decode = (byteArr, builder) => {
    var arr = byteArr;
    if (!(byteArr instanceof Array)) {
        arr = [];
        for (let i in byteArr) {
            arr.push(byteArr[i]);
        }
    }
    let map = byteArrToNestedMap(arr);
    return builder.map(map);
};

export default {
    build,
    decode
};
