
/* eslint-disable */
import { GrpcWebClientBase, GrpcWebClientBaseOptions, Metadata, MethodDescriptor, UnaryInterceptor } from 'grpc-web';
import { Test, Test2_Nested } from './codegen/test_pb';

type MethodOptions = {
  ignoreInterceptors?: boolean
}

export type GrpcServiceOptions = GrpcWebClientBaseOptions & {
  unaryInterceptors?: ArrayLike<UnaryInterceptor<any, any>>,
  fakeMethods?: boolean
}

export class GrpcService {
  private client: GrpcWebClientBase;
  private metadata: Metadata = {};
  private hostname: string;
  private options: GrpcServiceOptions;
  private interceptingPromise?: Promise<any>;
  public interceptors: { errors: ((e: any) => Promise<any>)[] } = {
    errors: []
  };
  constructor(hostname: string, options: GrpcServiceOptions = {}) {
    this.options = options;
    this.hostname = hostname;
    this.client = new GrpcWebClientBase(this.options);
  }
  private makeInterceptedUnaryCall = <Result, Params>(command: string, params: Params, methodDescriptor: MethodDescriptor<Params, Result>, options: MethodOptions = {}): Promise<Result> => {
    const unaryCallHandler = (): Promise<Result> => this.client.thenableCall(this.hostname + command, params, this.metadata, methodDescriptor)
    
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
          this.makeInterceptedUnaryCall<Result, Params>(command, params, methodDescriptor).then(resolve).catch(reject)
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
  public getMetadata = () => {
    return this.metadata;
  };

  public Test = {
    TestService: {
      methodDescriptor_GetOrder: new MethodDescriptor<Test.EmptyMessage, Test.EmptyMessage>(
        '/Test.TestService/GetOrder',
        'unary',
        Test.EmptyMessage,
        Test.EmptyMessage,
        (req: Test.EmptyMessage) => Test.EmptyMessage.encode(req).finish(),
        Test.EmptyMessage.decode,
      ),
      GetOrder: (params: Test.IEmptyMessage, options: MethodOptions = {}): Promise<Test.EmptyMessage> => {
        if (!!this.options.fakeMethods) return Promise.resolve(new Test.EmptyMessage());
        return this.makeInterceptedUnaryCall('/Test.TestService/GetOrder', params, this.Test.TestService.methodDescriptor_GetOrder, options);
      },
      methodDescriptor_RefreshToken: new MethodDescriptor<Test.EmptyMessage, Test.EmptyMessage>(
        '/Test.TestService/RefreshToken',
        'unary',
        Test.EmptyMessage,
        Test.EmptyMessage,
        (req: Test.EmptyMessage) => Test.EmptyMessage.encode(req).finish(),
        Test.EmptyMessage.decode,
      ),
      RefreshToken: (params: Test.IEmptyMessage, options: MethodOptions = {}): Promise<Test.EmptyMessage> => {
        if (!!this.options.fakeMethods) return Promise.resolve(new Test.EmptyMessage());
        return this.makeInterceptedUnaryCall('/Test.TestService/RefreshToken', params, this.Test.TestService.methodDescriptor_RefreshToken, options);
      },
    },
  };
  public Test2_Nested = {
    TestService2: {
      methodDescriptor_GetOrder: new MethodDescriptor<Test2_Nested.EmptyMessage, Test2_Nested.EmptyMessage>(
        '/Test2_Nested.TestService2/GetOrder',
        'unary',
        Test2_Nested.EmptyMessage,
        Test2_Nested.EmptyMessage,
        (req: Test2_Nested.EmptyMessage) => Test2_Nested.EmptyMessage.encode(req).finish(),
        Test2_Nested.EmptyMessage.decode,
      ),
      GetOrder: (params: Test2_Nested.IEmptyMessage, options: MethodOptions = {}): Promise<Test2_Nested.EmptyMessage> => {
        if (!!this.options.fakeMethods) return Promise.resolve(new Test2_Nested.EmptyMessage());
        return this.makeInterceptedUnaryCall('/Test2_Nested.TestService2/GetOrder', params, this.Test2_Nested.TestService2.methodDescriptor_GetOrder, options);
      },
    },
  };
};