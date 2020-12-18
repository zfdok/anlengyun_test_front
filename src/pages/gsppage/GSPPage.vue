<template>
  <div class="card-list">
    <ProductCard @change_main_page_item="change_main_page_item"></ProductCard>
    <ProductDetail :current_select_item="current_select_item"></ProductDetail>
  </div>
</template>

<script>
import ProductDetail from "./components/ProductDetail";
import ProductCard from "./components/ProductCard";
import { mapGetters } from "vuex";
export default {
  components: {
    ProductDetail,
    ProductCard,
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  data() {
    return {
      current_select_item: 0,
    };
  },
  created() {},
  methods: {
    change_main_page_item(item) {
      this.current_select_item = item;
    },
  },
};
</script>

<style lang="less" scoped>
</style>