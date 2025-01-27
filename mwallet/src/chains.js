const Ethereum = {
  hex: "0x1",
  name: "Ethereum",
  rpcUrl:
    "https://eth-mainnet.g.alchemy.com/v2/knOe0mPFYw8rFFybHbeSbngo37UZFQwH", // Replace with your RPC URL
  ticker: "ETH",
};

const MumbaiTestnet = {
  hex: "0x13881",
  name: "Mumbai Testnet",
  rpcUrl: "https://rpc-mumbai.maticvigil.com", // Replace with your RPC URL
  ticker: "MATIC",
};

const Polygon = {
  hex: "0x89",
  name: "Polygon",
  rpcUrl:
    "https://polygon-mainnet.g.alchemy.com/v2/knOe0mPFYw8rFFybHbeSbngo37UZFQwH", // Replace with your RPC URL
  ticker: "MATIC",
};

const Avalanche = {
  hex: "0xa86a",
  name: "Avalanche",
  rpcUrl:
    "https://avax-mainnet.g.alchemy.com/v2/knOe0mPFYw8rFFybHbeSbngo37UZFQwH", // Replace with your RPC URL
  ticker: "AVAX",
};

const Sepolia = {
  hex: "0xaa36a7",
  name: "Sepolia Testnet",
  rpcUrl:
    "https://eth-sepolia.g.alchemy.com/v2/knOe0mPFYw8rFFybHbeSbngo37UZFQwH", // Replace with your RPC URL
  ticker: "ETH",
};

export const CHAINS_CONFIG = {
  "0x1": Ethereum,
  "0x13881": MumbaiTestnet,
  "0x89": Polygon,
  "0xa86a": Avalanche,
  "0xaa36a7": Sepolia,
};
