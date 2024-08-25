export const wishlistABI = [
  {
    "type": "event",
    "name": "ProductBought",
    "inputs": [
      {
        "type": "uint256",
        "name": "id",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "buyer",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ProductCreated",
    "inputs": [
      {
        "type": "uint256",
        "name": "id",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "creator",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "title",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "price",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "createdAt",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "buyProduct",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "createProduct",
    "inputs": [
      {
        "type": "string",
        "name": "_title",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_price",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getAllProducts",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "creator",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "title",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "price",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "bool",
            "name": "isSold",
            "internalType": "bool"
          },
          {
            "type": "address",
            "name": "buyer",
            "internalType": "address"
          }
        ],
        "internalType": "struct Wishlistv2.Product[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProductBuyer",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserProducts",
    "inputs": [
      {
        "type": "address",
        "name": "_user",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "creator",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "title",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "price",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "bool",
            "name": "isSold",
            "internalType": "bool"
          },
          {
            "type": "address",
            "name": "buyer",
            "internalType": "address"
          }
        ],
        "internalType": "struct Wishlistv2.Product[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "nextProductId",
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
    "name": "products",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "id",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "creator",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "title",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "price",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "createdAt",
        "internalType": "uint256"
      },
      {
        "type": "bool",
        "name": "isSold",
        "internalType": "bool"
      },
      {
        "type": "address",
        "name": "buyer",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userProducts",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  }
] as const;