export default {
  swapDialog(state, payload) {
    state.swapDialog.bool = payload;
  },
  checkMaxBal(state, payload) {
    if (payload === 0) {
      if (
        Number(state.amountToken0) > Number(state.tokenBalText[0]) ||
        Number(state.tokenBalText[0]) == 0
      ) {
        state.insufficientBal = true;
      } else {
        state.insufficientBal = false;
      }
    } else if (payload === 1) {
      if (
        Number(state.amountToken1) > Number(state.tokenBalText[1]) ||
        Number(state.tokenBalText[1]) == 0
      ) {
        state.insufficientBal = true;
      } else {
        state.insufficientBal = false;
      }
    }
  },

  resetSwapState(state) {
    state.amountToken0 = null;
    state.amountToken1 = null;
    state.watchInputs = [false, false];
  },

  calcPriceImp(state, payload) {
    const amountInWithFee = Number(state.amountToken0) * (1 - 0.003);
    const reserve_a_initial = Number(payload.TA1);
    const reserve_b_initial = Number(payload.TA2);
    const constant_product = reserve_a_initial * reserve_b_initial;
    const reserve_b_after_execution =
      constant_product / (reserve_a_initial + amountInWithFee);
    const amountOut = reserve_b_initial - reserve_b_after_execution;
    const market_price = amountInWithFee / amountOut;
    const mid_price = reserve_a_initial / reserve_b_initial;
    const price_impact = 1 - mid_price / market_price;
    state.priceImpValBack = (price_impact * 100).toFixed(4);
  },
};
