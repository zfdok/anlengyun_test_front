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
          当前模式: 业务模式
          <a-button type="link" @click="toDevicedetailPage"
            >切换至时间模式</a-button
          >
        </a-col>
      </a-row>
    </div>
    <h2 style="text-align: center; font-weight: bold">设备历史记录</h2>
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
  </div>
</template>

<script>
import { get_device_historys } from "@/services/history";
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
import { mapState } from "vuex";
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
      history_selected: "",
      history_datas: [],
      last_le: 0,
      last_ln: 0,
      excelname: "datas",
      json_fields: {
        //表头设计
        时间: "timeText",
        温度: "temp",
        湿度: "humi",
        经纬度: "location",
      },
      json_data: [],
      excel_header: "",
    };
  },
  created() {
    this.history_selected = JSON.parse(
      sessionStorage.getItem("session_history_selected")
    );
  },
  mounted() {
    this.history_selected = JSON.parse(
      sessionStorage.getItem("session_history_selected")
    );

    this.get_history();
    this.drawTemp();
    this.drawHumi();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/devicehistory") {
        this.history_selected = JSON.parse(
          sessionStorage.getItem("session_history_selected")
        );
      }
      if (from.path == "/devicehistory") {
        from.meta.keepalive = false;
        to.meta.keepalive = false;
        this.$destroy();
      }
    },
    history_datas: function (v) {
      typeof v;
      this.drawTemp();
      this.drawHumi();
      this.last_le = v[v.length - 1].le;
      this.last_ln = v[v.length - 1].ln;
    },
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
    chart_datas: {
      get: function () {
        let datas = [];
        this.history_datas.forEach((data) => {
          datas.push([data.timestamp, data.temp, data.humi]);
        });
        return datas;
      },
    },
    map_path: {
      get: function () {
        let datas = [];
        this.history_datas.forEach((data) => {
          if (data.le && data.ln) {
            datas.push({ lng: data.le, lat: data.ln });
          }
        });
        return datas;
      },
    },
  },
  methods: {
    async get_history() {
      let res = await get_device_historys({
        type: this.history_selected.product_id,
        device: this.history_selected.device_name,
        id: this.history_selected.id,
        start_time: this.history_selected.start_time,
        last_time: this.history_selected.last_time,
      });
      this.history_datas = res.data.data;
      for (var i = 0; i < res.data.length; i++) {
        this.history_datas[
          i
        ].location = `东经: ${res.data[i].le}, 北纬: ${res.data[i].ln}`;
      }
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
    mkexcel() {
      this.excelname = `${this.history_selected.device_name}_${this.history_selected.id}`;
      this.excel_header = [
        `${this.history_selected.device_name}监测数据记录表`,
        `记录ID: ${this.history_selected.id} (共${this.history_datas.length}条)`,
        `从 ${this.history_selected.start_time} 至 ${this.history_selected.last_time}`,
      ];
      this.history_datas.forEach((data) => {
        var exceljson_data = {
          timeText: data["timestamp"],
          temp: data["temp"],
          humi: data["humi"],
          location: data["location"],
        };
        this.json_data.push(exceljson_data);
      });
    },
    ////////////////////////////////////路由相关//////////////////////////////////////////
    //返回主页
    toHomePage() {
      this.$router.replace({ path: "/mainpage" });
    },
    //返回业务模式
    toDevicedetailPage() {
      this.$router.push({ path: "/device" });
    },
    toReportPage() {
      this.$router.replace({ path: "/datacenter/verification_report_request" });
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
</style>