import { PackageDefinition, PackageService, ServiceMethod } from './protobuf';

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
  const [firstPackage] = packageDefinition.packages;
  return `
/* eslint-disable */
import { AbstractClientBase, GrpcWebClientBase, Metadata, Error, ClientReadableStream } from 'grpc-web';
import { ${firstPackage.name} } from '${staticObjectsRelativeFilename}';

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
  private makeInterceptedUnaryCall = <Result, Params, MethodInfo>(command: string, params: Params, methodInfo: MethodInfo): Promise<Result> => {
    if (this.interceptingPromise) {
      return this.interceptingPromise.then(() => this.client.unaryCall(command, params, this.metadata, methodInfo));
    }
    return this.client.unaryCall<Params, Result>(command, params, this.metadata, methodInfo).catch(e => {
      this.chainingInterceptors(this.interceptors.errors, e)
      throw e
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
  ${firstPackage.services
    .map((service) => createServiceSource(service, firstPackage.name))
    .join(`\n${getIndentSpaces(1)}`)}
};`;
}

export function createServiceSource(service: PackageService, packageName: string) {
  return [
    `public ${service.name} = {`,
    `  ${service.methods
      .map((method) => createServiceMethodSource(method, service.name, packageName))
      .join(`\n${getIndentSpaces(2)}`)}`,
    '};',
  ].join(`\n${getIndentSpaces(1)}`);
}

function createServerStreamingFunction(packageName: string, serviceName: string, methodName: string) {
  return `return this.client.serverStreaming(this.hostname + '/${packageName}.${serviceName}/${methodName}', params, this.metadata, methodInfo)`;
}

export function createServiceMethodSource(method: ServiceMethod, serviceName: string, packageName: string) {
  if (method.responseStream) {
    return [
      `${method.name}: (params: ${packageName}.I${method.requestType}): ClientReadableStream<${packageName}.${method.responseType}> => {`,
      '  const methodInfo = new AbstractClientBase.MethodInfo(',
      `    ${packageName}.${method.responseType},`,
      `    (request: ${packageName}.${method.requestType}) => ${packageName}.${method.requestType}.encode(request).finish(),`,
      `    ${packageName}.${method.responseType}.decode`,
      '  );',
      `  ${createServerStreamingFunction(packageName, serviceName, method.name)}`,
      '},',
    ].join(`\n${getIndentSpaces(2)}`);
  }

  return [
    `${method.name}: (params: ${packageName}.I${method.requestType}): Promise<${packageName}.${method.responseType}> => {`,
    '  const methodInfo = new AbstractClientBase.MethodInfo(',
    `    ${packageName}.${method.responseType},`,
    `    (request: ${packageName}.${method.requestType}) => ${packageName}.${method.requestType}.encode(request).finish(),`,
    `    ${packageName}.${method.responseType}.decode`,
    '  );',
    `  return this.makeInterceptedUnaryCall(this.hostname + '/${packageName}.${serviceName}/${method.name}', params, methodInfo);`,
    '},',
  ].join(`\n${getIndentSpaces(2)}`);
}
