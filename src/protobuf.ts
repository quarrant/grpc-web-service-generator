import protobufjs, { ReflectionObject, IService, NamespaceBase } from 'protobufjs/minimal';
import protobufjsCli from 'protobufjs/cli';

import * as utils from './utils';

export type ServiceMethod = {
  name: string;
  requestType: string;
  responseType: string;
  requestStream?: boolean;
  responseStream?: boolean;
};

export type PackageService = {
  name: string;
  methods: ServiceMethod[];
};

export type Package = {
  name: string;
  services: PackageService[];
};

export type PackageDefinition = {
  files: string[];
  packages: Package[];
};

function hasNested(target: ReflectionObject): target is ReflectionObject & { nested: Record<string, IService> } {
  return !!Object.keys(target).find((key) => key === 'nested');
}

function mapPackageServices(packageServices: Record<string, IService>) {
  return utils.getObjectKeys(packageServices).reduce((services, key) => {
    if (packageServices[key].methods) {
      services.push({
        name: String(key),
        methods: mapServiceMethods(packageServices[key].methods),
      });
    }

    return services;
  }, [] as PackageService[]).sort((a, b) => strcmp(a.name, b.name));
}

function mapServiceMethods(methods: IService['methods']) {
  return utils.getObjectKeys(methods).map((method) => ({
    name: String(method),
    requestType: methods[method].requestType,
    responseType: methods[method].responseType,
    requestStream: methods[method].requestStream,
    responseStream: methods[method].responseStream,
  })).sort((a, b) => strcmp(a.name, b.name));
}

export function loadPackageDefinition(protoFile: string): Promise<PackageDefinition> {
  return new Promise((resolve, reject) => {
    protobufjs.load(protoFile, (error, output) => {
      if (output && !error) {
        const packageDefinition: PackageDefinition = {
          files: output.files,
          packages: output.nestedArray.map((reflectionObject) => {
            const packageNested = hasNested(reflectionObject) ? reflectionObject.nested : {};
            return {
              name: reflectionObject.name,
              services: mapPackageServices(packageNested),
            };
          }),
        };

        resolve(packageDefinition);
      }

      reject(error);
    });
  });
}

function strcmp(a: string, b: string): number {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
}

export function generateStaticObjects(protoFiles: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    protobufjsCli.pbjs.main(
      [
        '--target',
        'static-module',
        '--wrap',
        'commonjs',
        '--sparse',
        '--no-create',
        '--no-verify',
        '--no-convert',
        '--no-delimited',
        '--keep-case',
        ...protoFiles,
      ],
      (error, output) => {
        if (error || !output) {
          reject(error || new Error('Empty output'));
          return;
        }
        resolve(output);
      },
    );
  });
}

export function generateStaticDeclarations(staticObjectsFile: string): Promise<string> {
  return new Promise((resolve, reject) => {
    protobufjsCli.pbts.main([staticObjectsFile], (error, output) => {
      if (error || !output) {
        reject(error || new Error('Empty output'));
        return;
      }
      resolve(output);
    });
  });
}
