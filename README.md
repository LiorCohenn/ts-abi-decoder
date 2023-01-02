# ts-abi-decoder
Nodejs and Typescript library for decoding data params and events from etherem blockchain

## Features

- Add ABI's
- Decode Tx data
- Decode Logs from Tx Receipt
- Decode events
- work with tuples

# Install

```
npm install ts-abi-decoder
yarn add ts-abi-decoder
```

# Add ABI's

Need to pass the ABI's manually to the library in order to be able to decode params later

```ts
const testABI = [
  {
    inputs: [{ type: "address", name: "" }],
    constant: true,
    name: "isInstantiation",
    payable: false,
    outputs: [{ type: "bool", name: "" }],
    type: "function",
  },
  {
    inputs: [
      { type: "address[]", name: "_owners" },
      { type: "uint256", name: "_required" },
      { type: "uint256", name: "_dailyLimit" },
    ],
    constant: false,
    name: "create",
    payable: false,
    outputs: [{ type: "address", name: "wallet" }],
    type: "function",
  },
  {
    inputs: [
      { type: "address", name: "" },
      { type: "uint256", name: "" },
    ],
    constant: true,
    name: "instantiations",
    payable: false,
    outputs: [{ type: "address", name: "" }],
    type: "function",
  },
  {
    inputs: [{ type: "address", name: "creator" }],
    constant: true,
    name: "getInstantiationCount",
    payable: false,
    outputs: [{ type: "uint256", name: "" }],
    type: "function",
  },
  {
    inputs: [
      { indexed: false, type: "address", name: "sender" },
      { indexed: false, type: "address", name: "instantiation" },
    ],
    type: "event",
    name: "ContractInstantiation",
    anonymous: false,
  },
];
Decoder.addABI(testABI);
```

# Decode Tx data

```ts
const testData =
  "0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa";
const decodedData = Decoder.decodeData(testData);
```

# Decode Logs from Tx Receipt

```ts
web3.eth.getTransactionReceipt(
  "0x9199e262aaab0a6ec99558b3e9f42397c07a2bb9c6befb637643aebfb03cc32a",
  function (e, receipt) {
    const decodedLogs = Decoder.decodeLogs(receipt.logs);
  }
);
```

# Decode event from subscibe

```ts
web3.eth.subscribe('logs', {
        0,
        address: "0x0000000000000000000000000000000000000000",
      }).on('data', async (event) => {
         const decodedLog = Decoder.decodeLog(event);
      })
);
```
