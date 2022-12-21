import { expect } from "chai";
import { AbiItem } from "web3-utils";

import { Decoder, Log } from "../../dist";

// Test Params
const testABI: AbiItem[] = [
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
const testArrNumbersABI: AbiItem[] = [
  {
    constant: false,
    inputs: [{ name: "n", type: "uint256[]" }],
    name: "numbers",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const abidTuples: AbiItem[] = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "by",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "activator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "builder",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "kiroboPayment",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "builderPayment",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activatorPayment",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "base",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "fees",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commonGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "userGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "missingKiro",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "availableEth",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Total",
        name: "total",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "FCTE_Activated",
    type: "event",
  },
];
const abiV2: AbiItem[] = [
  {
    constant: false,
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "address", name: "target", type: "address" },
              { internalType: "uint256", name: "gasLimit", type: "uint256" },
              { internalType: "uint256", name: "gasPrice", type: "uint256" },
              { internalType: "bytes", name: "encodedFunction", type: "bytes" },
            ],
            internalType: "struct EIP712Sig.CallData",
            name: "callData",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "senderAccount",
                type: "address",
              },
              { internalType: "uint256", name: "senderNonce", type: "uint256" },
              {
                internalType: "address",
                name: "relayAddress",
                type: "address",
              },
              { internalType: "uint256", name: "pctRelayFee", type: "uint256" },
            ],
            internalType: "struct EIP712Sig.RelayData",
            name: "relayData",
            type: "tuple",
          },
        ],
        internalType: "struct EIP712Sig.RelayRequest",
        name: "relayRequest",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "bytes", name: "approvalData", type: "bytes" },
    ],
    name: "relayCall",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

