/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Test = (function() {

    /**
     * Namespace Test.
     * @exports Test
     * @namespace
     */
    var Test = {};

    Test.TestService = (function() {

        /**
         * Constructs a new TestService service.
         * @memberof Test
         * @classdesc Represents a TestService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function TestService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (TestService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TestService;

        /**
         * Callback as used by {@link Test.TestService#refreshToken}.
         * @memberof Test.TestService
         * @typedef RefreshTokenCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {Test.EmptyMessage} [response] EmptyMessage
         */

        /**
         * Calls RefreshToken.
         * @function refreshToken
         * @memberof Test.TestService
         * @instance
         * @param {Test.IEmptyMessage} request EmptyMessage message or plain object
         * @param {Test.TestService.RefreshTokenCallback} callback Node-style callback called with the error, if any, and EmptyMessage
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(TestService.prototype.refreshToken = function refreshToken(request, callback) {
            return this.rpcCall(refreshToken, $root.Test.EmptyMessage, $root.Test.EmptyMessage, request, callback);
        }, "name", { value: "RefreshToken" });

        /**
         * Calls RefreshToken.
         * @function refreshToken
         * @memberof Test.TestService
         * @instance
         * @param {Test.IEmptyMessage} request EmptyMessage message or plain object
         * @returns {Promise<Test.EmptyMessage>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link Test.TestService#getOrder}.
         * @memberof Test.TestService
         * @typedef GetOrderCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {Test.EmptyMessage} [response] EmptyMessage
         */

        /**
         * Calls GetOrder.
         * @function getOrder
         * @memberof Test.TestService
         * @instance
         * @param {Test.IEmptyMessage} request EmptyMessage message or plain object
         * @param {Test.TestService.GetOrderCallback} callback Node-style callback called with the error, if any, and EmptyMessage
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(TestService.prototype.getOrder = function getOrder(request, callback) {
            return this.rpcCall(getOrder, $root.Test.EmptyMessage, $root.Test.EmptyMessage, request, callback);
        }, "name", { value: "GetOrder" });

        /**
         * Calls GetOrder.
         * @function getOrder
         * @memberof Test.TestService
         * @instance
         * @param {Test.IEmptyMessage} request EmptyMessage message or plain object
         * @returns {Promise<Test.EmptyMessage>} Promise
         * @variation 2
         */

        return TestService;
    })();

    Test.EmptyMessage = (function() {

        /**
         * Properties of an EmptyMessage.
         * @memberof Test
         * @interface IEmptyMessage
         */

        /**
         * Constructs a new EmptyMessage.
         * @memberof Test
         * @classdesc Represents an EmptyMessage.
         * @implements IEmptyMessage
         * @constructor
         * @param {Test.IEmptyMessage=} [properties] Properties to set
         */
        function EmptyMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Encodes the specified EmptyMessage message. Does not implicitly {@link Test.EmptyMessage.verify|verify} messages.
         * @function encode
         * @memberof Test.EmptyMessage
         * @static
         * @param {Test.IEmptyMessage} message EmptyMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EmptyMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Decodes an EmptyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Test.EmptyMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Test.EmptyMessage} EmptyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EmptyMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Test.EmptyMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return EmptyMessage;
    })();

    return Test;
})();

module.exports = $root;
