<template>
  <div>
    <div class="headbar">
      <a-row type="flex" justify="end">
        <a-col style="color: #eee" :span="2">
          <a-button type="link" style="color: #eee" @click="toHomePage">
            <a-icon type="home" style="color: #eee"></a-icon>返回主页
          </a-button>
        </a-col>
        <a-col style="color: #eee" :span="11"> </a-col>
        <a-col style="color: #eee" :span="4">
          <a-button type="link" @click="toReportPage"
            >去验证报告中心(导出PDF)</a-button
          >
        </a-col>
        <a-col style="color: #eee" :span="3">
          <download-excel
            :data="json_data"
            :fields="json_fields"
            worksheet="导出数据"
            :name="excelname"
          >
            <a-button type="link" @click="mkexcel">导出数据至excel</a-button>
          </download-excel>
        </a-col>
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
      <a-col class="lscx" :span="isMobile ? 18 : 7">
        <a-range-picker
          :style="isMobile ? 'width:100%' : 'margin-left: 3rem'"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @ok="onDateSelOk"
          :disabled-date="disabledDate"
        />
      </a-col>
      <a-col class="xscx" :span="isMobile ? 6 : 1">
        <a-button
          type="primary"
          :style="isMobile ? 'margin-bottom : 0.5rem' : ''"
          @click="onOK"
          >历史查询</a-button
        ></a-col
      >
      <a-col class="atcx" :span="isMobile ? 24 : 6"> </a-col>
      <a-col :span="isMobile ? 24 : 3">
        <a-button type="primary" :block="isMobile" @click="query1days"
          >最近一天数据查询</a-button
        >
      </a-col>
      <a-col :span="isMobile ? 24 : 3">
        <a-button
          :style="{ backgroundColor: '#b4d5fa' }"
          :block="isMobile"
          @click="query3days"
          >最近三天数据查询</a-button
        >
      </a-col>
      <a-col :span="isMobile ? 24 : 3">
        <a-button type="primary" :block="isMobile" @click="query7days"
          >最近一周数据查询</a-button
        >
      </a-col>
    </a-row>
    <a-row>
      <a-col class="charts_box" :span="isMobile ? 24 : 12">
        <div id="myChart" :style="{ height: '300px' }"></div>
        <div class="tools_bar">
          <a-input-number
            id="inputNumber"
            v-model="queryhours"
            :min="1"
            :max="168"
            size="small"
            @change="onQueryHoursChange"
          />
          <a-button
            class="tools_bar_btn"
            type="primary"
            shape="circle"
            icon="left"
            size="small"
            :disabled="!btn_backward"
            @click="btn_changetime(0)"
          />
          <a-button
            class="tools_bar_btn"
            type="primary"
            shape="circle"
            icon="right"
            size="small"
            :disabled="!btn_forward"
            @click="btn_changetime(1)"
          />
          <a-button
            class="tools_bar_btn"
            type="primary"
            shape="circle"
            size="small"
            :disabled="!btn_toend"
            @click="btn_changetoend"
            ><a-icon type="vertical-left"
          /></a-button>
        </div>
      </a-col>
      <a-col :span="isMobile ? 24 : 12">
        <div id="myChart2" :style="{ height: '300px' }"></div>
      </a-col>
    </a-row>
    <a-row class="map_data">
      <!-- 地图 -->
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
            :center="{ lng: last_le, lat: last_ln }"
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
      <!-- 数据表 -->
      <a-col :span="isMobile ? 24 : 12">
        <a-card :hoverable="true" style="margin: 1rem">
          <a-table
            :columns="isMobile ? mobile_columns : columns"
            :data-source="history_datas"
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
                    >{{ record.timestamp }}
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
                    >东经:{{ record.le }}°，北纬:{{ record.ln }}°
                  </p>
                  <div class="map-container" style="height: 15rem">
                    <baidu-map
                      style="width: 100%; height: 100%"
                      :scroll-wheel-zoom="true"
                      mapType="BMAP_NORMAL_MAP"
                      :center="{
                        lng: record.le,
                        lat: record.ln,
                      }"
                      :zoom="13"
                      ak="kb7cVym4jgEbuVs5EG6vPFer5vXNkpB1"
                    >
                      <bm-marker
                        :position="{
                          lng: record.le,
                          lat: record.ln,
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
    <!-- ???????? -->
    <div class="loading_scene" v-if="data_loading">
      <a-spin />
      <span style="color: #eee; margin-left: 20px; font-size: 24px"
        >加载中...</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { get_device_historys_by_time } from "@/services/history";
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
    dataIndex: "timestamp",
    key: "timestamp",
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
      columns,
      mobile_columns,
      datas: [],
      chart_datas: [],
      map_path: [],
      history_datas: [],
      start_time: 0,
      end_time: 0,
      last_le: 0,
      last_ln: 0,
      data_loading: false,
      session_selected: {},
      json_data: [],
      queryhours: 3,
      json_fields: {
        //表头设计
        时间: "timeText",
        温度: "temp",
        湿度: "humi",
        经纬度: "location",
      },
      excelname: "datas",
      btn_forward: false,
      btn_backward: true,
      btn_toend: false,
    };
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
    this.onOK();
  },
  watch: {
    datas: function (v) {
      typeof v;
      let temp_data_list = [];
      let temp_path_list = [];
      v.forEach((data) => {
        temp_data_list.push([data.timestamp, data.temp, data.humi]);
        temp_path_list.push({ lng: data.le, lat: data.ln });
      });
      this.chart_datas = temp_data_list;
      this.map_path = temp_path_list;
      this.history_datas = JSON.parse(JSON.stringify(v)).reverse();
      this.drawTemp();
      this.drawHumi();
    },
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
  },
  methods: {
    ////////////////////////////////////路由相关//////////////////////////////////////////
    //返回主页
    toHomePage() {
      this.$router.replace({ path: "/mainpage" });
    },
    //返回业务模式
    toDevicedetailPage2() {
      this.$router.push({ path: "/device2" });
    },
    toReportPage() {
      this.$router.replace({ path: "/datacenter/verification_report_request" });
    },
    ////////////////////////////////////组件相关//////////////////////////////////////////
    //限定日期范围
    disabledDate(current) {
      return current > moment().endOf("day");
    },
    onQueryHoursChange(value) {
      this.start_time = this.end_time - 3600 * 1000 * value;
      this.onOK();
    },
    ////////////////////////////////////按钮动作相关//////////////////////////////////////////
    //当日期选择器选好时执行
    onDateSelOk(value) {
      let start_time = new Date(value[0]._d).getTime();
      let end_time = new Date(value[1]._d).getTime();
      this.start_time = start_time;
      this.end_time = end_time;
    },
    //当历史查询按钮被按下时
    async onOK() {
      if (this.end_time - this.start_time > 30 * 24 * 60 * 60000) {
        this.$message.error("查询范围不得超过一个月");
        return;
      }
      this.get_all_datas(this.start_time, this.end_time);
    },
    // 数据查询按钮按下时
    queryByHours() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * this.queryhours;
      this.end_time = timestamp;
      this.onOK();
    },
    query1days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24;
      this.end_time = timestamp;
      this.queryhours = 24;
      this.onOK();
    },
    query3days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24 * 3;
      this.end_time = timestamp;
      this.queryhours = 24 * 3;
      this.onOK();
    },
    query7days() {
      var timestamp = new Date().valueOf();
      this.start_time = timestamp - 3600 * 1000 * 24 * 7;
      this.end_time = timestamp;
      this.queryhours = 24 * 7;
      this.onOK();
    },
    btn_changetime(v) {
      if (v) {
        if (
          this.end_time + 3600 * 1000 * this.queryhours <
          new Date().valueOf()
        ) {
          this.end_time = this.end_time + 3600 * 1000 * this.queryhours;
          this.start_time = this.start_time + 3600 * 1000 * this.queryhours;
          this.onOK();
        } else {
          this.$message.warn("已经是最新数据");
          this.btn_forward = false;
        }
      } else {
        this.end_time = this.end_time - 3600 * 1000 * this.queryhours;
        this.start_time = this.start_time - 3600 * 1000 * this.queryhours;
        this.onOK();
        this.btn_forward = true;
        this.btn_toend = true;
      }
    },
    btn_changetoend() {
      this.end_time = new Date().valueOf();
      this.start_time = this.end_time - 3600 * 1000 * this.queryhours;
      this.btn_toend = false;
      this.btn_forward = false;
      this.onOK();
    },
    ////////////////////////////////////网络请求相关//////////////////////////////////////////
    //获取所有的数据
    async get_all_datas(form, to) {
      this.data_loading = true;
      let res = await get_device_historys_by_time({
        type: this.session_selected["type"],
        device_name: this.session_selected["id"],
        start_time: form,
        last_time: to,
      });
      let temp_datas = res.data.data;
      temp_datas.forEach((temp_data, index) => {
        temp_data.key = index;
      });
      this.datas = res.data.data;
      this.last_le = this.datas[this.datas.length - 1].le;
      this.last_ln = this.datas[this.datas.length - 1].ln;
      setTimeout(() => {
        this.data_loading = false;
      }, 300);
    },
    ////////////////////////////////////图表/表格生成//////////////////////////////////////////
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
  },
};
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
.tools_bar {
  position: absolute;
  right: 10%;
  bottom: 21%;
  background: #eee;
  padding: 2px;
  border-radius: 6px;
}
.tools_bar_btn {
  margin: 5px;
}
.charts_box {
  padding-left: 10px;
}
/* .map_data {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
} */
</style>