import { getObjectKeys, isBoolean } from './utils';

export type ArgsOptions = {
  protoFile: {
    key: '--proto-file';
    type: string;
  };
  outputDir: {
    key: '--output-dir';
    type: string;
  };
  skipGrpcService: {
    key: '--skip-grpc-service';
    type: boolean;
  };
};

export function getArgs(argv: string[], options: ArgsOptions) {
  return getObjectKeys(options).reduce(
    (args, option) => {
      const arg = argv.find((a) => a.startsWith(options[option].key)) || '';
      if (arg) {
        const value = arg.slice(`${options[option].key}=`.length);
        return { ...args, [option]: isBoolean(options[option].type) ? true : value };
      }
      return { ...args, [option]: isBoolean(options[option].type) ? false : null };
    },
    {} as {
      [K in keyof ArgsOptions]: ArgsOptions[K]['type'];
    },
  );
}
