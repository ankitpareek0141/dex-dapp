export default {
  swapDialog(state, payload) {
    state.swapDialog.bool = payload;
  },
  checkMaxBal(state) {
    if (
      state.amountToken0 > state.tokenBalText[0] ||
      state.tokenBalText[0] == 0
    ) {
      state.insufficientBal = true;
    } else {
      state.insufficientBal = false;
    }
  },
};