describe("abi decoder", function () {
  it("get abis", () => {
    const abis = Decoder.getABIs();
    expect(abis).to.be.an("array");
    expect(abis).to.have.length(0);
  });

  it("add abis", () => {
    Decoder.addABI(testABI);
    const abis = Decoder.getABIs();
    expect(abis).to.be.an("array");
    expect(abis).to.have.length(5);
  });

  it("add abis generated by ABIEncoderV2", () => {
    Decoder.addABI(abiV2);
    const abis = Decoder.getABIs();
    expect(abis).to.have.length(6);
  });

  it("decode data for ABIEncoderV2 abi", () => {
    Decoder.addABI(abiV2);
    const testData =
      "0xd4f8f1310000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000050a5cf333fc36a18c8f96b1d1e7a2b013c6267ac000000000000000000000000000000000000000000000000000000000000000000000000000000000000000046dccf96fe3f3beef51c72c68a1f3ad9183a6561000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000254dffcd3277c0b1660f6d42efbb754edababc2b00000000000000000000000000000000000000000000000000000000000f4240000000000000000000000000000000000000000000000000000000059682f000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000642ac0df260000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000411de3d1ce0d680d92171da7852a1df1a655280126d809b6f10d046a60e257c187684da02cf3fb67e6939ac48459e26f6c0bfdedf70a1e8f6921a4a0ff331448641b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    const decodedData = Decoder.decodeData(testData);
    if (!decodedData) {
      expect(decodedData).to.be.an("array");
    }
    expect(decodedData).to.be.an("object");
    expect(decodedData).to.have.all.keys("name", "params");
    expect(decodedData.name).to.be.a("string");
    expect(decodedData.params).to.be.a("array");
    expect(decodedData.params).to.have.length(3);
    expect(decodedData.params[0].value).to.deep.equal([
      [
        "0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B",
        "1000000",
        "24000000000",
        "0x2ac0df260000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b68656c6c6f20776f726c64000000000000000000000000000000000000000000",
      ],
      ["0x50A5cf333FC36A18c8F96B1D1e7a2B013C6267aC", "0", "0x46DCcF96Fe3f3bEEf51c72c68A1F3Ad9183a6561", "12"],
    ]);
  });

  it("decode data", () => {
    Decoder.addABI(testABI);
    const testData =
      "0x53d9d9100000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114de5000000000000000000000000a6d9c5f7d4de3cef51ad3b7235d79ccc95114daa";
    const decodedData = Decoder.decodeData(testData);
    if (!decodedData) {
      expect(decodedData).to.be.an("array");
    }

    expect(decodedData).to.be.an("object");
    expect(decodedData).to.have.all.keys("name", "params");
    expect(decodedData.name).to.be.a("string");
    expect(decodedData.params).to.be.a("array");
    expect(decodedData.params).to.have.length(3);
    expect(decodedData.params[0].value).to.deep.equal([
      "0xa6d9c5f7d4de3cef51ad3b7235d79ccc95114de5",
      "0xa6d9c5f7d4de3cef51ad3b7235d79ccc95114daa",
    ]);
    expect(decodedData.params[0].name).to.equal("_owners");
    expect(decodedData.params[0].type).to.equal("address[]");
    expect(decodedData.params[1].value).to.equal("1");
    expect(decodedData.params[1].name).to.equal("_required");
    expect(decodedData.params[1].type).to.equal("uint256");
    expect(decodedData.params[2].value).to.equal("0");
    expect(decodedData.params[2].name).to.equal("_dailyLimit");
    expect(decodedData.params[2].type).to.equal("uint256");
  });

  it("decode data with arrays", () => {
    Decoder.addABI(testArrNumbersABI);
    const testData =
      "0x3727308100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003";
    const decodedData = Decoder.decodeData(testData);
    if (!decodedData) {
      expect(decodedData).to.be.an("array");
    }
    expect(decodedData).to.be.an("object");
    expect(decodedData).to.have.all.keys("name", "params");
    expect(decodedData.name).to.be.a("string");
    expect(decodedData.params).to.be.a("array");
    expect(decodedData.params).to.have.length(1);
    expect(decodedData.params[0].value[0]).to.equal("1");
    expect(decodedData.params[0].value[1]).to.equal("2");
    expect(decodedData.params[0].value[2]).to.equal("3");
    expect(decodedData.params[0].name).to.equal("n");
    expect(decodedData.params[0].type).to.equal("uint256[]");
  });
  it("decode log with tuples", () => {
    Decoder.addABI([...abidTuples]);
    const testLogs: Log = {
      data: "0x000000000000000000000000e911180acde75bfbacfc8bbfd484768b6aa3bd300000000000000000000000000000000000000000000000000003b168fdd147270000000000000000000000000000000000000000000000000003b168fdd14727000000000000000000000000000000000000000000000000000b7d21035a5d0a000000000000000000000000000000000000000000000000000068e609e687920000000000000000000000000000000000000000000000000012770cf51663c80000000000000000000000000000000000000000000000000000000000034f770000000000000000000000000000000000000000000000000000000000019422000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bbd0000000000000000000000000000000000000000000000000000000063a240b0",
      topics: [
        "0x3d67d7b0242c56cec690a3513b11ac7c54835ff09550d772f7f354269829c669",
        "0x000000000000000000000000b4e6b1ebe575a1c459460436001832487df856c1",
        "0x000000000000000000000000b4e6b1ebe575a1c459460436001832487df856c1",
        "0x2409a93401010100000000000000000000000000000000000000000000000014",
      ],
      address: "0xB252A554217d614Fb2968cf8f87b02e3D9DBd63C",
    };
    const decodedLog = Decoder.decodeLog(testLogs);
    if (!decodedLog) {
      expect(decodedLog).to.be.equal("1");
    }

    // console.log(JSON.stringify(decodedLog, null, 2));

    expect(decodedLog).to.be.an("object");
    expect(decodedLog).to.have.keys(["name", "address", "events"]);
    expect(decodedLog.name).to.equal("FCTE_Activated");
    expect(decodedLog.events).to.have.length(7);
    expect(decodedLog.address).to.equal("0xB252A554217d614Fb2968cf8f87b02e3D9DBd63C");
    expect(decodedLog.events[0].name).to.equal("by");
    expect(decodedLog.events[0].value).to.equal("0xb4e6b1ebe575a1c459460436001832487df856c1");
    expect(decodedLog.events[0].type).to.equal("address");
    expect(decodedLog.events[4].name).to.equal("total");
    expect(decodedLog.events[4].type).to.equal("tuple");
    expect((decodedLog.events[4].value[0] as any).name).to.equal("kiroboPayment");
    expect((decodedLog.events[4].value[0] as any).value).to.equal("1039489423197991");
    expect((decodedLog.events[4].value[0] as any).type).to.equal("uint256");
  });

  it("decode log without indexed", () => {
    const testLogs: Log = {
      data: "0x00000000000000000000000065039084cc6f4773291a6ed7dcf5bc3a2e894ff3000000000000000000000000435a4167bc34107bd03e267f9d6b869255151a27",
      topics: ["0x4fb057ad4a26ed17a57957fa69c306f11987596069b89521c511fc9a894e6161"],
      address: "0x0457874Bb0a346962128a0C01310d00Fc5bb6a83",
    };

    const decodedLog = Decoder.decodeLog(testLogs);
    if (!decodedLog) {
      expect(decodedLog).to.be.an("array");
    }

    expect(decodedLog).to.be.an("object");
    expect(decodedLog).to.have.keys(["name", "address", "events"]);
    expect(decodedLog.name).to.equal("ContractInstantiation");
    expect(decodedLog.events).to.have.length(2);
    expect(decodedLog.address).to.equal("0x0457874Bb0a346962128a0C01310d00Fc5bb6a83");
    expect(decodedLog.events[0].name).to.equal("sender");
    expect(decodedLog.events[0].value).to.equal("0x65039084cc6f4773291a6ed7dcf5bc3a2e894ff3");
    expect(decodedLog.events[0].type).to.equal("address");
    expect(decodedLog.events[1].name).to.equal("instantiation");
    expect(decodedLog.events[1].value).to.equal("0x435a4167bc34107bd03e267f9d6b869255151a27");
    expect(decodedLog.events[1].type).to.equal("address");
  });

  it("decode logs without indexed", () => {
    const testLogs: Log[] = [
      {
        data: "0x00000000000000000000000065039084cc6f4773291a6ed7dcf5bc3a2e894ff3000000000000000000000000435a4167bc34107bd03e267f9d6b869255151a27",
        topics: ["0x4fb057ad4a26ed17a57957fa69c306f11987596069b89521c511fc9a894e6161"],
        address: "0x0457874Bb0a346962128a0C01310d00Fc5bb6a83",
      },
    ];

    const decodedLogs = Decoder.decodeLogs(testLogs);
    if (!decodedLogs[0]) {
      expect(decodedLogs).to.be.an("object");
    }
    expect(decodedLogs).to.be.an("array");
    expect(decodedLogs).to.have.length(1);
    expect(decodedLogs[0].name).to.equal("ContractInstantiation");
    expect(decodedLogs[0].events).to.have.length(2);
    expect(decodedLogs[0].address).to.equal("0x0457874Bb0a346962128a0C01310d00Fc5bb6a83");
    expect(decodedLogs[0].events[0].name).to.equal("sender");
    expect(decodedLogs[0].events[0].value).to.equal("0x65039084cc6f4773291a6ed7dcf5bc3a2e894ff3");
    expect(decodedLogs[0].events[0].type).to.equal("address");
    expect(decodedLogs[0].events[1].name).to.equal("instantiation");
    expect(decodedLogs[0].events[1].value).to.equal("0x435a4167bc34107bd03e267f9d6b869255151a27");
    expect(decodedLogs[0].events[1].type).to.equal("address");
  });

  it("decode logs with indexed param", () => {
    const walletABI: AbiItem[] = [
      {
        inputs: [{ type: "uint256", name: "" }],
        constant: true,
        name: "owners",
        payable: false,
        outputs: [{ type: "address", name: "" }],
        type: "function",
      },
      {
        inputs: [{ type: "address", name: "owner" }],
        constant: false,
        name: "removeOwner",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: false,
        name: "revokeConfirmation",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [{ type: "address", name: "" }],
        constant: true,
        name: "isOwner",
        payable: false,
        outputs: [{ type: "bool", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "uint256", name: "" },
          { type: "address", name: "" },
        ],
        constant: true,
        name: "confirmations",
        payable: false,
        outputs: [{ type: "bool", name: "" }],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "calcMaxWithdraw",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "bool", name: "pending" },
          { type: "bool", name: "executed" },
        ],
        constant: true,
        name: "getTransactionCount",
        payable: false,
        outputs: [{ type: "uint256", name: "count" }],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "dailyLimit",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "lastDay",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [{ type: "address", name: "owner" }],
        constant: false,
        name: "addOwner",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: true,
        name: "isConfirmed",
        payable: false,
        outputs: [{ type: "bool", name: "" }],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: true,
        name: "getConfirmationCount",
        payable: false,
        outputs: [{ type: "uint256", name: "count" }],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "" }],
        constant: true,
        name: "transactions",
        payable: false,
        outputs: [
          { type: "address", name: "destination" },
          { type: "uint256", name: "value" },
          { type: "bytes", name: "data" },
          { type: "bool", name: "executed" },
        ],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "getOwners",
        payable: false,
        outputs: [{ type: "address[]", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "uint256", name: "from" },
          { type: "uint256", name: "to" },
          { type: "bool", name: "pending" },
          { type: "bool", name: "executed" },
        ],
        constant: true,
        name: "getTransactionIds",
        payable: false,
        outputs: [{ type: "uint256[]", name: "_transactionIds" }],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: true,
        name: "getConfirmations",
        payable: false,
        outputs: [{ type: "address[]", name: "_confirmations" }],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "transactionCount",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "_required" }],
        constant: false,
        name: "changeRequirement",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: false,
        name: "confirmTransaction",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [
          { type: "address", name: "destination" },
          { type: "uint256", name: "value" },
          { type: "bytes", name: "data" },
        ],
        constant: false,
        name: "submitTransaction",
        payable: false,
        outputs: [{ type: "uint256", name: "transactionId" }],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "_dailyLimit" }],
        constant: false,
        name: "changeDailyLimit",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "MAX_OWNER_COUNT",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "required",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "address", name: "owner" },
          { type: "address", name: "newOwner" },
        ],
        constant: false,
        name: "replaceOwner",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [{ type: "uint256", name: "transactionId" }],
        constant: false,
        name: "executeTransaction",
        payable: false,
        outputs: [],
        type: "function",
      },
      {
        inputs: [],
        constant: true,
        name: "spentToday",
        payable: false,
        outputs: [{ type: "uint256", name: "" }],
        type: "function",
      },
      {
        inputs: [
          { type: "address[]", name: "_owners" },
          { type: "uint256", name: "_required" },
          { type: "uint256", name: "_dailyLimit" },
        ],
        type: "constructor",
      },
      { payable: true, type: "fallback" },
      {
        inputs: [{ indexed: false, type: "uint256", name: "dailyLimit" }],
        type: "event",
        name: "DailyLimitChange",
        anonymous: false,
      },
      {
        inputs: [
          { indexed: true, type: "address", name: "sender" },
          { indexed: true, type: "uint256", name: "transactionId" },
        ],
        type: "event",
        name: "Confirmation",
        anonymous: false,
      },
      {
        inputs: [
          { indexed: true, type: "address", name: "sender" },
          { indexed: true, type: "uint256", name: "transactionId" },
        ],
        type: "event",
        name: "Revocation",
        anonymous: false,
      },
      {
        inputs: [{ indexed: true, type: "uint256", name: "transactionId" }],
        type: "event",
        name: "Submission",
        anonymous: false,
      },
      {
        inputs: [{ indexed: true, type: "uint256", name: "transactionId" }],
        type: "event",
        name: "Execution",
        anonymous: false,
      },
      {
        inputs: [{ indexed: true, type: "uint256", name: "transactionId" }],
        type: "event",
        name: "ExecutionFailure",
        anonymous: false,
      },
      {
        inputs: [
          { indexed: true, type: "address", name: "sender" },
          { indexed: false, type: "uint256", name: "value" },
        ],
        type: "event",
        name: "Deposit",
        anonymous: false,
      },
      {
        inputs: [{ indexed: true, type: "address", name: "owner" }],
        type: "event",
        name: "OwnerAddition",
        anonymous: false,
      },
      {
        inputs: [{ indexed: true, type: "address", name: "owner" }],
        type: "event",
        name: "OwnerRemoval",
        anonymous: false,
      },
      {
        inputs: [{ indexed: false, type: "uint256", name: "required" }],
        type: "event",
        name: "RequirementChange",
        anonymous: false,
      },
    ];
    Decoder.addABI(walletABI);
    const testLogs = [
      {
        data: "0x00000000000000000000000000000000000000000000000000038d7ea4c68000",
        topics: [
          "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
          "0x00000000000000000000000005039084cc6f4773291a6ed7dcf5bc3a2e894ff3",
        ],
        address: "0x0457874Bb0a346962128a0C01310d00Fc5bb6a81",
      },
    ];
    const decodedLogs = Decoder.decodeLogs(testLogs);
    if (!decodedLogs[0]) {
      expect(decodedLogs).to.be.an("object");
    }
    expect(decodedLogs).to.be.an("array");
    expect(decodedLogs).to.have.length(1);
    expect(decodedLogs[0].name).to.equal("Deposit");
    expect(decodedLogs[0].events).to.have.length(2);
    expect(decodedLogs[0].address).to.equal("0x0457874Bb0a346962128a0C01310d00Fc5bb6a81");
    expect(decodedLogs[0].events[0].name).to.equal("sender");
    expect(decodedLogs[0].events[0].type).to.equal("address");
    expect(decodedLogs[0].events[0].value).to.equal("0x05039084cc6f4773291a6ed7dcf5bc3a2e894ff3");
    expect(decodedLogs[0].events[1].name).to.equal("value");
    expect(decodedLogs[0].events[1].value).to.equal("1000000000000000");
    expect(decodedLogs[0].events[1].type).to.equal("uint256");
  });

  it("decode logs with indexed param and uint value", () => {
    const testABI: AbiItem[] = [
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "voter", type: "address" },
          { indexed: true, name: "pollId", type: "uint256" },
          { indexed: true, name: "optionId", type: "uint256" },
        ],
        name: "Voted",
        type: "event",
      },
    ];
    Decoder.addABI(testABI);
    const testLogs = [
      {
        data: "0x",
        topics: [
          "0xea66f58e474bc09f580000e81f31b334d171db387d0c6098ba47bd897741679b",
          "0x00000000000000000000000014341f81df14ca86e1420ec9e6abd343fb1c5bfc",
          "0x0000000000000000000000000000000000000000000000000000000000000022",
          "0x00000000000000000000000000000000000000000000000000000000000000f1",
        ],
        address: "0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D",
      },
    ];
    const decodedLogs = Decoder.decodeLogs(testLogs);
    if (!decodedLogs[0]) {
      expect(decodedLogs).to.be.an("object");
    }
    expect(decodedLogs).to.be.an("array");
    expect(decodedLogs).to.have.length(1);
    expect(decodedLogs[0].name).to.equal("Voted");
    expect(decodedLogs[0].events).to.have.length(3);
    expect(decodedLogs[0].address).to.equal("0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D");
    expect(decodedLogs[0].events[0].name).to.equal("voter");
    expect(decodedLogs[0].events[0].type).to.equal("address");
    expect(decodedLogs[0].events[0].value).to.equal("0x14341f81df14ca86e1420ec9e6abd343fb1c5bfc");
    expect(decodedLogs[0].events[1].name).to.equal("pollId");
    expect(decodedLogs[0].events[1].value).to.equal("34");
    expect(decodedLogs[0].events[1].type).to.equal("uint256");
    expect(decodedLogs[0].events[2].name).to.equal("optionId");
    expect(decodedLogs[0].events[2].value).to.equal("241");
    expect(decodedLogs[0].events[2].type).to.equal("uint256");
  });
});
