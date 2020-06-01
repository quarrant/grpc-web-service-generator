# gRPC-Web Service Generator

Wrapper service over base grpc-web.

## Installation

```bash
$ yarn add grpc-web-service-generator
```

## For server-side

```bash
$ yarn grpc-web-service-generator --proto-file=./proto/rpc.proto --output-dir=./proto --skip-grpc-service
```

## For client-side

```bash
$ yarn grpc-web-service-generator --proto-file=./proto/rpc.proto --output-dir=./services/GrpcService
```

## Parameters

- `--proto-file` - path to main proto.
- `--output-dir` - dir path for generated code.
- `--skip-grpc-service` - disabling generation GrpcService (special for server-side)

## Usage (client-side)

```
// rpc.proto

syntax = "proto3";

package RpcPackage;

service TodoService {
  rpc AddTodo() returns () {}
}
```

```typescript
import { GrpcService } from './GrpcService';

const service = new GrpcService('http://localhost:8080');

service.TodoService.AddTodo({}).then(response => ...)
```
