<template>
  <div>
    <div class="headbar">
      <a-row type="flex" justify="end">
        <a-col style="color: #eee" :span="2">
          <a-button type="link" style="color: #eee" @click="toHomePage">
            <a-icon type="home" style="color: #eee"></a-icon>返回主页
          </a-button>
        </a-col>
        <a-col style="color: #eee" :span="18"> </a-col>
        <a-col style="color: #eee" :span="4">
          当前模式: 时间模式
          <a-button type="link" @click="toDevicedetailPage2"
            >切换至业务模式</a-button
          >
        </a-col>
      </a-row>
    </div>
    <h2 style="text-align: center; font-weight: bold">设备历史记录</h2>
    <a-row>
      <a-col :span="isMobile ? 18 : 7">
        <a-range-picker
          :style="isMobile ? 'width:100%' : 'margin-left: 3rem'"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @ok="onDateSelOk"
          :disabled-date="disabledDate"
        />
      </a-col>
      <a-col :span="isMobile ? 6 : 2">
        <a-button
          type="primary"
          :style="isMobile ? 'margin-bottom : 0.5rem' : ''"
          @click="onOK1"
          >历11</a-button
        >
        <a-button
          type="primary"
          :style="isMobile ? 'margin-bottom : 0.5rem' : ''"
          @click="onOK"
          >历史查询</a-button
        ></a-col
      >
      <a-col :span="isMobile ? 0 : 2">
        <div class="hello">
          <download-excel
            :data="json_data"
            :fields="json_fields"
            worksheet="导出数据"
            :name="excelname"
          >
            <a-button type="primary" @click="mkexcel">导出数据</a-button>
          </download-excel>
        </div>
      </a-col>

      <a-col :span="isMobile ? 24 : 6">
        <a-row>
          <a-col :span="18" :style="{ textAlign: 'center' }"
            ><span
              >近
              <a-input-number
                id="inputNumber"
                v-model="queryhours"
                :min="1"
                :max="48"
                @change="onQueryHoursChange"
              />
              小时
            </span></a-col
          >
          <a-col :span="6"
            ><a-button
              type="primary"
              @click="queryByHours"
              :style="isMobile ? 'margin-bottom : 0.5rem' : ''"
              >数据查询</a-button
            ></a-col
          >
        </a-row>
      </a-col>
      <a-col :span="isMobile ? 24 : 2">
        <a-button type="primary" :block="isMobile" @click="query1days"
          >最近一天数据查询</a-button
        >
      </a-col>
      <a-col :span="isMobile ? 24 : 2">
        <a-button
          :style="{ backgroundColor: '#b4d5fa' }"
          :block="isMobile"
          @click="query3days"
          >最近三天数据查询</a-button
        >
      </a-col>
      <a-col :span="isMobile ? 24 : 2">
        <a-button type="primary" :block="isMobile" @click="query7days"
          >最近一周数据查询</a-button
        >
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="isMobile ? 24 : 12">
        <div id="myChart" :style="{ height: '300px' }"></div>
      </a-col>
      <a-col :span="isMobile ? 24 : 12">
        <div id="myChart2" :style="{ height: '300px' }"></div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="isMobile ? 24 : 12">
        <div
          class="map-container"
          style="
            width: 100%;
            height: 42rem;
            padding: 0.5rem;
            margin: 1rem;
            background-color: #eee;
          "
        >
          <baidu-map
            style="width: 100%; height: 42rem"
            :scroll-wheel-zoom="true"
            mapType="BMAP_NORMAL_MAP"
            :center="
              map_path[0] != undefined
                ? map_path[0]
                : { lng: last_le, lat: last_ln }
            "
            :zoom="13"
            ak="kb7cVym4jgEbuVs5EG6vPFer5vXNkpB1"
          >
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-navigation
              anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
              type="BMAP_NAVIGATION_CONTROL_LARGE"
            ></bm-navigation>
            <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
              anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type>
            <bm-marker
              :position="{ lng: last_le, lat: last_ln }"
              animation="BMAP_ANIMATION_BOUNCE"
            >
            </bm-marker>
            <bm-polyline
              :path="map_path"
              stroke-color="blue"
              :stroke-opacity="0.5"
              :stroke-weight="8"
            ></bm-polyline>
          </baidu-map>
        </div>
      </a-col>
      <a-col :span="isMobile ? 24 : 12">
        <a-card :hoverable="true" style="margin: 1rem">
          <a-table
            :columns="isMobile ? mobile_columns : columns"
            :data-source="datas"
          >
            <span slot="action" slot-scope="record"
              ><a-popover>
                <template slot="title">
                  <p
                    color="#1abc9c"
                    style="
                      textalign: center;
                      font-size: 1.5em;
                      font-weight: bold;
                    "
                  >
                    历史数据快照
                  </p>
                </template>
                <template slot="content">
                  <p style="width: 20rem; font-weight: bold">
                    <a-tag color="red" style="font: 1em sans-serif"
                      >上传时间:</a-tag
                    >{{ record.timeText }}
                  </p>
                  <p style="font-weight: bold">
                    <a-tag color="blue" style="font: 1em sans-serif"
                      >历史温度:</a-tag
                    >{{ record.temp }}℃
                  </p>
                  <p style="font-weight: bold">
                    <a-tag color="orange" style="font: 1em sans-serif"
                      >历史湿度:</a-tag
                    >{{ record.humi }}%
                  </p>
                  <p style="font-weight: bold">
                    <a-tag color="purple" style="font: 1em sans-serif"
                      >历史位置:</a-tag
                    >东经:{{ record.position[0] }}°，北纬:{{
                      record.position[1]
                    }}°
                  </p>
                  <div class="map-container" style="height: 15rem">
                    <baidu-map
                      style="width: 100%; height: 100%"
                      :scroll-wheel-zoom="true"
                      mapType="BMAP_NORMAL_MAP"
                      :center="{
                        lng: record.position[0],
                        lat: record.position[1],
                      }"
                      :zoom="13"
                      ak="kb7cVym4jgEbuVs5EG6vPFer5vXNkpB1"
                    >
                      <bm-marker
                        :position="{
                          lng: record.position[0],
                          lat: record.position[1],
                        }"
                        animation="BMAP_ANIMATION_BOUNCE"
                      >
                      </bm-marker>
                    </baidu-map>
                  </div>
                </template>
                <a-tag color="#16a085">数据快照</a-tag>
              </a-popover></span
            >
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <div class="loading_scene" v-if="data_loading">
      <a-spin />
      <span style="color: #eee; margin-left: 20px; font-size: 24px"
        >加载中...</span
      >
    </div>
    <h2>temp_device_history</h2>
    {{ temp_device_history }}
    <h2>temp_history_datas</h2>
    {{ temp_history_datas }}
    <h2>humi_device_history</h2>
    {{ humi_device_history }}
    <h2>humi_history_datas</h2>
    {{ humi_history_datas }}
    <h2>le_device_history</h2>
    {{ le_device_history }}
    <h2>le_history_datas</h2>
    {{ le_history_datas }}
    <h2>ln_device_history</h2>
    {{ ln_device_history }}
    <h2>ln_history_datas</h2>
    {{ ln_history_datas }}
    <h2>chart_datas</h2>
    {{ chart_datas }}
    <h2>map_path</h2>
    {{ map_path }}
  </div>
