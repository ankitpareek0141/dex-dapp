import * as ethFunc from "../../ethereumFunctions.js";
import web3 from "../../../ethereum/web3.js";
import swal from "sweetalert";

const ERC20 = require("../../../ethereum/.deps/npm/@rari-capital/solmate/src/tokens/artifacts/ERC20.json");

const router = ethFunc.getRouter(process.env.VUE_APP_ROUTER);
const factory = ethFunc.getFactory(process.env.VUE_APP_FACTORY);

export default {
  checkMaxLiqBal(context) {
    context.commit("checkMaxLiqBal");
  },

  closeLiqDialog(context) {
    context.commit("liqDialog", false);
  },

  openLiqDialog(context) {
    context.commit("liqDialog", true);
  },

  async displayMaxTokenBalanceLiq(context, payload) {
    context.getters.getLiqTokenBal[payload.ind] = await ethFunc.getTokenBalance(
      payload.add,
      context.rootState.account0,
      true
    );
  },

  async approveLiq(context) {
    context.dispatch("toggleOperationUnderProcess", {
      val: true,
      location: "ApprovTokL",
    });
    let isETH = false;
    if (
      context.getters.getLiqTokenSymbol[0] === "ETH" ||
      context.getters.getLiqTokenSymbol[1] === "ETH"
    ) {
      isETH = true;
    }
    try {
      const token0 = new web3.eth.Contract(
        ERC20.abi,
        context.getters.getLiqDialog.DialnumAdd[0]
      );
      const token1 = new web3.eth.Contract(
        ERC20.abi,
        context.getters.getLiqDialog.DialnumAdd[1]
      );
      if (
        context.getters.getLiqDialog.DialnumAdd[0] ===
          process.env.VUE_APP_WETH &&
        isETH
      ) {
        const allowance1 = web3.utils.fromWei(
          await token1.methods
            .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
            .call(),
          "ether"
        );
        if (allowance1 < context.state.liqTokenAmount1) {
          await token1.methods
            .approve(
              router.options.address,
              web3.utils.toWei("10000000000", "ether")
            )
            .send({ from: context.rootState.account0 })
            .then(() => {
              context.rootState.tokenApprovalInProcess = false;
            });
        }
      } else if (
        context.getters.getLiqDialog.DialnumAdd[1] ===
          process.env.VUE_APP_WETH &&
        isETH
      ) {
        const allowance0 = web3.utils.fromWei(
          await token0.methods
            .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
            .call(),
          "ether"
        );
        if (allowance0 < context.state.liqTokenAmount0) {
          await token0.methods
            .approve(
              router.options.address,
              web3.utils.toWei("10000000000", "ether")
            )
            .send({ from: context.rootState.account0 })
            .then(() => {
              // if (allowance1 > context.state.liqTokenAmount1)
              context.rootState.tokenApprovalInProcess = false;
            });
        }
      } else {
        const allowance0 = web3.utils.fromWei(
          await token0.methods
            .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
            .call(),
          "ether"
        );
        const allowance1 = web3.utils.fromWei(
          await token1.methods
            .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
            .call(),
          "ether"
        );
        if (allowance0 < context.state.liqTokenAmount0) {
          await token0.methods
            .approve(
              router.options.address,
              web3.utils.toWei("10000000000", "ether")
            )
            .send({ from: context.rootState.account0 })
            .then(() => {
              if (allowance1 > context.state.liqTokenAmount1) {
                context.rootState.tokenApprovalInProcess = false;
              }
            });
        }
        if (allowance1 < context.state.liqTokenAmount1) {
          await token1.methods
            .approve(
              router.options.address,
              web3.utils.toWei("10000000000", "ether")
            )
            .send({ from: context.rootState.account0 })
            .then(() => {
              context.rootState.tokenApprovalInProcess = false;
            });
        }
      }
      if (context.rootState.tokenApprovalInProcess === false) {
        swal("Success", "Token approval Successful!", "success");
      } else {
        swal("Oops!", "Token approval Unsuccessful!", "error");
      }
      context.dispatch("toggleOperationUnderProcess", {
        val: false,
        location: "ApprovTokL",
      });
    } catch (err) {
      console.log(err);
      context.dispatch("toggleOperationUnderProcess", {
        val: false,
        location: "ApprovTokL",
      });
      swal("Oops!", "Token approval Unsuccessful!", "error");
    }
  },

  async addLiquidity(context) {
    context.dispatch("toggleOperationUnderProcess", {
      val: true,
      location: "addLiq",
    });
    context.rootState.canLeave = false;
    await ethFunc
      .addLiquidity(
        context.getters.getLiqDialog.DialnumAdd[0],
        context.getters.getLiqDialog.DialnumAdd[1],
        context.state.liqTokenAmount0,
        context.state.liqTokenAmount1,
        context.state.slippageAddLiq,
        router,
        context.rootState.account0,
        context.state.deadlineAddLiq
      )
      .then((data) => {
        if (data === true) {
          context.rootState.loadAllPairsByFetch = true;
          context.dispatch("registerExistingLiquidity");
        }
        // console.log("here", context.rootState.loadAllPairsByFetch);
        context.dispatch("displayReservesPool");
        context.dispatch("toggleOperationUnderProcess", {
          val: false,
          location: "addLiq",
        });

        context.rootState.canLeave = true;
        context.commit("resetAddLiqState");
        context.rootState.loadAllPairsByFetch = false;
      })
      .catch((err) => {
        context.dispatch("toggleOperationUnderProcess", {
          val: false,
          location: "addLiq",
        });
        context.rootState.canLeave = true;
        console.log(err);
      });
  },

  async displayReservesPool(context) {
    try {
      context.dispatch("toggleOperationUnderProcess", {
        val: true,
        location: "DispResPool",
      });
      const liqReserves = await ethFunc.getReserves(
        context.getters.getLiqDialog.DialnumAdd[0],
        context.getters.getLiqDialog.DialnumAdd[1],
        factory,
        context.rootState.account0
      );
      if (!liqReserves[6]) {
        swal(
          "New pair can be created!",
          "Seems like you are the first one to discover this pair! Add liquidity to create pair and get a staggering 100% owernership of this pool",
          "info"
        );
      }
      context.getters.getLiqTokenRes[0] = liqReserves[0];
      context.getters.getLiqTokenRes[1] = liqReserves[1];
      context.state.pairLiquidity = liqReserves[2];
      context.state.pairLiqPer = liqReserves[3];
      context.state.totalSupply = liqReserves[4];
      context.state.LiqExists = liqReserves[5];
      // console.log("then inside displayReservesPool->", liqReserves);
      context.getters.getLiqTokenBal[0] = await ethFunc.getTokenBalance(
        context.getters.getLiqDialog.DialnumAdd[0],
        context.rootState.account0,
        true
      );
      context.getters.getLiqTokenBal[1] = await ethFunc.getTokenBalance(
        context.getters.getLiqDialog.DialnumAdd[1],
        context.rootState.account0,
        true
      );
      if (
        context.getters.getLiqDialog.DialnumAdd[0] === process.env.VUE_APP_WETH
      ) {
        context.rootState.balance = context.getters.getLiqTokenBal[0];
      } else if (
        context.getters.getLiqDialog.DialnumAdd[1] === process.env.VUE_APP_WETH
      ) {
        context.rootState.balance = context.getters.getLiqTokenBal[1];
      }

      context.dispatch("checkMaxLiqBal");
      context.dispatch("toggleOperationUnderProcess", {
        val: false,
        location: "DispResPool",
      });
      if (context.rootState.coins === null) {
        context.rootState.coins = JSON.parse(localStorage.getItem("coins"));
      }
      for (let i = 0; i < context.rootState.coins.length; ++i) {
        context.rootState.coins[i].balance = await ethFunc.getTokenBalance(
          context.rootState.coins[i].address,
          context.rootState.account0,
          context.rootState.coins[i].marker
        );
      }
    } catch {
      console.log(
        "There seems to be some error retrieving Reserves! Sorry for the inconvenience caused!"
      );
      // alert(
      //   "There seems to be some error retrieving Reserves! Sorry for the inconvenience caused!"
      // );
      context.dispatch("toggleOperationUnderProcess", {
        val: false,
        location: "DispResPool",
      });
    }
  },

  async tokensAreApproved(context) {
    let isETH = false;
    if (
      context.getters.getLiqTokenSymbol[0] === "ETH" ||
      context.getters.getLiqTokenSymbol[1] === "ETH"
    ) {
      isETH = true;
    }
    let address0 = context.getters.getLiqDialog.DialnumAdd[0];
    let address1 = context.getters.getLiqDialog.DialnumAdd[1];
    if (address0 === process.env.VUE_APP_WETH && isETH) {
      const token1 = new web3.eth.Contract(ERC20.abi, address1);
      let approvedAmt1 = web3.utils.fromWei(
        await token1.methods
          .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
          .call(),
        "ether"
      );
      if (Number(approvedAmt1) < Number(context.state.liqTokenAmount1)) {
        context.rootState.tokenApprovalInProcess = true;
      } else {
        context.rootState.tokenApprovalInProcess = false;
      }
    } else if (address1 === process.env.VUE_APP_WETH && isETH) {
      const token0 = new web3.eth.Contract(ERC20.abi, address0);
      let approvedAmt0 = web3.utils.fromWei(
        await token0.methods
          .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
          .call(),
        "ether"
      );
      if (Number(approvedAmt0) < Number(context.state.liqTokenAmount0)) {
        context.rootState.tokenApprovalInProcess = true;
      } else {
        context.rootState.tokenApprovalInProcess = false;
      }
    } else {
      const token0 = new web3.eth.Contract(ERC20.abi, address0);
      let approvedAmt0 = web3.utils.fromWei(
        await token0.methods
          .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
          .call(),
        "ether"
      );
      const token1 = new web3.eth.Contract(ERC20.abi, address1);
      let approvedAmt1 = web3.utils.fromWei(
        await token1.methods
          .allowance(context.rootState.account0, process.env.VUE_APP_ROUTER)
          .call(),
        "ether"
      );
      if (
        Number(approvedAmt0) < Number(context.state.liqTokenAmount0) ||
        Number(approvedAmt1) < Number(context.state.liqTokenAmount1)
      ) {
        context.rootState.tokenApprovalInProcess = true;
      } else {
        context.rootState.tokenApprovalInProcess = false;
      }
    }
  },

  async fillLiqTokenAmt(context, payload) {
    context.dispatch("toggleOperationUnderProcess", {
      val: true,
      location: "fillLiqTokAmt",
    });
    let address0 = context.getters.getLiqDialog.DialnumAdd[0];
    let address1 = context.getters.getLiqDialog.DialnumAdd[1];
    context.dispatch("tokensAreApproved");
    let amount;
    if (
      payload === 1 &&
      ((!context.state.liqWatchInps[0] && !context.state.liqWatchInps[1]) ||
        (context.state.liqWatchInps[0] && !context.state.liqWatchInps[1]))
    ) {
      context.state.liqWatchInps[0] = true;
      amount =
        context.state.liqTokenAmount0 *
        (context.getters.getLiqTokenRes[1] / context.getters.getLiqTokenRes[0]);
      // console.log("from fillAmt", context.state.liqTokenAmount0, amount);
      await ethFunc
        .quoteAddLiquidity(
          address0,
          address1,
          context.state.liqTokenAmount0,
          amount,
          factory,
          0
        )
        .then((data) => {
          context.state.predictedLiq = data;
          context.state.liqTokenAmount1 = context.state.predictedLiq[1];
        });
      setTimeout(() => {
        context.state.liqWatchInps[0] = false;
        context.state.liqWatchInps[1] = false;
        context.dispatch("toggleOperationUnderProcess", {
          val: false,
          location: "fillLiqTokAmt",
        });
      }, 2000);
    } else if (
      payload === 0 &&
      ((!context.state.liqWatchInps[0] && !context.state.liqWatchInps[1]) ||
        (!context.state.liqWatchInps[0] && context.state.liqWatchInps[1]))
    ) {
      context.state.liqWatchInps[1] = true;
      amount =
        context.state.liqTokenAmount1 *
        (context.getters.getLiqTokenRes[0] / context.getters.getLiqTokenRes[1]);
      await ethFunc
        .quoteAddLiquidity(
          address0,
          address1,
          amount,
          context.state.liqTokenAmount1,
          factory,
          1
        )
        .then((data) => {
          context.state.predictedLiq = data;
          context.state.liqTokenAmount0 = context.state.predictedLiq[0];
        });
      setTimeout(() => {
        context.state.liqWatchInps[0] = false;
        context.state.liqWatchInps[1] = false;
        context.dispatch("toggleOperationUnderProcess", {
          val: false,
          location: "fillLiqTokAmt",
        });
      }, 2000);
    }
  },
};
