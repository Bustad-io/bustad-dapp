const CREATED = {
    type: 'CREATED',
    purchase: {
      endTime: '2023-01-08T12:26:39.764Z',
      cryptoAmount: '8023728890597727',
      fiatCurrency: 'EUR',
      fiatValue: 10,
      assetExchangeRateEur: 1180.9032500905719,
      fiatExchangeRateEur: 1,
      baseRampFee: 0.09475247524752475,
      networkFee: 0.43,
      appliedFee: 0.5247524752475248,
      createdAt: '2023-01-05T12:26:39.806Z',
      updatedAt: '2023-01-05T12:26:40.470Z',
      id: 'sqs6a428mqjtzbv',
      asset: {
        address: null,
        symbol: 'GOERLI_ETH',
        apiV3Symbol: 'ETH',
        name: 'ETH on Goerli',
        decimals: 18,
        type: 'GOERLI',
        apiV3Type: 'NATIVE',
        chain: 'GOERLI'
      },
      receiverAddress: '0x14701438d1e2A4BE2578158D26F027ea4e99dA6c',
      assetExchangeRate: 1180.9032500905719,
      purchaseViewToken: 'mg3voq92hd2mbdht',
      status: 'INITIALIZED',
      paymentMethodType: 'MANUAL_BANK_TRANSFER'
    }
  };


  const mockRampPurchase = {
    id: 'f50cccd0-6b9c-47cf-879e-64da695898f1',
    endTime: '2022-06-01T12:00:00.000Z',
    asset: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      symbol: 'ABC',
      name: 'ABC Token',
      decimals: 18,
      chain: 'ETH',
      type: 'ERC20'
    },
    receiverAddress: '0x1234567890abcdef1234567890abcdef12345678',
    cryptoAmount: '1000000000000000000',
    fiatCurrency: 'USD',
    fiatValue: 100,
    assetExchangeRate: 10,
    assetExchangeRateEur: 8,
    fiatExchangeRateEur: 0.9,
    baseRampFee: 5,
    networkFee: 0.5,
    appliedFee: 5.5,
    paymentMethodType: "PaymentMethodType.CARD",
    finalTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    createdAt: '2022-01-01T12:00:00.000Z',
    updatedAt: '2022-01-01T12:00:00.000Z',
    status: "PurchaseStatus.SUCCESS",
    purchaseViewToken: 'dba35b51-fa8f-47f6-b018-d15ce6b4478d'
  };
  