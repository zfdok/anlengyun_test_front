<template>
  <div>
    <a-popover :title="item.name + '  (' + item.id + ')'" > 
      <template slot="content">
        <a-row style="width: 300px; height: 300px"> 
          <a-col :span="12">
            <div style="font-size: 1.2rem; color: #0084ff">
              <span style="font-size: 2rem; font-weight: bold">{{
                item.temp
              }}</span
              >℃
            </div>
          </a-col>
          <a-col :span="12">
            <div style="font-size: 1.2rem; color: #ee5a24">
              <span style="font-size: 2rem; font-weight: bold">{{
                item.humi
              }}</span
              >%
            </div>
          </a-col>
          <a-col :span="24">
            <div
              class="map-container"
              style="height: 15rem"
              v-if="item.le != '0'"
            >
              <amap :zoom="10" :center="[item.le, item.ln]">
                <amap-marker :position="[item.le, item.ln]" />
              </amap>
            </div>
            <div v-else>
              暂无位置信息
            </div>
          </a-col>
        </a-row>
      </template>
      <a-card
        class="product_card"
        :style="card_header_style"
        :hoverable="true"
        style="border-radius: 1rem; padding: 0"
        @click="toDevicedetailPage"
      >
        <div style="font-size: 0.5rem; color: #ddd">设备名: {{ item.id }}</div>
        <div style="font-size: 1.4rem; color: #fff">{{ item.name }}</div>
        <div style="font-size: 1.2rem; color: #123">
          温度:
          <span style="font-size: 2rem; font-weight: bold">{{
            item.temp
          }}</span>
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
    </a-popover>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { get_device, get_device_latest } from "@/services/onenet";
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
        le: 0.0,
        ln: 0.0,
        status: 1,
        timeinfo: "",
        product_id: "",
        last_time: "",
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
    this.card_get_device_latest();
  },
  computed: {
    ...mapState("account", ["user"]),
    card_header_style() {
      let style = {};
      let now_date = new Date();
      let last_time = new Date(this.item.last_time);
      if (this.show_item.status == 2 || now_date - last_time < 300000) {
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
    ...mapMutations("selected_device", ["set_selected"]),
    // 获取设备信息
    card_get_device() {
      switch (this.show_item.product_name) {
        case "在线温湿度监测仪":
          this.item.type = "zx";
          break;
        case "蓝牙温湿度记录仪":
          this.item.type = "ly";
          break;
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
        case "医疗保温箱":
          this.item.type = "ylbwx";
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
          let temp = JSON.parse(result.data.msg.body);
          this.item.product_id = temp.data.product_id;
          this.item.last_time = temp.data.last_time;
          this.item.name = temp.data.desc == "" ? "未名设备" : temp.data.desc;
          let now_date = new Date();
          let last_time = new Date(this.item.last_time);
          if (temp.data.status == 2 || now_date - last_time < 300000) {
            this.item.status = 2;
          } else {
            this.item.status = temp.data.status;
          }
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
    card_get_device_latest() {
      // 获取数据点
      get_device_latest({
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
            } else if (datapoint.identifier == "le") {
              this.item.le = datapoint.value != "" ? datapoint.value : "0";
            } else if (datapoint.identifier == "ln") {
              this.item.ln = datapoint.value != "" ? datapoint.value : "0";
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toDevicedetailPage() {
      this.set_selected(this.item);
      this.$router.push({ path: "/device", query: { device: this.item } });
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
  box-shadow: 15px, 15px, 15px, #123;
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