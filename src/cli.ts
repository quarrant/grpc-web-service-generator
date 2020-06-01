#!/usr/bin/env node
import * as path from 'path';
import * as fs from 'fs';

import * as cliArgs from './cli-args';
import * as protobuf from './protobuf';
import * as jsgen from './jsgen';

const options: cliArgs.ArgsOptions = {
  protoFile: {
    key: '--proto-file',
    type: 'string',
  },
  outputDir: {
    key: '--output-dir',
    type: 'string',
  },
  skipGrpcService: {
    key: '--skip-grpc-service',
    type: true,
  },
};

async function cli() {
  try {
    const params = cliArgs.getArgs(process.argv, options);
    const rootProtoShortname = path.parse(params.protoFile).name;
    const codegenToken = 'codegen';

    /**
     * Загрузка json-схемы с корневого proto-файла. Это нужно для получения
     * списка всех используемых proto-файлов, а также для последующей
     * генерации клиентского GrpcService.
     */
    const packageDefinition = await protobuf.loadPackageDefinition(params.protoFile);

    /**
     * Каталог для сгенерированных protobufjs файлов вида app_pb.js и app_pb.d.ts
     * создается по пути, указанному в --output-dir, это может быть, как каталог
     * с серверным .proto файлов, так и клиентский каталог для последущей генерации
     * GrpcService.
     */
    const codegenDirectory = path.resolve(params.outputDir, codegenToken);
    if (!fs.existsSync(codegenDirectory)) {
      fs.mkdirSync(codegenDirectory, { recursive: true });
    }

    /**
     * Генерация пакетов, сервисов и их объектов с proto-файла,
     * указанного в --proto-file (включая импортированные proto-файлы),
     * в том числе методы кодирования/декодирования Buffer сообщений.
     */
    const staticObjectsSource = await protobuf.generateStaticObjects(packageDefinition.files);
    const staticObjectsFilename = path.resolve(codegenDirectory, `${rootProtoShortname}_pb.js`);
    fs.writeFileSync(staticObjectsFilename, staticObjectsSource);

    /**
     * Генерация описания типов для уже сгенерированных пакетов,
     * сервисов и объектов proto-файла.
     */
    const staticDeclarationsSource = await protobuf.generateStaticDeclarations(staticObjectsFilename);
    const staticDeclarationsFilename = path.resolve(codegenDirectory, `${rootProtoShortname}_pb.d.ts`);
    fs.writeFileSync(staticDeclarationsFilename, staticDeclarationsSource);

    /**
     * Генерация клиентсткого GrpcService. Является оберткой
     * над уже сгенерированными объектами grpc. Нужен для упрощения
     * работы с grpc, так как содержит созданные классы всех сервисов
     * на основе промисов.
     */
    if (!params.skipGrpcService) {
      const staticObjectsRelativeFilename = './' + codegenToken + `/${rootProtoShortname}_pb`;
      const grpcServiceSource = jsgen.createGrpcServiceSource(packageDefinition, staticObjectsRelativeFilename);

      const grpcServiceFilename = path.resolve(params.outputDir, 'GrpcService.ts');
      fs.writeFileSync(grpcServiceFilename, grpcServiceSource);
    }
  } catch (error) {
    console.error('grpcw-service-generator [error]:', error);
    process.exit(1);
  }
}

cli();
