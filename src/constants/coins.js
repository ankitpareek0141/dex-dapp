// import web3 from "../../ethereum/web3";
import * as chains from "./chains";
// import * as ethFunc from "../ethereumFunctions";

// const ERC20 = require("../../ethereum/.deps/npm/@rari-capital/solmate/src/tokens/artifacts/ERC20.json");
// const account = "0xb677263DDab7f3d9C60d7c5168eeD79423E6611A";

export let GÖRLICoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    balance: 0,
    addedByUser: false,
  },
  // {
  //   name: "Wrapped Ether",
  //   abbr: "WETH",
  //   address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  //   balance: 0,
  // addedByUser: false,
  // },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
    balance: 0,
    addedByUser: false,
  },
  {
    name: "Uniswap",
    abbr: "UNI",
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    balance: 0,
    addedByUser: false,
  },
  {
    name: "Kaju Token",
    abbr: "KAJU",
    address: "0x36200cA470824efab2581aa985B78152f38a4cd4",
    balance: 0,
    addedByUser: false,
  },
  {
    name: "Test Token",
    abbr: "TEST",
    address: "0x610146F3545b25B01D1C083aEF0355822f0D3514",
    balance: 0,
    addedByUser: false,
  },
];

const COINS = new Map();
// COINS.set(chains.ChainId.MAINNET, MAINNETCoins);
// COINS.set(chains.ChainId.ROPSTEN, ROPSTENCoins);
// COINS.set(chains.ChainId.RINKEBY, RINKEBYCoins);
COINS.set(chains.ChainId.GÖRLI, GÖRLICoins);
// COINS.set(chains.ChainId.KOVAN, KOVANCoins);
export default COINS;
