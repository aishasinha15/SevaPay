// const express = require("express");
// const Moralis = require("moralis").default;
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// app.get("/getTokens", async (req, res) => {
//   const { userAddress, chain } = req.query;
//   const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
//     chain: chain,
//     address: userAddress,
//   });

//   const jsonResponse = {
//     tokens: tokens.raw,
//   };

//   return res.status(200).json(jsonResponse);
// });

// Moralis.start({
//   apiKey: process.env.MORALIS_KEY,
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`Listening for API Calls`);
//   });
// });

// const express = require("express");
// const Moralis = require("moralis").default;
// const app = express();
// const cors = require("cors");
// require("dotenv").config();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// app.get("/getTokens", async (req, res) => {
//   try {
//     const { userAddress, chain } = req.query;

//     if (!userAddress || !chain) {
//       return res.status(400).json({
//         error:
//           "Missing required parameters. Please provide userAddress and chain.",
//       });
//     }

//     // Get both ERC20 tokens and native balance
//     const [tokens, nativeBalance] = await Promise.all([
//       Moralis.EvmApi.token.getWalletTokenBalances({
//         chain: chain,
//         address: userAddress,
//       }),
//       Moralis.EvmApi.balance.getNativeBalance({
//         chain: chain,
//         address: userAddress,
//       }),
//     ]);

//     // Format native balance
//     const nativeToken = {
//       token_address: "0x0000000000000000000000000000000000000000",
//       name: "Sepolia Ether",
//       symbol: "SepoliaETH",
//       logo: null,
//       thumbnail: null,
//       decimals: 18,
//       balance: nativeBalance.raw.balance,
//     };

//     const jsonResponse = {
//       tokens: [nativeToken, ...tokens.raw],
//       nativeBalance: nativeBalance.raw.balance,
//     };

//     return res.status(200).json(jsonResponse);
//   } catch (error) {
//     console.error("Error in /getTokens:", error);
//     return res.status(500).json({
//       error: "Error fetching tokens",
//       details: error.message,
//     });
//   }
// });

// Moralis.start({
//   apiKey: process.env.MORALIS_KEY,
// })
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//       console.log(`Moralis initialized successfully`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to start Moralis:", error);
//   });

const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;

// Chain configuration with logos
const CHAIN_CONFIG = {
  "0x1": {
    name: "Ethereum",
    symbol: "ETH",
    logo: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
  },
  "0xaa36a7": {
    name: "Sepolia Ether",
    symbol: "SepoliaETH",
    logo: "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png", // Using ETH logo for Sepolia
  },
  "0x89": {
    name: "Polygon",
    symbol: "MATIC",
    logo: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
  },
  "0x13881": {
    name: "Mumbai Matic",
    symbol: "MATIC",
    logo: "https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
  },
  "0xa86a": {
    name: "Avalanche C-Chain",
    symbol: "AVAX",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
  },
};

app.use(cors());
app.use(express.json());

app.get("/getTokens", async (req, res) => {
  try {
    const { userAddress, chain } = req.query;

    if (!userAddress || !chain) {
      return res.status(400).json({
        error:
          "Missing required parameters. Please provide userAddress and chain.",
      });
    }

    const [tokens, balance] = await Promise.all([
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: chain,
        address: userAddress,
      }),
      Moralis.EvmApi.balance.getNativeBalance({
        chain: chain,
        address: userAddress,
      }),
    ]);

    const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: chain,
      address: userAddress,
      mediaItems: true,
    });

    const myNfts = nfts.raw.result.map((e, i) => {
      if (
        e?.media?.media_collection?.high?.url &&
        !e.possible_spam &&
        e?.media?.category !== "video"
      ) {
        return e["media"]["media_collection"]["high"]["url"];
      }
    });

    // Get chain config or use default values
    const chainInfo = CHAIN_CONFIG[chain] || {
      name: "Native Token",
      symbol: "NATIVE",
      logo: null,
    };

    // Format native balance with logo
    const nativeToken = {
      token_address: "0x0000000000000000000000000000000000000000",
      name: chainInfo.name,
      symbol: chainInfo.symbol,
      logo: chainInfo.logo,
      thumbnail: chainInfo.logo, // Using same URL for thumbnail
      decimals: 18,
      balance: balance.raw.balance,
    };

    const jsonResponse = {
      tokens: [nativeToken, ...tokens.raw],
      balance: balance.raw.balance / 10 ** 18,
      nfts: myNfts,
    };

    return res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Error in /getTokens:", error);
    return res.status(500).json({
      error: "Error fetching tokens",
      details: error.message,
    });
  }
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`Moralis initialized successfully`);
      console.log("Supported chains:", Object.keys(CHAIN_CONFIG).join(", "));
    });
  })
  .catch((error) => {
    console.error("Failed to start Moralis:", error);
  });
