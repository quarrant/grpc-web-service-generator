import { PackageDefinition, Package, PackageService, ServiceMethod } from './protobuf';

export function getIndentSpaces(level: number = 0) {
  return new Array(2 * level).fill(' ').join('');
}

export function createNamedImports(names: string[], from: string) {
  return `import { ${names.join(', ')} } from '${from}';`;
}

export function createSource(statements: string[]) {
  return statements.join('\n');
}

export function createGrpcServiceSource(packageDefinition: PackageDefinition, staticObjectsRelativeFilename: string) {
  const packagesNamesArray = packageDefinition.packages.map((_) => _.name);

  return `
/* eslint-disable */
import { GrpcWebClientBase, GrpcWebClientBaseOptions, Metadata, MethodDescriptor, UnaryInterceptor } from 'grpc-web';
import { ${packagesNamesArray.join(', ')} } from '${staticObjectsRelativeFilename}';

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

  ${packageDefinition.packages.map(createPackageItemSource).join(`\n${getIndentSpaces(1)}`)}
};`;
}

function createPackageItemSource(packageItem: Package) {
  return [
    `public ${packageItem.name} = {`,
    packageItem.services
      .map((service) => createServiceSource(service, packageItem.name))
      .join(`\n${getIndentSpaces(3)}`),
    '};',
  ].join(`\n${getIndentSpaces(1)}`);
}

export function createServiceSource(service: PackageService, packageName: string) {
  return [
    `  ${service.name}: {`,
    `  ${service.methods
      .map((method) => createServiceMethodSource(method, service.name, packageName))
      .join(`\n${getIndentSpaces(3)}`)}`,
    '},',
  ].join(`\n${getIndentSpaces(2)}`);
}

function createServerStreamingFunction(packageName: string, serviceName: string, methodName: string) {
  return `return this.client.serverStreaming(this.hostname + '/${packageName}.${serviceName}/${methodName}', params, this.metadata, methodInfo)`;
}

export function createServiceMethodSource(method: ServiceMethod, serviceName: string, packageName: string) {
  const ret: string[] = [];

  const methodDescriptorPropName = `methodDescriptor_${method.name}`;
  ret.push(
    `${methodDescriptorPropName}: new MethodDescriptor<${packageName}.${method.requestType}, ${packageName}.${method.responseType}>(`,
    `  '/${packageName}.${serviceName}/${method.name}',`,
    `  ${method.responseStream ? `'server_streaming'` : `'unary'`},`,
    `  ${packageName}.${method.requestType},`,
    `  ${packageName}.${method.responseType},`,
    `  (req: ${packageName}.${method.requestType}) => ${packageName}.${method.requestType}.encode(req).finish(),`,
    `  ${packageName}.${method.responseType}.decode,`,
    `),`
  );

  if (method.responseStream) {
    ret.push(
      `${method.name}: (params: ${packageName}.I${method.requestType}): ClientReadableStream<${packageName}.${method.responseType}> => {`,
      `  return this.client.serverStreaming(this.hostname + '/${packageName}.${serviceName}/${method.name}', params, this.metadata, this.${packageName}.${serviceName}.${methodDescriptorPropName})`,
      '},');
  } else {
    ret.push(
      `${method.name}: (params: ${packageName}.I${method.requestType}, options: MethodOptions = {}): Promise<${packageName}.${method.responseType}> => {`,
      `  if (!!this.options.fakeMethods) return Promise.resolve(new ${packageName}.${method.responseType}());`,
      `  return this.makeInterceptedUnaryCall('/${packageName}.${serviceName}/${method.name}', params, this.${packageName}.${serviceName}.${methodDescriptorPropName}, options);`,
      '},');
  }
  return ret.join(`\n${getIndentSpaces(3)}`);
}
