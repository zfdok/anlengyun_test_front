<template>
  <div>
    <a-card style="height: 33rem; box-shadow: 2px 2px 10px #bbbbbb">
      <h2 v-show="item == 0">在线温湿度监测仪</h2>
      <h2 v-show="item == 1">蓝牙温湿度记录</h2>
      <h2 v-show="item == 2">医用保温箱</h2>
      <h2 v-show="item == 3">冷链车</h2>
      <div v-show="item == 0">
        <a-list
          :grid="{ gutter: 24, lg: 6, md: 3, sm: 2, xs: 1 }"
          :dataSource="device_datas"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <h2>{{ item.id }}</h2>
          </a-list-item>
        </a-list>
      </div>
      <div v-show="item == 1">
        <h2>暂无蓝牙温湿度记录仪设备</h2>
      </div>
      <div v-show="item == 2">
        <h2>暂无医用保温箱设备</h2>
      </div>
      <div v-show="item == 3">
        <h2>暂无冷链车设备</h2>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState} from "vuex";
let device_datas_online = [];
let device_datas_offline = [];
let device_datas_error = [];
let device_datas = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
];
export default {
  name: "ProductDetail",
  data() {
    return {
      item: this.current_select_item,
      device_datas,
      device_datas_online,
      device_datas_offline,
      device_datas_error,
    };
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("device_jcsb", ["dataSource"]),
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
};
</script>

<style>
</style>