<template>
  <div class="card">
    <div class="top-gear">
      <router-link to="/pool" class="back-but">
        <button>Back</button>
      </router-link>
      <base-gear></base-gear>
    </div>
    <p>Remove Liquidity</p>
    <!-- <hr /> -->
    <div class="main-swap">
      <div class="inp-swap">
        <span>{{ symbolVal[0] }}-{{ symbolVal[1] }} LP</span>
        <input
          type="number"
          placeholder="0.0"
          step="any"
          min="0"
          name="token0"
          id="token0"
          v-model.trim="$store.state.remLiquidity.pairLiqInp"
        />
      </div>
      <small v-if="displayWalletStatus">
        <span class="max-amt" @click="fillInputWithMaxAmt()">MAX</span> :
        {{ $store.state.remLiquidity.pairLiquidity }}</small
      >

      <base-range-slider></base-range-slider>
    </div>
    <div v-if="$store.state.remLiquidity.insufficientRemLiqBal">
      <button
        :disabled="$store.state.remLiquidity.insufficientRemLiqBal"
        :class="{
          'button-disabled': $store.state.remLiquidity.insufficientRemLiqBal,
          'swap-button': true,
        }"
      >
        Insufficient {{ symbolVal[0] }}-{{ symbolVal[1] }} LP Balance
      </button>
    </div>
    <div v-else-if="!remLiqActive">
      <button class="swap-button">Enter Amount</button>
    </div>
    <div v-else>
      <div v-if="$store.state.tokenApprovalInProcess">
        <button
          :disabled="$store.state.operationUnderProcess"
          :class="{
            'button-disabled': $store.state.operationUnderProcess,
            'swap-button': true,
          }"
          @click="approveRemLiq()"
        >
          Approve Kajuswap to use {{ symbolVal[0] }}-{{ symbolVal[1] }} LP
        </button>
      </div>
      <button
        :disabled="
          $store.state.operationUnderProcess ||
          $store.state.tokenApprovalInProcess
        "
        :class="{
          'button-disabled':
            $store.state.operationUnderProcess ||
            $store.state.tokenApprovalInProcess,
          'swap-button': true,
        }"
        @click="remLiquidity()"
      >
        Remove Liquidity
      </button>
    </div>
  </div>
  <bal-res-section></bal-res-section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BalResSection from "../components/layout/BalResSecRemLiq.vue";
import { defineAsyncComponent } from "vue";
import swal from "sweetalert";

const BaseRangeSlider = defineAsyncComponent(() =>
  import("../components/UI/BaseRangeSlider.vue")
);

export default {
  components: { BalResSection, BaseRangeSlider },
  data() {
    return {
      remLiqActive: false,
    };
  },
  methods: {
    ...mapActions({
      approveRemLiq: "approveRemLiq",
      remLiquidity: "removeLiquidity",
      checkForBalDispPV: "checkMaxRemLiqBalDispPV",
    }),

    fillInputWithMaxAmt() {
      this.$store.state.remLiquidity.pairLiqInp =
        this.$store.state.remLiquidity.pairLiquidity;
    },
  },
  computed: {
    ...mapGetters({
      displayWalletStatus: "displayWalletStatus",
      symbolVal: "getSymbol",
    }),
  },
  watch: {
    "$store.state.remLiquidity.pairLiqInp"(newVal) {
      if (newVal != null) {
        this.checkForBalDispPV();
        if (this.$store.state.remLiquidity.pairLiqInp) {
          this.remLiqActive = true;
        } else {
          this.remLiqActive = false;
        }
      } else {
        this.remLiqActive = false;
      }
    },
    "$store.state.remLiquidity.pairLiquidity"(newVal) {
      if (newVal < 1e-12) {
        swal(
          "Info",
          "Since you have removed the full share of Liquidity you added, you can no longer remove LP Tokens from this pool! Hence you are being redirected to the pools page!",
          "info"
        );
        this.$router.push("/pool");
      }
    },
  },
  beforeRouteLeave(_, _2, next) {
    if (this.$store.state.canLeave == true) {
      this.$store.commit("resetRemLiqState");
      next();
    } else {
      next(false);
      swal("Alert", "Please wait for the transaction to end!", "warning");
    }
  },
};
</script>

<style scoped>
input {
  font-size: 1rem;
  height: 2rem;
}
.max-amt {
  cursor: pointer;
}

ul:hover {
  background-color: rgb(226, 177, 118);
}

.top-gear {
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
}

.back-but {
  padding: 0 0.5rem;
}
</style>
