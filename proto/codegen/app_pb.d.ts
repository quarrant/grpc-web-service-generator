import * as $protobuf from "protobufjs";
/** Namespace KosmosCustomerApp. */
export namespace KosmosCustomerApp {

    /** Represents an AccountService */
    class AccountService extends $protobuf.rpc.Service {

        /**
         * Constructs a new AccountService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Calls GetInfo.
         * @param request AccountGetInfoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and AccountGetInfoResponse
         */
        public getInfo(request: KosmosCustomerApp.IAccountGetInfoRequest, callback: KosmosCustomerApp.AccountService.GetInfoCallback): void;

        /**
         * Calls GetInfo.
         * @param request AccountGetInfoRequest message or plain object
         * @returns Promise
         */
        public getInfo(request: KosmosCustomerApp.IAccountGetInfoRequest): Promise<KosmosCustomerApp.AccountGetInfoResponse>;

        /**
         * Calls GetBalance.
         * @param request AccountGetBalanceRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and AccountGetBalanceResponse
         */
        public getBalance(request: KosmosCustomerApp.IAccountGetBalanceRequest, callback: KosmosCustomerApp.AccountService.GetBalanceCallback): void;

        /**
         * Calls GetBalance.
         * @param request AccountGetBalanceRequest message or plain object
         * @returns Promise
         */
        public getBalance(request: KosmosCustomerApp.IAccountGetBalanceRequest): Promise<KosmosCustomerApp.AccountGetBalanceResponse>;
    }

    namespace AccountService {

        /**
         * Callback as used by {@link KosmosCustomerApp.AccountService#getInfo}.
         * @param error Error, if any
         * @param [response] AccountGetInfoResponse
         */
        type GetInfoCallback = (error: (Error|null), response?: KosmosCustomerApp.AccountGetInfoResponse) => void;

        /**
         * Callback as used by {@link KosmosCustomerApp.AccountService#getBalance}.
         * @param error Error, if any
         * @param [response] AccountGetBalanceResponse
         */
        type GetBalanceCallback = (error: (Error|null), response?: KosmosCustomerApp.AccountGetBalanceResponse) => void;
    }

    /** Properties of an AccountGetInfoRequest. */
    interface IAccountGetInfoRequest {
    }

    /** Represents an AccountGetInfoRequest. */
    class AccountGetInfoRequest implements IAccountGetInfoRequest {

        /**
         * Constructs a new AccountGetInfoRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: KosmosCustomerApp.IAccountGetInfoRequest);

        /**
         * Encodes the specified AccountGetInfoRequest message. Does not implicitly {@link KosmosCustomerApp.AccountGetInfoRequest.verify|verify} messages.
         * @param message AccountGetInfoRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: KosmosCustomerApp.IAccountGetInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountGetInfoRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGetInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KosmosCustomerApp.AccountGetInfoRequest;
    }

    /** Properties of an AccountGetInfoResponse. */
    interface IAccountGetInfoResponse {

        /** AccountGetInfoResponse data */
        data?: (KosmosCustomerApp.IAccount|null);
    }

    /** Represents an AccountGetInfoResponse. */
    class AccountGetInfoResponse implements IAccountGetInfoResponse {

        /**
         * Constructs a new AccountGetInfoResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: KosmosCustomerApp.IAccountGetInfoResponse);

        /** AccountGetInfoResponse data. */
        public data?: (KosmosCustomerApp.IAccount|null);

        /**
         * Encodes the specified AccountGetInfoResponse message. Does not implicitly {@link KosmosCustomerApp.AccountGetInfoResponse.verify|verify} messages.
         * @param message AccountGetInfoResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: KosmosCustomerApp.IAccountGetInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountGetInfoResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGetInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KosmosCustomerApp.AccountGetInfoResponse;
    }

    /** Properties of an AccountGetBalanceRequest. */
    interface IAccountGetBalanceRequest {

        /** AccountGetBalanceRequest partnerId */
        partnerId?: (string|null);
    }

    /** Represents an AccountGetBalanceRequest. */
    class AccountGetBalanceRequest implements IAccountGetBalanceRequest {

        /**
         * Constructs a new AccountGetBalanceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: KosmosCustomerApp.IAccountGetBalanceRequest);

        /** AccountGetBalanceRequest partnerId. */
        public partnerId: string;

        /**
         * Encodes the specified AccountGetBalanceRequest message. Does not implicitly {@link KosmosCustomerApp.AccountGetBalanceRequest.verify|verify} messages.
         * @param message AccountGetBalanceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: KosmosCustomerApp.IAccountGetBalanceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountGetBalanceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGetBalanceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KosmosCustomerApp.AccountGetBalanceRequest;
    }

    /** Properties of an AccountGetBalanceResponse. */
    interface IAccountGetBalanceResponse {

        /** AccountGetBalanceResponse balance */
        balance?: (number|null);
    }

    /** Represents an AccountGetBalanceResponse. */
    class AccountGetBalanceResponse implements IAccountGetBalanceResponse {

        /**
         * Constructs a new AccountGetBalanceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: KosmosCustomerApp.IAccountGetBalanceResponse);

        /** AccountGetBalanceResponse balance. */
        public balance: number;

        /**
         * Encodes the specified AccountGetBalanceResponse message. Does not implicitly {@link KosmosCustomerApp.AccountGetBalanceResponse.verify|verify} messages.
         * @param message AccountGetBalanceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: KosmosCustomerApp.IAccountGetBalanceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccountGetBalanceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AccountGetBalanceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KosmosCustomerApp.AccountGetBalanceResponse;
    }

    /** Properties of an Account. */
    interface IAccount {

        /** Account id */
        id?: (string|null);

        /** Account phone */
        phone?: (string|null);

        /** Account email */
        email?: (string|null);

        /** Account providerToken */
        providerToken?: (string|null);

        /** Account createdAt */
        createdAt?: (string|null);

        /** Account updatedAt */
        updatedAt?: (string|null);

        /** Account deletedAt */
        deletedAt?: (string|null);

        /** Account isDeleted */
        isDeleted?: (boolean|null);

        /** Account isVerified */
        isVerified?: (boolean|null);

        /** Account firstName */
        firstName?: (string|null);

        /** Account lastName */
        lastName?: (string|null);
    }

    /** Represents an Account. */
    class Account implements IAccount {

        /**
         * Constructs a new Account.
         * @param [properties] Properties to set
         */
        constructor(properties?: KosmosCustomerApp.IAccount);

        /** Account id. */
        public id: string;

        /** Account phone. */
        public phone: string;

        /** Account email. */
        public email: string;

        /** Account providerToken. */
        public providerToken: string;

        /** Account createdAt. */
        public createdAt: string;

        /** Account updatedAt. */
        public updatedAt: string;

        /** Account deletedAt. */
        public deletedAt: string;

        /** Account isDeleted. */
        public isDeleted: boolean;

        /** Account isVerified. */
        public isVerified: boolean;

        /** Account firstName. */
        public firstName: string;

        /** Account lastName. */
        public lastName: string;

        /**
         * Encodes the specified Account message. Does not implicitly {@link KosmosCustomerApp.Account.verify|verify} messages.
         * @param message Account message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: KosmosCustomerApp.IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Account message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Account
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KosmosCustomerApp.Account;
    }
}
