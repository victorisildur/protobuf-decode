# Protobuf-decode
Javascript version protobuf decoder.
Aim: light-weight, file size no larger than 5kB. Just decode simple structs.

# Demo
It's written in es6 style code, so you need to npm install babel-node.
To test, you can run:

`babel-node --presets es2015 test.js`

# Usage
We don't use .proto file since it's only used with simple structs, you can mimic the msg_struct.js to define your message structure.

Then import 'protobuf-decode' and use its `decode()` method!