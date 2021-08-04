
/* eslint-disable */
import { AbstractClientBase, GrpcWebClientBase, Metadata, Error, ClientReadableStream } from 'grpc-web';
import { Test, Test2_Nested } from './codegen/test_pb';

type Options = {
  ignoreInterceptors?: boolean
}

export class GrpcService {
  private client: GrpcWebClientBase;
  private metadata: Metadata = {};
  private hostname: string;
  private interceptingPromise?: Promise<any>;
  public interceptors: { errors: ((e: any) => Promise<any>)[] } = {
    errors: []
  };
  constructor(hostname: string) {
    this.client = new GrpcWebClientBase({});
    this.hostname = hostname;
  }
  private makeInterceptedUnaryCall = <Result, Params, MethodInfo>(command: string, params: Params, methodInfo: MethodInfo, options: Options = {}): Promise<Result> => {
    const unaryCallHandler = (): Promise<Result> => this.client.unaryCall(command, params, this.metadata, methodInfo)
    
    if (options.ignoreInterceptors) {
      return unaryCallHandler()
    }
    
    if (this.interceptingPromise) {
      return this.interceptingPromise.then(() => {
        this.interceptingPromise = undefined;
        return unaryCallHandler()
      });
    }
    
    return new Promise((resolve, reject) => {
      unaryCallHandler().then(resolve).catch(e => {
        this.chainingInterceptors(this.interceptors.errors, e).then(() => {
          this.makeInterceptedUnaryCall<Result, Params, MethodInfo>(command, params, methodInfo).then(resolve).catch(reject)
        }).catch(reject)
      });
    });
  }
  private chainingInterceptors = (interceptors: ((e: any) => Promise<any>)[], value: any) => {
    this.interceptingPromise = interceptors.reduce(
      (chain, nextInterceptor) => chain.then(nextInterceptor),
      Promise.resolve(value)
    );
    return this.interceptingPromise;
  }
  public setMetadata = (metadata: Metadata = {}) => {
    this.metadata = Object.assign({}, this.metadata, metadata);
  };

  public Test = {
    TestService: {
      GetOrder: (params: Test.IEmptyMessage, options: Options = {}): Promise<Test.EmptyMessage> => {
        const methodInfo = new AbstractClientBase.MethodInfo(
          Test.EmptyMessage,
          (request: Test.EmptyMessage) => Test.EmptyMessage.encode(request).finish(),
          Test.EmptyMessage.decode
        );
        return this.makeInterceptedUnaryCall(this.hostname + '/Test.TestService/GetOrder', params, methodInfo, options);
      },
      RefreshToken: (params: Test.IEmptyMessage, options: Options = {}): Promise<Test.EmptyMessage> => {
        const methodInfo = new AbstractClientBase.MethodInfo(
          Test.EmptyMessage,
          (request: Test.EmptyMessage) => Test.EmptyMessage.encode(request).finish(),
          Test.EmptyMessage.decode
        );
        return this.makeInterceptedUnaryCall(this.hostname + '/Test.TestService/RefreshToken', params, methodInfo, options);
      },
    },
  };
  public Test2_Nested = {
    TestService2: {
      GetOrder: (params: Test2_Nested.IEmptyMessage, options: Options = {}): Promise<Test2_Nested.EmptyMessage> => {
        const methodInfo = new AbstractClientBase.MethodInfo(
          Test2_Nested.EmptyMessage,
          (request: Test2_Nested.EmptyMessage) => Test2_Nested.EmptyMessage.encode(request).finish(),
          Test2_Nested.EmptyMessage.decode
        );
        return this.makeInterceptedUnaryCall(this.hostname + '/Test2_Nested.TestService2/GetOrder', params, methodInfo, options);
      },
    },
  };
};