import * as $protobuf from "protobufjs";
/** Namespace Test. */
export namespace Test {

    /** Represents a TestService */
    class TestService extends $protobuf.rpc.Service {

        /**
         * Constructs a new TestService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls RefreshToken.
         * @param request EmptyMessage message or plain object
         * @param callback Node-style callback called with the error, if any, and EmptyMessage
         */
        public refreshToken(request: Test.IEmptyMessage, callback: Test.TestService.RefreshTokenCallback): void;

        /**
         * Calls RefreshToken.
         * @param request EmptyMessage message or plain object
         * @returns Promise
         */
        public refreshToken(request: Test.IEmptyMessage): Promise<Test.EmptyMessage>;

        /**
         * Calls GetOrder.
         * @param request EmptyMessage message or plain object
         * @param callback Node-style callback called with the error, if any, and EmptyMessage
         */
        public getOrder(request: Test.IEmptyMessage, callback: Test.TestService.GetOrderCallback): void;

        /**
         * Calls GetOrder.
         * @param request EmptyMessage message or plain object
         * @returns Promise
         */
        public getOrder(request: Test.IEmptyMessage): Promise<Test.EmptyMessage>;
    }

    namespace TestService {

        /**
         * Callback as used by {@link Test.TestService#refreshToken}.
         * @param error Error, if any
         * @param [response] EmptyMessage
         */
        type RefreshTokenCallback = (error: (Error|null), response?: Test.EmptyMessage) => void;

        /**
         * Callback as used by {@link Test.TestService#getOrder}.
         * @param error Error, if any
         * @param [response] EmptyMessage
         */
        type GetOrderCallback = (error: (Error|null), response?: Test.EmptyMessage) => void;
    }

    /** Properties of an EmptyMessage. */
    interface IEmptyMessage {
    }

    /** Represents an EmptyMessage. */
    class EmptyMessage implements IEmptyMessage {

        /**
         * Constructs a new EmptyMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Test.IEmptyMessage);

        /**
         * Encodes the specified EmptyMessage message. Does not implicitly {@link Test.EmptyMessage.verify|verify} messages.
         * @param message EmptyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Test.IEmptyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EmptyMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EmptyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Test.EmptyMessage;
    }
}

/** Namespace Test2_Nested. */
export namespace Test2_Nested {

    /** Represents a TestService2 */
    class TestService2 extends $protobuf.rpc.Service {

        /**
         * Constructs a new TestService2 service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls GetOrder.
         * @param request EmptyMessage message or plain object
         * @param callback Node-style callback called with the error, if any, and EmptyMessage
         */
        public getOrder(request: Test2_Nested.IEmptyMessage, callback: Test2_Nested.TestService2.GetOrderCallback): void;

        /**
         * Calls GetOrder.
         * @param request EmptyMessage message or plain object
         * @returns Promise
         */
        public getOrder(request: Test2_Nested.IEmptyMessage): Promise<Test2_Nested.EmptyMessage>;
    }

    namespace TestService2 {

        /**
         * Callback as used by {@link Test2_Nested.TestService2#getOrder}.
         * @param error Error, if any
         * @param [response] EmptyMessage
         */
        type GetOrderCallback = (error: (Error|null), response?: Test2_Nested.EmptyMessage) => void;
    }

    /** Properties of an EmptyMessage. */
    interface IEmptyMessage {
    }

    /** Represents an EmptyMessage. */
    class EmptyMessage implements IEmptyMessage {

        /**
         * Constructs a new EmptyMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Test2_Nested.IEmptyMessage);

        /**
         * Encodes the specified EmptyMessage message. Does not implicitly {@link Test2_Nested.EmptyMessage.verify|verify} messages.
         * @param message EmptyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Test2_Nested.IEmptyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EmptyMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EmptyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Test2_Nested.EmptyMessage;
    }
}
