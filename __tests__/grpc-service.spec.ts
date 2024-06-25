import { GrpcService } from '../proto/GrpcService';
import { Test, Test2_Nested } from '../proto/codegen/test_pb';

jest.mock('grpc-web');

describe('test genearted GrpcService', () => {
  let grpcService: GrpcService;

  beforeEach(() => {
    grpcService = new GrpcService('http://test.com');
    grpcService._client = {
      thenableCall: jest.fn().mockResolvedValue(undefined),
      rpcCall: jest.fn().mockResolvedValue(undefined),
      serverStreaming: jest.fn().mockResolvedValue(undefined),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call GetOrder successfully', async () => {
    await grpcService.Test.TestService.GetOrder(Test.EmptyMessage);
    expect(grpcService._client.thenableCall).toHaveBeenCalledTimes(1);
  });

  it('should call GetOrder successfully and not call interceptor error', async () => {
    const interceptor = jest.fn();
    grpcService.interceptors.errors.push(interceptor);

    await grpcService.Test.TestService.GetOrder(Test.EmptyMessage);
    expect(grpcService._client.thenableCall).toHaveBeenCalledTimes(1);
    expect(interceptor).not.toHaveBeenCalled();
  });

  it('should call GetOrder failure, call interceptor with success and try another one call GetOrder', async () => {
    const spyerInterceptor = jest.fn().mockImplementation(() => {
      grpcService.setMetadata({
        token: '123',
      });

      return Promise.resolve('SUCCESS_INTERCEPTOR_CALL');
    });

    grpcService.interceptors.errors.push(spyerInterceptor);

    const transportCall = jest.spyOn(grpcService._client, 'thenableCall');
    transportCall.mockResolvedValue('SUCCESS_TRANSPORT_CALL').mockRejectedValueOnce('ERROR_TRANSPORT_CALL');

    await grpcService.Test.TestService.GetOrder(Test.EmptyMessage);

    expect(transportCall).toHaveBeenCalledTimes(2);
    expect(spyerInterceptor).toHaveBeenCalledTimes(1);

    expect(transportCall).toHaveBeenNthCalledWith(1, expect.any(String), expect.any(Function), {}, expect.any(Object));

    await expect(transportCall.mock.results[0].value).rejects.toBe('ERROR_TRANSPORT_CALL');

    expect(spyerInterceptor).toHaveBeenCalledWith('ERROR_TRANSPORT_CALL');
    expect(spyerInterceptor.mock.results[0].value).resolves.toBe('SUCCESS_INTERCEPTOR_CALL');

    expect(transportCall).toHaveBeenNthCalledWith(
      2,
      expect.any(String),
      expect.any(Function),
      {
        token: '123',
      },
      expect.any(Object),
    );

    await expect(transportCall.mock.results[1].value).resolves.toBe('SUCCESS_TRANSPORT_CALL');
  });

  it('should reject GetOrder call if interceptor rejected and do not call GetOrder another one', async () => {
    const spyerInterceptor = jest.fn().mockRejectedValue('ERROR_INTERCEPTOR_CALL');

    grpcService.interceptors.errors.push(spyerInterceptor);

    const spyerThenableCall = jest.spyOn(grpcService._client, 'thenableCall').mockRejectedValue('ERROR_TRANSPORT_CALL');

    await expect(grpcService.Test.TestService.GetOrder(Test.EmptyMessage)).rejects.toEqual('ERROR_INTERCEPTOR_CALL');

    expect(spyerThenableCall).toHaveBeenCalledTimes(1);
    expect(spyerInterceptor).toHaveBeenCalledTimes(1);
  });

  it('should try call GetOrder another one if it fails but interceptor success', async () => {
    const spyerInterceptor = jest.fn().mockResolvedValue('SUCCESS_INTERCEPTOR_CALL');

    grpcService.interceptors.errors.push(spyerInterceptor);

    const spyerThenableCall = jest.spyOn(grpcService._client, 'thenableCall').mockRejectedValue('ERROR_TRANSPORT_CALL');

    await expect(grpcService.Test.TestService.GetOrder(Test.EmptyMessage)).rejects.toEqual('ERROR_TRANSPORT_CALL');

    expect(spyerThenableCall).toHaveBeenCalledTimes(2);
    expect(spyerInterceptor).toHaveBeenCalledTimes(1);
  });

  // In current implementation it doesn't work
  it('should call sequence of GetOrder independently if interceptor rejected. First call GetOrder rejected, second call GetOrder success', async () => {
    const spyerInterceptor = jest.fn().mockRejectedValue('ERROR_INTERCEPTOR_CALL');

    grpcService.interceptors.errors.push(spyerInterceptor);

    const spyerThenableCall = jest.spyOn(grpcService._client, 'thenableCall').mockRejectedValue('ERROR_TRANSPORT_CALL');

    await expect(grpcService.Test.TestService.GetOrder(Test.EmptyMessage)).rejects.toEqual('ERROR_INTERCEPTOR_CALL');

    expect(spyerThenableCall).toHaveBeenCalledTimes(1);
    expect(spyerInterceptor).toHaveBeenCalledTimes(1);

    spyerThenableCall.mockResolvedValue('SUCCESS_TRANSPORT_CALL');

    await expect(grpcService.Test.TestService.GetOrder(Test.EmptyMessage)).resolves.toEqual('SUCCESS_TRANSPORT_CALL');

    expect(spyerInterceptor).toHaveBeenCalledTimes(1);
    expect(spyerThenableCall).toHaveBeenCalledTimes(2);
  });

  it('always calls twice if interceptors empty and GetOrder fail', async () => {
    const spyerThenableCall = jest.spyOn(grpcService._client, 'thenableCall').mockRejectedValue('ERROR_TRANSPORT_CALL');

    return grpcService.Test.TestService.GetOrder(Test.EmptyMessage).catch((err) => {
      expect(err).toBe('ERROR_TRANSPORT_CALL');
      expect(spyerThenableCall).toHaveBeenCalledTimes(2);
    });
  });
});
