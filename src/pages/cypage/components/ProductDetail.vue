<template>
  <div>
    <a-card
      style="
        height: 33rem;
        box-shadow: 2px 2px 10px #bbbbbb;
        overflow: scroll;
        overflow-x: hidden;
      "
    >
      <h2 v-show="item == 0">智能保温箱</h2>
      <h2 v-show="item == 1">冷链车</h2>
      <h2 v-show="item == 2">智慧冷库</h2>
      <h2 v-show="item == 3">冷藏集装箱</h2>
      <div v-show="item == 0">
        <a-list
          :grid="{ gutter: 24, xl: 6, lg: 3, md: 3, sm: 2, xs: 1 }"
          :dataSource="dataSource[0].all_device"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <Pd_card :show_item="item" v-if="!card_flash"></Pd_card>
          </a-list-item>
        </a-list>
      </div>
      <div v-show="item == 1">
        <a-list
          :grid="{ gutter: 24, xl: 6, lg: 3, md: 3, sm: 2, xs: 1 }"
          :dataSource="dataSource[1].all_device"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- {{item}} -->
            <Pd_card :show_item="item" v-if="!card_flash"></Pd_card>
          </a-list-item>
        </a-list>
      </div>
            <div v-show="item == 2">
        <a-list
          :grid="{ gutter: 24, xl: 6, lg: 3, md: 3, sm: 2, xs: 1 }"
          :dataSource="dataSource[2].all_device"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- {{item}} -->
            <Pd_card :show_item="item" v-if="!card_flash"></Pd_card>
          </a-list-item>
        </a-list>
      </div>
            <div v-show="item == 3">
        <a-list
          :grid="{ gutter: 24, xl: 6, lg: 3, md: 3, sm: 2, xs: 1 }"
          :dataSource="dataSource[3].all_device"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- {{item}} -->
            <Pd_card :show_item="item" v-if="!card_flash"></Pd_card>
          </a-list-item>
        </a-list>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pd_card from "../../../components/pd_components/pd_card";
export default {
  name: "ProductDetail",
  components: {
    Pd_card,
  },
  data() {
    return {
      item: this.current_select_item,
      zx_data: [],
      card_flash:false
    };
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("device_cysb", ["dataSource"]),
    ...mapState("setting", ["isMobile"]),
  },
  props: {
    current_select_item: Number,
  },
  watch: {
    current_select_item(newVal) {
      this.item = newVal;
    },
  },
  created() {
    setInterval(() => {
      this.reload();
    }, 60000);
  },
  methods: {
    reload() {
      this.card_flash= true;
      this.$nextTick(() => (this.card_flash = false));
    },
  },
};
</script>

<style>
</style>