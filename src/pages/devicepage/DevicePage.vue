<template>
  <div>
    <h2>设备详情</h2>
    <a-row>
      <a-col :span="12">
        <a-card :hoverable="true" style="margin: 1rem">
          <a-table :columns="columns" :data-source="datas"></a-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <div class="map-container" style="height: 42rem;padding: 0.5rem;margin: 1rem;background-color: #eee;">
          <amap
            :zoom="14"
            :center="datas.length != 0 ? datas[0].position : [0, 0]"
          >
            <amap-marker
              :position="datas.length != 0 ? datas[0].position : [0, 0]"
            />
            <amap-polyline :path="map_path" />
          </amap>
        </div>
      </a-col>
    </a-row>
    <h2>{{ selected }}</h2>
    <h2>{{ map_path }}</h2>
    <h2>设备历史数据</h2>
    <h2>{{ datas }}</h2>
    <h2>{{ datas.length }}</h2>
    <h2>设备温度历史数据</h2>
    <h2>{{ temp_history_datas }}</h2>
    <h2>{{ temp_history_datas.length }}</h2>
    <h2>设备湿度历史数据</h2>
    <h2>{{ humi_history_datas }}</h2>
    <h2>{{ humi_history_datas.length }}</h2>
    <h2>设备经度历史数据</h2>
    <h2>{{ le_history_datas }}</h2>
    <h2>{{ le_history_datas.length }}</h2>
    <h2>设备纬度历史数据</h2>
    <h2>{{ ln_history_datas }}</h2>
    <h2>{{ ln_history_datas.length }}</h2>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "上传时间",
    dataIndex: "timeText",
    key: "timeText",
    width: 200,
  },
  {
    title: "温度(℃)",
    dataIndex: "temp",
    key: "temp",
  },
  {
    title: "湿度(R/H %)",
    key: "humi",
    dataIndex: "humi",
  },
  {
    title: "位置",
    key: "location",
    dataIndex: "location",
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 100,
  },
];
function timestampToTime(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = date.getDate() + " ";
  var h = date.getHours() + ":";
  var m = date.getMinutes() + ":";
  var s = date.getSeconds();
  return Y + M + D + h + m + s;
}
import { mapState } from "vuex";
import { get_device_history } from "@/services/onenet";
export default {
  data() {
    return {
      columns,
      temp_device_history: {},
      temp_history_datas: [],
      humi_device_history: {},
      humi_history_datas: [],
      le_device_history: {},
      le_history_datas: [],
      ln_device_history: {},
      ln_history_datas: [],
      // map_path: [],
    };
  },
  created() {
    var timestamp = new Date().valueOf();
    this.get_datas(timestamp - 3600 * 1000 * 24, timestamp);
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("selected_device", ["selected"]),
    datas() {
      let datas = [];
      if (this.temp_history_datas.length == this.humi_history_datas.length) {
        for (let index = 0; index < this.temp_history_datas.length; index++) {
          datas.push({
            key: 0,
            timeText: "",
            temp: 0,
            humi: 0,
            location: "",
            position: [],
          });
        }
        this.temp_history_datas.forEach((data, index) => {
          datas[index].key = index;
          datas[index].timeText = timestampToTime(parseInt(data.time));
          datas[index].temp = data.value;
        });
        this.humi_history_datas.forEach((data, index) => {
          datas[index].humi = data.value;
        });
        this.le_history_datas.forEach((data, index) => {
          datas[index].location = data.value;
          datas[index].position = [parseFloat(data.value)];
        });
        this.ln_history_datas.forEach((data, index) => {
          datas[index].location = datas[index].location + "," + data.value;
          datas[index].position[1] = parseFloat(data.value);
        });
      }
      return datas;
    },
    map_path() {
      let datas = [];
      if (this.datas.length) {
        this.datas.forEach((data) => {
          datas.push(data.position);
        });
      }
      return datas;
    },
  },
  methods: {
    //获取温度基础方法
    async get_temp_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.user.name,
          type: this.selected["type"],
          device_name: this.selected["id"],
          start_time: end_time - timespan,
          end_time,
          identifier,
          offset,
          limit,
        })
          .then((result) => {
            this.temp_device_history = JSON.parse(
              result.data.msg.body
            ).data.list;
            resolve(JSON.parse(result.data.msg.body).data.list);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //获取最大一周内的温度
    async get_temp_history_in_a_week(end_time, timespan) {
      let offset = 0;
      let revdatas = [];
      do {
        revdatas = await this.get_temp_history(
          end_time,
          timespan,
          "temp",
          100,
          offset * 100
        );
        offset++;
        console.log(revdatas.length);
        this.temp_history_datas = this.temp_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的温度数据
    async get_temp_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        console.log("to:", to);
        console.log("from:", to - 3600 * 1000 * 24 * 7);
        this.get_temp_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      console.log("to:", to);
      console.log("from:", from);
      this.get_temp_history_in_a_week(to, to - from);
    },
    //获取湿度基础方法
    async get_humi_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.user.name,
          type: this.selected["type"],
          device_name: this.selected["id"],
          start_time: end_time - timespan,
          end_time,
          identifier,
          offset,
          limit,
        })
          .then((result) => {
            this.humi_device_history = JSON.parse(
              result.data.msg.body
            ).data.list;
            resolve(JSON.parse(result.data.msg.body).data.list);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //获取最大一周内的湿度
    async get_humi_history_in_a_week(end_time, timespan) {
      let offset = 0;
      let revdatas = [];
      do {
        revdatas = await this.get_humi_history(
          end_time,
          timespan,
          "humi",
          100,
          offset * 100
        );
        offset++;
        console.log(revdatas.length);
        this.humi_history_datas = this.humi_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的湿度数据
    async get_humi_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        console.log("to:", to);
        console.log("from:", to - 3600 * 1000 * 24 * 7);
        this.get_humi_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      console.log("to:", to);
      console.log("from:", from);
      this.get_humi_history_in_a_week(to, to - from);
    },
    //获取经度基础方法
    async get_le_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.user.name,
          type: this.selected["type"],
          device_name: this.selected["id"],
          start_time: end_time - timespan,
          end_time,
          identifier,
          offset,
          limit,
        })
          .then((result) => {
            this.le_device_history = JSON.parse(result.data.msg.body).data.list;
            resolve(JSON.parse(result.data.msg.body).data.list);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //获取最大一周内的经度
    async get_le_history_in_a_week(end_time, timespan) {
      let offset = 0;
      let revdatas = [];
      do {
        revdatas = await this.get_le_history(
          end_time,
          timespan,
          "le",
          100,
          offset * 100
        );
        offset++;
        console.log(revdatas.length);
        this.le_history_datas = this.le_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的经度数据
    async get_le_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        console.log("to:", to);
        console.log("from:", to - 3600 * 1000 * 24 * 7);
        this.get_le_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      console.log("to:", to);
      console.log("from:", from);
      this.get_le_history_in_a_week(to, to - from);
    },
    //获取纬度基础方法
    async get_ln_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.user.name,
          type: this.selected["type"],
          device_name: this.selected["id"],
          start_time: end_time - timespan,
          end_time,
          identifier,
          offset,
          limit,
        })
          .then((result) => {
            this.ln_device_history = JSON.parse(result.data.msg.body).data.list;
            resolve(JSON.parse(result.data.msg.body).data.list);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    //获取最大一周内的纬度
    async get_ln_history_in_a_week(end_time, timespan) {
      let offset = 0;
      let revdatas = [];
      do {
        revdatas = await this.get_ln_history(
          end_time,
          timespan,
          "ln",
          100,
          offset * 100
        );
        offset++;
        console.log(revdatas.length);
        this.ln_history_datas = this.ln_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的纬度数据
    async get_ln_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        console.log("to:", to);
        console.log("from:", to - 3600 * 1000 * 24 * 7);
        this.get_ln_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      console.log("to:", to);
      console.log("from:", from);
      this.get_ln_history_in_a_week(to, to - from);
    },
    //整理datas
    async get_datas(form, to) {
      await this.get_temp_history_from_to(form, to);
      await this.get_humi_history_from_to(form, to);
      await this.get_le_history_from_to(form, to);
      await this.get_ln_history_from_to(form, to);
    },
  },
};
</script>

<style>
</style>