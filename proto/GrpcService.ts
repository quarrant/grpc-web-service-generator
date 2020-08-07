/* eslint-disable */
import { AbstractClientBase, GrpcWebClientBase, Metadata, Error, ClientReadableStream } from "grpc-web";
import { Test } from "./codegen/test_pb";
type Options = {
    ignoreInterceptors?: boolean;
};
type InterceptorFunction = <Value>(value: Value) => Promise<any>;
type InterceptorsObject = {
    errors: InterceptorFunction[];
};
export class GrpcService {
    private client: GrpcWebClientBase;
    private metadata: Metadata = {};
    private hostname: string;
    private interceptingPromise?: Promise<any>;
    private interceptors: InterceptorsObject = { errors: [] };
    constructor(hostname: string) { }
}
