import * as ts from 'typescript';
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

function addLeadingComment(statement: ts.Statement, comment: string) {
  return ts.addSyntheticLeadingComment(statement, ts.SyntaxKind.MultiLineCommentTrivia, comment, true);
}

export function createGrpcServiceSource(packageDefinition: PackageDefinition, staticObjectsRelativeFilename: string) {
  const [firstPackage] = packageDefinition.packages;

  let source = ts.createSourceFile('', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

  const importStatements = [
    ts.createImportDeclaration(
      undefined,
      undefined,
      ts.createImportClause(
        undefined,
        ts.createNamedImports([
          ts.createImportSpecifier(undefined, ts.createIdentifier('AbstractClientBase')),
          ts.createImportSpecifier(undefined, ts.createIdentifier('GrpcWebClientBase')),
          ts.createImportSpecifier(undefined, ts.createIdentifier('Metadata')),
          ts.createImportSpecifier(undefined, ts.createIdentifier('Error')),
          ts.createImportSpecifier(undefined, ts.createIdentifier('ClientReadableStream')),
        ]),
      ),
      ts.createLiteral('grpc-web'),
    ),

    ts.createImportDeclaration(
      undefined,
      undefined,
      ts.createImportClause(
        undefined,
        ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier(firstPackage.name))]),
      ),
      ts.createLiteral(staticObjectsRelativeFilename),
    ),
  ];

  const typeStatements = [
    ts.createTypeAliasDeclaration(
      undefined,
      undefined,
      ts.createIdentifier('Options'),
      undefined,
      ts.createTypeLiteralNode([
        ts.createPropertySignature(
          undefined,
          ts.createIdentifier('ignoreInterceptors'),
          ts.createToken(ts.SyntaxKind.QuestionToken),
          ts.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
          undefined,
        ),
      ]),
    ),

    ts.createTypeAliasDeclaration(
      undefined,
      undefined,
      ts.createIdentifier('InterceptorFunction'),
      undefined,
      ts.createFunctionTypeNode(
        [ts.createTypeParameterDeclaration(ts.createIdentifier('Value'))],
        [
          ts.createParameter(
            undefined,
            undefined,
            undefined,
            ts.createIdentifier('value'),
            undefined,
            ts.createTypeReferenceNode(ts.createIdentifier('Value'), undefined),
          ),
        ],
        ts.createTypeReferenceNode(ts.createIdentifier('Promise'), [
          ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        ]),
      ),
    ),

    ts.createTypeAliasDeclaration(
      undefined,
      undefined,
      ts.createIdentifier('InterceptorsObject'),
      undefined,
      ts.createTypeLiteralNode([
        ts.createPropertySignature(
          undefined,
          ts.createIdentifier('errors'),
          undefined,
          ts.createTypeReferenceNode(ts.createIdentifier('InterceptorFunction[]'), undefined),
          ts.createObjectLiteral([ts.createPropertyAssignment(ts.createIdentifier('errors'), ts.createArrayLiteral())]),
        ),
      ]),
    ),
  ];

  const classPropertyStatements = [
    ts.createProperty(
      undefined,
      [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
      ts.createIdentifier('client'),
      undefined,
      ts.createTypeReferenceNode(ts.createIdentifier('GrpcWebClientBase'), undefined),
      undefined,
    ),
    ts.createProperty(
      undefined,
      [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
      ts.createIdentifier('metadata'),
      undefined,
      ts.createTypeReferenceNode(ts.createIdentifier('Metadata'), undefined),
      ts.createObjectLiteral(),
    ),
    ts.createProperty(
      undefined,
      [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
      ts.createIdentifier('hostname'),
      undefined,
      ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
      undefined,
    ),
    ts.createProperty(
      undefined,
      [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
      ts.createIdentifier('interceptingPromise'),
      ts.createToken(ts.SyntaxKind.QuestionToken),
      ts.createTypeReferenceNode(ts.createIdentifier('Promise'), [ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)]),
      undefined,
    ),
    ts.createProperty(
      undefined,
      [ts.createModifier(ts.SyntaxKind.PrivateKeyword)],
      ts.createIdentifier('interceptors'),
      undefined,
      ts.createTypeReferenceNode(ts.createIdentifier('InterceptorsObject'), undefined),
      ts.createObjectLiteral([ts.createPropertyAssignment(ts.createIdentifier('errors'), ts.createArrayLiteral())]),
    ),
  ];

  source = ts.updateSourceFileNode(source, [
    ...importStatements,
    ...typeStatements,

    ts.createClassDeclaration(
      undefined,
      [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
      ts.createIdentifier('GrpcService'),
      undefined,
      undefined,
      [
        ...classPropertyStatements,
        ts.createConstructor(
          undefined,
          undefined,
          [
            ts.createParameter(
              undefined,
              undefined,
              undefined,
              ts.createIdentifier('hostname'),
              undefined,
              ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
              undefined,
            ),
          ],
          ts.createBlock([
            // ts.createExpressionStatement(
            // ts.createPropertyAssignment(
            //   ts.createIdentifier('hostname'),
            //   ts.createIdentifier("")
            // )
            // )
          ]),
        ),
      ],
    ),
  ]);

  addLeadingComment(source.statements[0], ' eslint-disable ');

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return printer.printFile(source);
  //   return `
  // /* eslint-disable */
  // import { AbstractClientBase, GrpcWebClientBase, Metadata, Error, ClientReadableStream } from 'grpc-web';
  // import { ${firstPackage.name} } from '${staticObjectsRelativeFilename}';

  // type Options = {
  //   ignoreInterceptors?: boolean
  // }

  // export class GrpcService {
  //   private client: GrpcWebClientBase;
  //   private metadata: Metadata = {};
  //   private hostname: string;
  //   private interceptingPromise?: Promise<any>;
  //   public interceptors: { errors: ((e: any) => Promise<any>)[] } = {
  //     errors: []
  //   };
  //   constructor(hostname: string) {
  //     this.client = new GrpcWebClientBase({});
  //     this.hostname = hostname;
  //   }
  //   private makeInterceptedUnaryCall = <Result, Params, MethodInfo>(command: string, params: Params, methodInfo: MethodInfo, options: Options = {}): Promise<Result> => {
  //     const unaryCallHandler = (): Promise<Result> => this.client.unaryCall(command, params, this.metadata, methodInfo)

  //     if (options.ignoreInterceptors) {
  //       return unaryCallHandler()
  //     }

  //     if (this.interceptingPromise) {
  //       return this.interceptingPromise.then(() => {
  //         this.interceptingPromise = undefined;
  //         return unaryCallHandler()
  //       });
  //     }

  //     return new Promise((resolve, reject) => {
  //       unaryCallHandler().then(resolve).catch(e => {
  //         this.chainingInterceptors(this.interceptors.errors, e).then(() => {
  //           this.makeInterceptedUnaryCall<Result, Params, MethodInfo>(command, params, methodInfo).then(resolve).catch(reject)
  //         }).catch(reject)
  //       });
  //     });
  //   }
  //   private chainingInterceptors = (interceptors: ((e: any) => Promise<any>)[], value: any) => {
  //     this.interceptingPromise = interceptors.reduce(
  //       (chain, nextInterceptor) => chain.then(nextInterceptor),
  //       Promise.resolve(value)
  //     );
  //     return this.interceptingPromise;
  //   }
  //   public setMetadata = (metadata: Metadata = {}) => {
  //     this.metadata = Object.assign({}, this.metadata, metadata);
  //   };
  //   ${firstPackage.services
  //     .map((service) => createServiceSource(service, firstPackage.name))
  //     .join(`\n${getIndentSpaces(1)}`)}
  // };`;
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
    `${method.name}: (params: ${packageName}.I${method.requestType}, options: Options = {}): Promise<${packageName}.${method.responseType}> => {`,
    '  const methodInfo = new AbstractClientBase.MethodInfo(',
    `    ${packageName}.${method.responseType},`,
    `    (request: ${packageName}.${method.requestType}) => ${packageName}.${method.requestType}.encode(request).finish(),`,
    `    ${packageName}.${method.responseType}.decode`,
    '  );',
    `  return this.makeInterceptedUnaryCall(this.hostname + '/${packageName}.${serviceName}/${method.name}', params, methodInfo, options);`,
    '},',
  ].join(`\n${getIndentSpaces(2)}`);
}
