export const contractABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "NewCoffee",
    "inputs": [
      {
        "type": "address",
        "name": "sender",
        "indexed": true,  // Use indexed for efficient querying
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "message",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "buyMeACoffee",
    "inputs": [
      {
        "type": "string",
        "name": "_message",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getTotalCoffee",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getCoffees",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "address",
            "name": "sender",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "message",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "timestamp",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BuyMeACoffee.Coffee[]"
      }
    ],
    "stateMutability": "view"
  }
] as const;
