## Protobuf-decode
Javascript version protobuf decoder.
Aim: light-weight, file size no larger than 5kB. Just decode simple structs.

## Usage
We don't use .proto file, instead, we use a JSON formatted message description, basically the same as [protobuf.js json format](https://github.com/dcodeIO/protobuf.js/blob/master/tests/complex.json).

To decode a protobuf, first you need to use `build()` method to build the message package,
this step will automatically detect embedded message dependencies and handle them for furthur use.

Then, you can pick your message from the result of first step to actually decode a byte array.
This process shoud be like:

```javascript
import protobuf from './protobuf';
import msgPackage from './msg_struct';

// build the messages package
const builders = protobuf.build(msgPackage),
      builder = builders.HistoryData;

// decode using message builder
protobuf.decode(byteArr, builder)
```

## Demo
It's written in es6 style code, so you need to npm install babel-node.
To test, you can run:

`babel-node --presets es2015 test.js`

