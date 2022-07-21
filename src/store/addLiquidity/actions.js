import * as ethFunc from "../../ethereumFunctions.js";

const router = ethFunc.getRouter(process.env.VUE_APP_ROUTER);
const factory = ethFunc.getFactory(process.env.VUE_APP_FACTORY);

export default {
  closeLiqDialog(context) {
    context.commit("liqDialog", false);
  },

  openLiqDialog(context) {
    context.commit("liqDialog", true);
  },

  async displayMaxTokenBalanceLiq(context, payload) {
    context.getters.getLiqTokenBal[payload.ind] = await ethFunc.getTokenBalance(
      payload.add
    );
  },

  async addLiquidity(context) {
    context.dispatch("toggleOperationUnderProcess", true);
    await ethFunc
      .addLiquidity(
        context.getters.getLiqDialog.DialnumAdd[0],
        context.getters.getLiqDialog.DialnumAdd[1],
        context.state.liqTokenAmount0,
        context.state.liqTokenAmount1,
        0,
        0,
        router,
        context.rootState.account0
      )
      .then(() => {
        context.dispatch("displayReservesPool");
        context.dispatch("toggleOperationUnderProcess", false);
      })
      .catch((err) => {
        context.dispatch("toggleOperationUnderProcess", false);
        console.log(err);
      });
  },

  async displayReservesPool(context) {
    context.dispatch("toggleOperationUnderProcess", true);
    const liqReserves = await ethFunc.getReserves(
      context.getters.getLiqDialog.DialnumAdd[0],
      context.getters.getLiqDialog.DialnumAdd[1],
      factory,
      context.rootState.account0
    );
    context.getters.getLiqTokenRes[0] = liqReserves[0];
    context.getters.getLiqTokenRes[1] = liqReserves[1];
    context.state.pairLiquidity = liqReserves[2];
    // console.log("then inside displayReservesPool->", liqReserves);
    context.getters.getLiqTokenBal[0] = await ethFunc.getTokenBalance(
      context.getters.getLiqDialog.DialnumAdd[0]
    );
    context.getters.getLiqTokenBal[1] = await ethFunc.getTokenBalance(
      context.getters.getLiqDialog.DialnumAdd[1]
    );
    context.dispatch("toggleOperationUnderProcess", false);
  },

  async fillLiqTokenAmt(context, payload) {
    let address0;
    let address1;
    let amount;
    if (payload === 1) {
      address0 = context.getters.getLiqDialog.DialnumAdd[0];
      address1 = context.getters.getLiqDialog.DialnumAdd[1];
    } else {
      address1 = context.getters.getLiqDialog.DialnumAdd[0];
      address0 = context.getters.getLiqDialog.DialnumAdd[1];
    }
    amount =
      context.state.liqTokenAmount0 *
      (context.getters.getLiqTokenRes[1] / context.getters.getLiqTokenRes[0]);
    await ethFunc
      .quoteAddLiquidity(
        address0,
        address1,
        context.state.liqTokenAmount0,
        amount,
        factory
      )
      .then((data) => {
        context.state.predictedLiq = data;
        context.state.liqTokenAmount1 = context.state.predictedLiq[1];
      });
  },
};