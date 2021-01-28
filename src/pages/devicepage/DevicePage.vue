<template>
  <div>
    <h2 style="text-align: center">设备历史记录</h2>
    <a-row>
      <a-col :span="8">
        <a-range-picker
          style="margin-left: 3rem"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @ok="onDateSelOk"
        />
        <a-button style="margin-left: 1rem" type="primary" @click="onOK"
          >历史查询</a-button
        >
      </a-col>

      <a-col :span="8">
        <span
          >近
          <a-input-number
            id="inputNumber"
            v-model="queryhours"
            :min="1"
            :max="48"
            @change="onQueryHoursChange"
          />
          小时
          <a-button style="margin-left: 1rem" type="primary" @click="onOK"
            >数据查询</a-button
          ></span
        >
      </a-col>
      <a-col :span="8">
        <a-button style="margin-left: 1rem" type="primary" @click="query1days"
          >最近一天数据查询</a-button
        >
        <a-button style="margin-left: 1rem" type="primary" @click="query3days"
          >最近三天数据查询</a-button
        >
        <a-button style="margin-left: 1rem" type="primary" @click="query7days"
          >最近一周数据查询</a-button
        >
      </a-col>
      <!-- <a-col :span="8">
        <span
          >近
          <a-input-number
            id="inputNumber"
            v-model="queryitems"
            :min="10"
            :max="100"
            :step="10"
            @change="onQueryHoursChange"
          />
          条
          <a-button style="margin-left: 1rem" type="primary" @click="onOK"
            >数据查询</a-button
          ></span
        >
      </a-col> -->
    </a-row>
    <a-row>
      <a-col :span="12">
        <div id="myChart" :style="{ height: '300px' }"></div>
      </a-col>
      <a-col :span="12">
        <div id="myChart2" :style="{ height: '300px' }"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <a-card :hoverable="true" style="margin: 1rem">
          <a-table :columns="columns" :data-source="datas">
            <span slot="action" slot-scope="record"
              ><a-popover>
                <template slot="title">
                  <p color="#1abc9c" style="textalign: center;font-size: 1.5em;font-weight:bold"
                    >历史数据快照</p
                  >
                </template>
                <template slot="content">
                  <!-- <p>{{ record }}</p> -->
                  <p style="width: 20rem;font-weight:bold"><a-tag color="red" style="font: 1em sans-serif"
                      >上传时间:</a-tag
                    >{{ record.timeText }}</p>
                  <p style="font-weight:bold">
                    <a-tag color="blue" style="font: 1em sans-serif"
                      >历史温度:</a-tag
                    >{{ record.temp }}℃
                  </p>
                  <p style="font-weight:bold">
                    <a-tag color="orange" style="font: 1em sans-serif"
                      >历史湿度:</a-tag
                    >{{ record.humi }}%
                  </p>
                  <p style="font-weight:bold">
                    <a-tag color="purple" style="font: 1em sans-serif"
                      >历史位置:</a-tag
                    >东经:{{ record.position[0]}}°，北纬:{{ record.position[1]}}°
                  </p>
                  <div class="map-container" style="height: 15rem">
                    <amap :zoom="10" :center="record.position">
                      <amap-marker :position="record.position" />
                    </amap>
                  </div>
                </template>
                <a-tag color="#16a085">数据快照</a-tag>
              </a-popover></span
            >
          </a-table>
        </a-card>
      </a-col>
      <a-col :span="12">
        <div
          class="map-container"
          style="
            height: 42rem;
            padding: 0.5rem;
            margin: 1rem;
            background-color: #eee;
          "
        >
          <amap
            v-if="mapvisible"
            :zoom="14"
            :center="
              map_path[0] != undefined ? map_path[0] : [last_le, last_ln]
            "
          >
            <amap-marker
              :position="
                map_path[0] != undefined ? map_path[0] : [last_le, last_ln]
              "
            />
            <amap-polyline :path="map_path" />
          </amap>
        </div>
      </a-col>
    </a-row>
    <!-- <h2>{{ selected }}</h2>
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
    <h2>设备[]数据</h2>
    <h2>{{ chart_datas }}</h2>
    <h2>{{ chart_datas.length }}</h2> -->
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
    scopedSlots: { customRender: "action" },
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
      columns, //列表展示项
      temp_device_history: {},
      temp_history_datas: [],
      humi_device_history: {},
      humi_history_datas: [],
      le_device_history: {},
      le_history_datas: [],
      ln_device_history: {},
      ln_history_datas: [],
      mapvisible: false,
      last_le: 0,
      last_ln: 0,
      start_time: 0,
      end_time: 0,
      queryhours: 3,
      queryitems: 30,
      // map_path: [],
    };
  },
  mounted() {
    this.drawTemp();
    this.drawHumi();
  },
  created() {
    this.last_le = this.selected.le;
    this.last_ln = this.selected.ln;
    var timestamp = new Date().valueOf();
    this.start_time = timestamp - 3600 * 1000 * 3;
    this.end_time = timestamp;
    this.get_datas(this.start_time, this.end_time).then(() => {
      this.mapvisible = true;
    });
  },
  watch: {
    chart_datas: function (v) {
      console.log(v);
      this.drawTemp();
      this.drawHumi();
    },
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
          if (datas[index] != undefined) {
            datas[index].location = data.value;
            datas[index].position = [parseFloat(data.value)];
          }
        });
        this.ln_history_datas.forEach((data, index) => {
          if (datas[index] != undefined) {
            datas[index].location = datas[index].location + "," + data.value;
            datas[index].position[1] = parseFloat(data.value);
          }
        });
      }
      return datas;
    },
    chart_datas() {
      let datas = [];
      if (this.temp_history_datas.length == this.humi_history_datas.length) {
        for (let index = 0; index < this.temp_history_datas.length; index++) {
          datas.push([]);
        }
        this.temp_history_datas.forEach((data, index) => {
          // datas[index].push(index);
          datas[index].push(timestampToTime(parseInt(data.time)));
          datas[index].push(parseFloat(data.value));
        });
        this.humi_history_datas.forEach((data, index) => {
          datas[index].push(parseFloat(data.value));
        });
      }
      return datas.reverse();
    },
    map_path() {
      let datas = [];
      if (this.datas.length) {
        this.datas.forEach((data) => {
          datas.push(data.position);
        });
      }
      if (datas.length) {
        return datas;
      } else {
        return [[0, 0]];
      }
    },
  },
  methods: {
    onQueryHoursChange(value) {
      console.log(value);
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * value;
      this.end_time = timestamp;
    },
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
      this.mapvisible = false;
      await this.get_temp_history_from_to(form, to);
      await this.get_humi_history_from_to(form, to);
      await this.get_le_history_from_to(form, to);
      await this.get_ln_history_from_to(form, to);
    },
    onDateSelOk(value) {
      console.log("onOk: ", value);
      let start_time = new Date(value[0]._d).getTime();
      let end_time = new Date(value[1]._d).getTime();
      this.start_time = start_time;
      this.end_time = end_time;
    },
    async onOK() {
      this.mapvisible = false;
      this.temp_device_history = {};
      this.temp_history_datas = [];
      this.humi_device_history = {};
      this.humi_history_datas = [];
      this.le_device_history = {};
      this.le_history_datas = [];
      this.ln_device_history = {};
      this.ln_history_datas = [];
      this.get_datas(this.start_time, this.end_time).then(() => {
        this.mapvisible = true;
      });
    },
    getDataDetails(value) {
      console.log("haha", value);
    },
    drawTemp() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "温度(℃)" },
        tooltip: {},
        xAxis: {
          type: "category",
        },
        yAxis: {},
        dataset: {
          source: this.chart_datas,
        },
        series: [
          {
            type: "line",
            encode: { x: 0, y: 1 },
          },
        ],
      });
    },
    drawHumi() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption({
        title: { text: "湿度(RH %)" },
        tooltip: {},
        xAxis: {
          type: "category",
        },
        yAxis: {},
        dataset: {
          source: this.chart_datas,
        },
        series: [
          {
            type: "line",
            encode: { x: 0, y: 2 },
          },
        ],
      });
    },
    query1days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24;
      this.end_time = timestamp;
      this.onOK();
    },
    query3days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24 * 3;
      this.end_time = timestamp;
      this.onOK();
    },
    query7days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24 * 7;
      this.end_time = timestamp;
      this.onOK();
    },
  },
};
</script>

<style>
</style>