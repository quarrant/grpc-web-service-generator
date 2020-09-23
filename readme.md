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

## Version <= 0.1.6

```typescript
import { GrpcService } from './GrpcService';

const grpcService = new GrpcService('http://localhost:8080');

grpcService.TodoService.AddTodo({}).then(response => ...)
```

## Version >= 0.1.7 (Support for multiple packages)

```typescript
import { GrpcService } from './GrpcService';

const grpcService = new GrpcService('http://localhost:8080');

grpcService.Test.TodoService.AddTodo({}).then(response => ...)
```

## Interceptors

```typescript
const updateGrpcServiceAccessToken = async () => {
  storedAccessToken = await grpcService.AuthService.GetAccessToken();
  console.log('updateGrpcServiceAccessToken', storedAccessToken);
  grpcService.setAccessToken(storedAccessToken);
};

grpcService.interceptors.errors.push((e) => {
  if (e === 'INVALID_TOKEN') {
    return updateGrpcServiceAccessToken();
  } else {
    return Promise.resolve();
  }
});
```
