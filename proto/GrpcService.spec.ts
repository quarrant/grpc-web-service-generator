import { GrpcService } from './GrpcService'

describe("grpc service interceptors unit test", () => {

  const grpcService = new GrpcService("127.0.0.1")
  grpcService.setMetadata({ token: 'invalid_token' })

  grpcService.interceptors.errors.push(error => {
    console.log({ error })
    if (error === 'INVALID_TOKEN') {
      return refreshToken()
    }

    return Promise.reject(error)
  })

  const refreshToken = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        grpcService.setMetadata({ token: 'new_access_token' });
        resolve()
      }, 2000)
    })
  }

  beforeAll(() => {
    grpcService.TestService.RefreshToken = jest.fn().mockResolvedValueOnce({})
    grpcService.TestService.GetOrder = jest.fn().mockRejectedValueOnce("INVALID_TOKEN").mockResolvedValueOnce({})
  })

  describe("case 1",  () => {
    // Кейс 1
    // - Делаем запрос GetOrders
    // - Получаем ошибку 419
    // - Должен сработать перехватчик, выполнить запрос RefreshToken и перевызвать GetOrders с этим же параметрами

    it("reject with error INVALID_TOKEN", async () => {
      await expect(grpcService.TestService.GetOrder({})).rejects.toEqual("INVALID_TOKEN_2")
    })

    it("reject with error INVALID_TOKEN", async () => {
      await expect(grpcService.TestService.GetOrder({})).rejects.toEqual("INVALID_TOKEN_2")
    })

  })
})