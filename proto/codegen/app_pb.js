/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.KosmosCustomerApp = (function() {

    /**
     * Namespace KosmosCustomerApp.
     * @exports KosmosCustomerApp
     * @namespace
     */
    var KosmosCustomerApp = {};

    KosmosCustomerApp.AccountService = (function() {

        /**
         * Constructs a new AccountService service.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an AccountService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function AccountService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (AccountService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AccountService;

        /**
         * Callback as used by {@link KosmosCustomerApp.AccountService#getInfo}.
         * @memberof KosmosCustomerApp.AccountService
         * @typedef GetInfoCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {KosmosCustomerApp.AccountGetInfoResponse} [response] AccountGetInfoResponse
         */

        /**
         * Calls GetInfo.
         * @function getInfo
         * @memberof KosmosCustomerApp.AccountService
         * @instance
         * @param {KosmosCustomerApp.IAccountGetInfoRequest} request AccountGetInfoRequest message or plain object
         * @param {KosmosCustomerApp.AccountService.GetInfoCallback} callback Node-style callback called with the error, if any, and AccountGetInfoResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(AccountService.prototype.getInfo = function getInfo(request, callback) {
            return this.rpcCall(getInfo, $root.KosmosCustomerApp.AccountGetInfoRequest, $root.KosmosCustomerApp.AccountGetInfoResponse, request, callback);
        }, "name", { value: "GetInfo" });

        /**
         * Calls GetInfo.
         * @function getInfo
         * @memberof KosmosCustomerApp.AccountService
         * @instance
         * @param {KosmosCustomerApp.IAccountGetInfoRequest} request AccountGetInfoRequest message or plain object
         * @returns {Promise<KosmosCustomerApp.AccountGetInfoResponse>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link KosmosCustomerApp.AccountService#getBalance}.
         * @memberof KosmosCustomerApp.AccountService
         * @typedef GetBalanceCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {KosmosCustomerApp.AccountGetBalanceResponse} [response] AccountGetBalanceResponse
         */

        /**
         * Calls GetBalance.
         * @function getBalance
         * @memberof KosmosCustomerApp.AccountService
         * @instance
         * @param {KosmosCustomerApp.IAccountGetBalanceRequest} request AccountGetBalanceRequest message or plain object
         * @param {KosmosCustomerApp.AccountService.GetBalanceCallback} callback Node-style callback called with the error, if any, and AccountGetBalanceResponse
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(AccountService.prototype.getBalance = function getBalance(request, callback) {
            return this.rpcCall(getBalance, $root.KosmosCustomerApp.AccountGetBalanceRequest, $root.KosmosCustomerApp.AccountGetBalanceResponse, request, callback);
        }, "name", { value: "GetBalance" });

        /**
         * Calls GetBalance.
         * @function getBalance
         * @memberof KosmosCustomerApp.AccountService
         * @instance
         * @param {KosmosCustomerApp.IAccountGetBalanceRequest} request AccountGetBalanceRequest message or plain object
         * @returns {Promise<KosmosCustomerApp.AccountGetBalanceResponse>} Promise
         * @variation 2
         */

        return AccountService;
    })();

    KosmosCustomerApp.AccountGetInfoRequest = (function() {

        /**
         * Properties of an AccountGetInfoRequest.
         * @memberof KosmosCustomerApp
         * @interface IAccountGetInfoRequest
         */

        /**
         * Constructs a new AccountGetInfoRequest.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an AccountGetInfoRequest.
         * @implements IAccountGetInfoRequest
         * @constructor
         * @param {KosmosCustomerApp.IAccountGetInfoRequest=} [properties] Properties to set
         */
        function AccountGetInfoRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Encodes the specified AccountGetInfoRequest message. Does not implicitly {@link KosmosCustomerApp.AccountGetInfoRequest.verify|verify} messages.
         * @function encode
         * @memberof KosmosCustomerApp.AccountGetInfoRequest
         * @static
         * @param {KosmosCustomerApp.IAccountGetInfoRequest} message AccountGetInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountGetInfoRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Decodes an AccountGetInfoRequest message from the specified reader or buffer.
         * @function decode
         * @memberof KosmosCustomerApp.AccountGetInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {KosmosCustomerApp.AccountGetInfoRequest} AccountGetInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountGetInfoRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KosmosCustomerApp.AccountGetInfoRequest();
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

        return AccountGetInfoRequest;
    })();

    KosmosCustomerApp.AccountGetInfoResponse = (function() {

        /**
         * Properties of an AccountGetInfoResponse.
         * @memberof KosmosCustomerApp
         * @interface IAccountGetInfoResponse
         * @property {KosmosCustomerApp.IAccount|null} [data] AccountGetInfoResponse data
         */

        /**
         * Constructs a new AccountGetInfoResponse.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an AccountGetInfoResponse.
         * @implements IAccountGetInfoResponse
         * @constructor
         * @param {KosmosCustomerApp.IAccountGetInfoResponse=} [properties] Properties to set
         */
        function AccountGetInfoResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountGetInfoResponse data.
         * @member {KosmosCustomerApp.IAccount|null|undefined} data
         * @memberof KosmosCustomerApp.AccountGetInfoResponse
         * @instance
         */
        AccountGetInfoResponse.prototype.data = null;

        /**
         * Encodes the specified AccountGetInfoResponse message. Does not implicitly {@link KosmosCustomerApp.AccountGetInfoResponse.verify|verify} messages.
         * @function encode
         * @memberof KosmosCustomerApp.AccountGetInfoResponse
         * @static
         * @param {KosmosCustomerApp.IAccountGetInfoResponse} message AccountGetInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountGetInfoResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.KosmosCustomerApp.Account.encode(message.data, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Decodes an AccountGetInfoResponse message from the specified reader or buffer.
         * @function decode
         * @memberof KosmosCustomerApp.AccountGetInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {KosmosCustomerApp.AccountGetInfoResponse} AccountGetInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountGetInfoResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KosmosCustomerApp.AccountGetInfoResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.data = $root.KosmosCustomerApp.Account.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return AccountGetInfoResponse;
    })();

    KosmosCustomerApp.AccountGetBalanceRequest = (function() {

        /**
         * Properties of an AccountGetBalanceRequest.
         * @memberof KosmosCustomerApp
         * @interface IAccountGetBalanceRequest
         * @property {string|null} [partnerId] AccountGetBalanceRequest partnerId
         */

        /**
         * Constructs a new AccountGetBalanceRequest.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an AccountGetBalanceRequest.
         * @implements IAccountGetBalanceRequest
         * @constructor
         * @param {KosmosCustomerApp.IAccountGetBalanceRequest=} [properties] Properties to set
         */
        function AccountGetBalanceRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountGetBalanceRequest partnerId.
         * @member {string} partnerId
         * @memberof KosmosCustomerApp.AccountGetBalanceRequest
         * @instance
         */
        AccountGetBalanceRequest.prototype.partnerId = "";

        /**
         * Encodes the specified AccountGetBalanceRequest message. Does not implicitly {@link KosmosCustomerApp.AccountGetBalanceRequest.verify|verify} messages.
         * @function encode
         * @memberof KosmosCustomerApp.AccountGetBalanceRequest
         * @static
         * @param {KosmosCustomerApp.IAccountGetBalanceRequest} message AccountGetBalanceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountGetBalanceRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.partnerId != null && Object.hasOwnProperty.call(message, "partnerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.partnerId);
            return writer;
        };

        /**
         * Decodes an AccountGetBalanceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof KosmosCustomerApp.AccountGetBalanceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {KosmosCustomerApp.AccountGetBalanceRequest} AccountGetBalanceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountGetBalanceRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KosmosCustomerApp.AccountGetBalanceRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.partnerId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return AccountGetBalanceRequest;
    })();

    KosmosCustomerApp.AccountGetBalanceResponse = (function() {

        /**
         * Properties of an AccountGetBalanceResponse.
         * @memberof KosmosCustomerApp
         * @interface IAccountGetBalanceResponse
         * @property {number|null} [balance] AccountGetBalanceResponse balance
         */

        /**
         * Constructs a new AccountGetBalanceResponse.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an AccountGetBalanceResponse.
         * @implements IAccountGetBalanceResponse
         * @constructor
         * @param {KosmosCustomerApp.IAccountGetBalanceResponse=} [properties] Properties to set
         */
        function AccountGetBalanceResponse(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AccountGetBalanceResponse balance.
         * @member {number} balance
         * @memberof KosmosCustomerApp.AccountGetBalanceResponse
         * @instance
         */
        AccountGetBalanceResponse.prototype.balance = 0;

        /**
         * Encodes the specified AccountGetBalanceResponse message. Does not implicitly {@link KosmosCustomerApp.AccountGetBalanceResponse.verify|verify} messages.
         * @function encode
         * @memberof KosmosCustomerApp.AccountGetBalanceResponse
         * @static
         * @param {KosmosCustomerApp.IAccountGetBalanceResponse} message AccountGetBalanceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AccountGetBalanceResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.balance != null && Object.hasOwnProperty.call(message, "balance"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.balance);
            return writer;
        };

        /**
         * Decodes an AccountGetBalanceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof KosmosCustomerApp.AccountGetBalanceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {KosmosCustomerApp.AccountGetBalanceResponse} AccountGetBalanceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AccountGetBalanceResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KosmosCustomerApp.AccountGetBalanceResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.balance = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return AccountGetBalanceResponse;
    })();

    KosmosCustomerApp.Account = (function() {

        /**
         * Properties of an Account.
         * @memberof KosmosCustomerApp
         * @interface IAccount
         * @property {string|null} [id] Account id
         * @property {string|null} [phone] Account phone
         * @property {string|null} [email] Account email
         * @property {string|null} [providerToken] Account providerToken
         * @property {string|null} [createdAt] Account createdAt
         * @property {string|null} [updatedAt] Account updatedAt
         * @property {string|null} [deletedAt] Account deletedAt
         * @property {boolean|null} [isDeleted] Account isDeleted
         * @property {boolean|null} [isVerified] Account isVerified
         * @property {string|null} [firstName] Account firstName
         * @property {string|null} [lastName] Account lastName
         */

        /**
         * Constructs a new Account.
         * @memberof KosmosCustomerApp
         * @classdesc Represents an Account.
         * @implements IAccount
         * @constructor
         * @param {KosmosCustomerApp.IAccount=} [properties] Properties to set
         */
        function Account(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Account id.
         * @member {string} id
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.id = "";

        /**
         * Account phone.
         * @member {string} phone
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.phone = "";

        /**
         * Account email.
         * @member {string} email
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.email = "";

        /**
         * Account providerToken.
         * @member {string} providerToken
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.providerToken = "";

        /**
         * Account createdAt.
         * @member {string} createdAt
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.createdAt = "";

        /**
         * Account updatedAt.
         * @member {string} updatedAt
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.updatedAt = "";

        /**
         * Account deletedAt.
         * @member {string} deletedAt
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.deletedAt = "";

        /**
         * Account isDeleted.
         * @member {boolean} isDeleted
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.isDeleted = false;

        /**
         * Account isVerified.
         * @member {boolean} isVerified
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.isVerified = false;

        /**
         * Account firstName.
         * @member {string} firstName
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.firstName = "";

        /**
         * Account lastName.
         * @member {string} lastName
         * @memberof KosmosCustomerApp.Account
         * @instance
         */
        Account.prototype.lastName = "";

        /**
         * Encodes the specified Account message. Does not implicitly {@link KosmosCustomerApp.Account.verify|verify} messages.
         * @function encode
         * @memberof KosmosCustomerApp.Account
         * @static
         * @param {KosmosCustomerApp.IAccount} message Account message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Account.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phone);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.providerToken != null && Object.hasOwnProperty.call(message, "providerToken"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.providerToken);
            if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.createdAt);
            if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.updatedAt);
            if (message.deletedAt != null && Object.hasOwnProperty.call(message, "deletedAt"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.deletedAt);
            if (message.isDeleted != null && Object.hasOwnProperty.call(message, "isDeleted"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isDeleted);
            if (message.isVerified != null && Object.hasOwnProperty.call(message, "isVerified"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isVerified);
            if (message.firstName != null && Object.hasOwnProperty.call(message, "firstName"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.firstName);
            if (message.lastName != null && Object.hasOwnProperty.call(message, "lastName"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.lastName);
            return writer;
        };

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @function decode
         * @memberof KosmosCustomerApp.Account
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {KosmosCustomerApp.Account} Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Account.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.KosmosCustomerApp.Account();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.phone = reader.string();
                    break;
                case 3:
                    message.email = reader.string();
                    break;
                case 4:
                    message.providerToken = reader.string();
                    break;
                case 5:
                    message.createdAt = reader.string();
                    break;
                case 6:
                    message.updatedAt = reader.string();
                    break;
                case 7:
                    message.deletedAt = reader.string();
                    break;
                case 8:
                    message.isDeleted = reader.bool();
                    break;
                case 9:
                    message.isVerified = reader.bool();
                    break;
                case 10:
                    message.firstName = reader.string();
                    break;
                case 11:
                    message.lastName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        return Account;
    })();

    return KosmosCustomerApp;
})();

module.exports = $root;