</template>

<script>
import {
  BaiduMap,
  BmNavigation,
  BmMapType,
  BmMarker,
  BmPolyline,
  BmScale,
} from "vue-baidu-map";
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
const mobile_columns = [
  {
    title: "温度(℃)",
    dataIndex: "temp",
    key: "temp",
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
// import { mapState } from "vuex";
import { get_device_history } from "@/services/onenet";
import { get_device_historys_by_time } from "@/services/history";
import { mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    BaiduMap,
    BmNavigation,
    BmMapType,
    BmMarker,
    BmPolyline,
    BmScale,
  },
  data() {
    return {
      columns, //列表展示项
      mobile_columns,
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
      session_selected: {},
      session_user: {},
      excelname: "datas",
      json_fields: {
        //表头设计
        时间: "timeText",
        温度: "temp",
        湿度: "humi",
        经纬度: "location",
      },
      json_data: [],
      data_loading: true,
    };
  },
  mounted() {
    // this.drawTemp();
    // this.drawHumi();
  },
  created() {
    this.session_selected = JSON.parse(
      sessionStorage.getItem("session_selected")
    );
    this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
    this.last_le = this.session_selected.le;
    this.last_ln = this.session_selected.ln;
    var timestamp = new Date().valueOf();
    this.start_time = timestamp - 3600 * 1000 * 3;
    this.end_time = timestamp;
  },
  watch: {
    $route(to, from) {
      if (to.path == "/device") {
        this.chart_datas = {};
        this.session_selected = JSON.parse(
          sessionStorage.getItem("session_selected")
        );
        this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
      }
      if (from.path == "/device") {
        null;
      }
    },
    chart_datas: function (v) {
      typeof v;
      this.drawTemp();
      this.drawHumi();
    },
    session_selected: function () {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 3;
      this.end_time = timestamp;
      this.chart_datas = {};
      this.onOK();
    },
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
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
    chart_datas: {
      get: function () {
        let datas = [];
        if (this.temp_history_datas.length == this.humi_history_datas.length) {
          for (let index = 0; index < this.temp_history_datas.length; index++) {
            datas.push([]);
          }
          this.temp_history_datas.forEach((data, index) => {
            datas[index].push(timestampToTime(parseInt(data.time)));
            datas[index].push(parseFloat(data.value));
          });
          this.humi_history_datas.forEach((data, index) => {
            datas[index].push(parseFloat(data.value));
          });
        }
        return datas.reverse();
      },
      set: function (datas) {
        return datas;
      },
    },
    map_path() {
      let datas = [];
      if (this.datas.length) {
        this.datas.forEach((data) => {
          if (data.position[0])
            datas.push({ lng: data.position[0], lat: data.position[1] });
        });
      }
      if (datas.length) {
        return datas;
      } else {
        return [];
      }
    },
  },
  methods: {
    disabledDate(current) {
      // Can not select days before today and today
      return current > moment().endOf("day");
    },
    onQueryHoursChange(value) {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * value;
      this.end_time = timestamp;
    },
    //获取温度基础方法
    async get_temp_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.session_user.name,
          type: this.session_selected["type"],
          device_name: this.session_selected["id"],
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
        this.temp_history_datas = this.temp_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的温度数据
    async get_temp_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        this.get_temp_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      this.get_temp_history_in_a_week(to, to - from);
    },
    //获取湿度基础方法
    async get_humi_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.session_user.name,
          type: this.session_selected["type"],
          device_name: this.session_selected["id"],
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
        this.humi_history_datas = this.humi_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的湿度数据
    async get_humi_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        this.get_humi_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      this.get_humi_history_in_a_week(to, to - from);
    },
    //获取经度基础方法
    async get_le_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.session_user.name,
          type: this.session_selected["type"],
          device_name: this.session_selected["id"],
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
        this.le_history_datas = this.le_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的经度数据
    async get_le_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        this.get_le_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
      this.get_le_history_in_a_week(to, to - from);
    },
    //获取纬度基础方法
    async get_ln_history(end_time, timespan, identifier, limit, offset) {
      return new Promise((resolve) => {
        get_device_history({
          user: this.session_user.name,
          type: this.session_selected["type"],
          device_name: this.session_selected["id"],
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
        this.ln_history_datas = this.ln_history_datas.concat(revdatas);
      } while (revdatas.length > 0);
    },
    //获取任意两个时间点间的纬度数据
    async get_ln_history_from_to(from, to) {
      while (to - from > 3600 * 1000 * 24 * 7) {
        this.get_ln_history_in_a_week(to, 3600 * 1000 * 24 * 7);
        to = to - 3600 * 1000 * 24 * 7;
      }
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
      let start_time = new Date(value[0]._d).getTime();
      let end_time = new Date(value[1]._d).getTime();
      this.start_time = start_time;
      this.end_time = end_time;
    },
    async onOK() {
      this.data_loading = true;
      this.mapvisible = false;
      this.temp_device_history = {};
      this.temp_history_datas = [];
      this.humi_device_history = {};
      this.humi_history_datas = [];
      this.le_device_history = {};
      this.le_history_datas = [];
      this.ln_device_history = {};
      this.ln_history_datas = [];
      if (this.end_time - this.start_time > 30 * 24 * 60 * 60000) {
        this.$message.error("查询范围不得超过一个月");
      }
      await this.get_datas(this.start_time, this.end_time).then(() => {
        this.mapvisible = true;
        this.data_loading = false;
      });
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
    queryByHours() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * this.queryhours;
      this.end_time = timestamp;
      this.onOK();
    },
    mkexcel() {
      var temp_start_time = new Date(this.start_time);
      var temp_end_time = new Date(this.end_time);
      this.excelname =
        temp_start_time.getFullYear() +
        "/" +
        (temp_start_time.getMonth() + 1) +
        "/" +
        temp_start_time.getDate() +
        "/" +
        temp_start_time.getHours() +
        "时" +
        temp_start_time.getMinutes() +
        "分到" +
        temp_end_time.getFullYear() +
        "/" +
        (temp_end_time.getMonth() + 1) +
        "/" +
        temp_end_time.getDate() +
        "/" +
        temp_end_time.getHours() +
        "时" +
        temp_end_time.getMinutes() +
        "分";
      this.datas.forEach((data) => {
        var exceljson_data = {
          timeText: data["timeText"],
          temp: data["temp"],
          humi: data["humi"],
          location: data["location"],
        };
        this.json_data.push(exceljson_data);
      });
    },
    toHomePage() {
      this.$router.replace({ path: "/mainpage" });
    },
    toDevicedetailPage2() {
      this.$router.push({ path: "/device2" });
    },
    //----------------------------------------
    async onOK1() {
      this.data_loading = true;
      this.mapvisible = false;
      this.temp_device_history = {};
      this.temp_history_datas = [];
      this.humi_device_history = {};
      this.humi_history_datas = [];
      this.le_device_history = {};
      this.le_history_datas = [];
      this.ln_device_history = {};
      this.ln_history_datas = [];
      if (this.end_time - this.start_time > 30 * 24 * 60 * 60000) {
        this.$message.error("查询范围不得超过一个月");
      }
      await this.get_all_datas(this.start_time, this.end_time).then(() => {
        this.mapvisible = true;
        this.data_loading = false;
      });
    },
    async get_all_datas(form, to) {
      this.mapvisible = false;
      console.log(form, to);
      console.log("==========================");
      let res = await get_device_historys_by_time({
        type: this.session_selected["type"],
        device_name: this.session_selected["id"],
        start_time: form,
        last_time: to,
      });
      console.log(res.data.data);
      console.log("=@@@@@@@@@@@@@@@=============???");
      let temp_temp_list = [];
      res.data.data.forEach((data) => {
        var timestamp2 = new Date(data.timestamp).valueOf();
        console.log(timestamp2);
        temp_temp_list.push({ time: timestamp2, value: data.temp });
      });
      console.log("================================???");
      console.log(temp_temp_list);
      this.temp_history_datas = temp_temp_list;
    },
  },
};
/*
device_name: "al_kh00001_zx_0003"
humi: 0
id: 102211
le: 117.085
ln: 36.1106
temp: 18.94
tempL: null
tempLA: 0
tempU: null
tempUA: 0
timestamp: "2022-03-23 12:19:08"


temp_device_history
[]
temp_history_datas
[ { "time": "1648019090448", "value": "20.50" }, { "time": "1648018790572", "value": "20.56" }, { "time": "1648018488239", "value": "20.88" }, { "time": "1648018188711", "value": "23.69" }, { "time": "1648017888799", "value": "22.19" }, { "time": "1648017586460", "value": "21.75" }, { "time": "1648017286562", "value": "20.62" }, { "time": "1648016984203", "value": "20.75" }, { "time": "1648016684342", "value": "20.81" }, { "time": "1648016381591", "value": "21.12" }, { "time": "1648016079272", "value": "20.44" }, { "time": "1648015779740", "value": "20.50" }, { "time": "1648015480263", "value": "20.56" }, { "time": "1648015180672", "value": "20.75" }, { "time": "1648014880984", "value": "20.38" }, { "time": "1648014569750", "value": "20.50" }, { "time": "1648014267398", "value": "20.94" }, { "time": "1648013967881", "value": "20.62" }, { "time": "1648013668372", "value": "21.44" }, { "time": "1648013368862", "value": "21.62" }, { "time": "1648013068952", "value": "19.44" }, { "time": "1648012766523", "value": "19.31" }, { "time": "1648012461356", "value": "19.31" }, { "time": "1648012161433", "value": "19.12" }, { "time": "1648011859270", "value": "19.06" }, { "time": "1648011551263", "value": "19.19" }, { "time": "1648011251710", "value": "19.25" }, { "time": "1648010952195", "value": "19.25" }, { "time": "1648010652685", "value": "19.31" }, { "time": "1648010353166", "value": "19.25" }, { "time": "1648010053277", "value": "19.12" }, { "time": "1648009750935", "value": "19.06" }, { "time": "1648009451085", "value": "19.00" }, { "time": "1648009148715", "value": "18.94" }, { "time": "1648008849081", "value": "18.88" }, { "time": "1648008543908", "value": "18.81" } ]
humi_device_history
[]
humi_history_datas
[ { "time": "1648019090449", "value": "0.00" }, { "time": "1648018790572", "value": "0.00" }, { "time": "1648018488239", "value": "0.00" }, { "time": "1648018188711", "value": "0.00" }, { "time": "1648017888799", "value": "0.00" }, { "time": "1648017586460", "value": "0.00" }, { "time": "1648017286562", "value": "0.00" }, { "time": "1648016984203", "value": "0.00" }, { "time": "1648016684342", "value": "0.00" }, { "time": "1648016381591", "value": "0.00" }, { "time": "1648016079272", "value": "0.00" }, { "time": "1648015779740", "value": "0.00" }, { "time": "1648015480263", "value": "0.00" }, { "time": "1648015180672", "value": "0.00" }, { "time": "1648014880985", "value": "0.00" }, { "time": "1648014569750", "value": "0.00" }, { "time": "1648014267398", "value": "0.00" }, { "time": "1648013967881", "value": "0.00" }, { "time": "1648013668372", "value": "0.00" }, { "time": "1648013368862", "value": "0.00" }, { "time": "1648013068952", "value": "0.00" }, { "time": "1648012766523", "value": "0.00" }, { "time": "1648012461356", "value": "0.00" }, { "time": "1648012161434", "value": "0.00" }, { "time": "1648011859270", "value": "0.00" }, { "time": "1648011551264", "value": "0.00" }, { "time": "1648011251710", "value": "0.00" }, { "time": "1648010952195", "value": "0.00" }, { "time": "1648010652685", "value": "0.00" }, { "time": "1648010353166", "value": "0.00" }, { "time": "1648010053278", "value": "0.00" }, { "time": "1648009750935", "value": "0.00" }, { "time": "1648009451085", "value": "0.00" }, { "time": "1648009148715", "value": "0.00" }, { "time": "1648008849081", "value": "0.00" }, { "time": "1648008543908", "value": "0.00" } ]
le_device_history
[]
le_history_datas
[]
ln_device_history
[]
ln_history_datas
[]
*/
</script>

<style>
.headbar {
  background-color: rgb(65, 65, 65);
}
.loading_scene {
  text-align: center;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 4px;
  padding: 20%;
  margin: 32px 0;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
}
</style>