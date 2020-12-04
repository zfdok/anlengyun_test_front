<template>
  <div>
    <a-card
      class="product_card"
      :style="card_header_style"
      style="border-radius: 2rem; padding: 0"
    >
      <div style="font-size: 0.5rem; color: #ddd">设备名: {{ item.id }}</div>
      <div style="font-size: 1.7rem; color: #fff">{{ item.name }}</div>
      <div style="font-size: 1.2rem; color: #123">
        温度:
        <span style="font-size: 2rem; font-weight: bold">{{ item.temp }}</span>
        ℃
      </div>
      <div style="font-size: 1.2rem; color: #123">
        湿度:
        <span style="font-size: 1.7rem; font-weight: bold">
          {{ item.humi }}</span
        >
        %
      </div>
      <div>
        <a-tag color="#16a085" v-if="item.status == 2">在线</a-tag>
        <a-tag color="#c0392b" v-if="item.status == 3">离线</a-tag>
        <a-tag color="#57606f" v-if="item.status == 1">未激活</a-tag>
      </div>
      <div
        style="
          height: 2rem;
          color: #eee;
          overflow: visible;
          text-wrap: unrestricted;
          white-space: normal;
        "
      >
        {{ item.timeinfo }}
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get_device, get_devicedetail } from "@/services/onenet";
export default {
  name: "Pd_card",
  data() {
    return {
      item: {
        id: this.show_item.device_name,
        name: "undefined",
        type: "zx",
        temp: 0.0,
        humi: 0.0,
        status: 1,
        timeinfo: "",
      },
      item2: this.show_item,
    };
  },
  props: {
    show_item: Object,
  },
  created() {
    // 获取设备信息
    this.card_get_device();
    // 获取数据点信息
    this.card_get_devicedetail();
  },
  computed: {
    ...mapState("account", ["user"]),
    card_header_style() {
      let style = {};
      if (this.show_item.status == 2) {
        style["background-color"] = "#05c46b";
      } else if (this.show_item.status == 3) {
        style["background-color"] = "#ff5e57";
      } else {
        style["background-color"] = "#808e9b";
      }
      return style;
    },
  },
  methods: {
    // 获取设备信息
    card_get_device() {
      switch (this.show_item.product_name) {
        case "智能保温箱":
          this.item.type = "znbwx";
          break;
        case "冷链车":
          this.item.type = "llc";
          break;
        case "智慧冷库":
          this.item.type = "zhlk";
          break;
        case "冷藏集装箱":
          this.item.type = "lcjzx";
          break;
        default:
          break;
      }
      get_device({
        user: this.user.name,
        type: this.item.type,
        device_name: this.show_item.device_name,
      })
        .then((result) => {
          console.log(result);
          let temp = JSON.parse(result.data.msg.body);
          this.item.name = temp.data.desc == "" ? "未名设备" : temp.data.desc;
          this.item.status = temp.data.status;
          switch (temp.data.status) {
            case 2:
              this.item.timeinfo = "该设备当前在线\r\n";
              break;
            case 3:
              this.item.timeinfo = `最后上线:${new Date(
                temp.data.last_time
              ).toLocaleString()}`;
              break;
            default:
              this.item.timeinfo = "该设备未激活";
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取设备数据点
    card_get_devicedetail() {
      // 获取数据点
      get_devicedetail({
        user: this.user.name,
        type: this.item.type,
        device_name: this.show_item.device_name,
      })
        .then((result) => {
          let revdatas = JSON.parse(result.data.msg.body).data.list;
          revdatas.forEach((datapoint) => {
            if (datapoint.identifier == "temp") {
              this.item.temp = datapoint.value != "" ? datapoint.value : "--";
            } else if (datapoint.identifier == "humi") {
              this.item.humi = datapoint.value != "" ? datapoint.value : "--";
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.product_card:hover {
  box-shadow: 5px, 5px, 5px, #123;
}
.product_card {
  background-color: #eee;
  padding: 0;
  .ant-card {
    padding: 0;
    background-color: #ccc;
  }
}
</style>