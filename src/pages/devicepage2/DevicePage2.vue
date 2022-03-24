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
          当前模式: 业务模式
          <a-button type="link" @click="toDevicedetailPage"
            >切换至时间模式</a-button
          >
        </a-col>
      </a-row>
    </div>
    <a-row>
      <a-col
        span="24"
        :style="{
          display: 'inline-block',
          fontSize: '1.5rem',
          textAlign: 'center',
        }"
        ><h2>历史数据记录</h2>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="24" v-if="rec_list.length ? true : false">
        <a-collapse accordion>
          <a-collapse-panel
            style="background-color: #ececec; padding: 10px"
            v-for="(rec, index) in rec_list"
            :key="rec.id"
            :header="`【最近的${index + 1}次】▶开始时间：${
              rec.start_time
            }  ⏯结束时间：${rec.last_time}`"
          >
            <a-row>
              <a-col :span="24">
                <a-card :title="rec.device_name" :bordered="false">
                  <p><strong>记录ID：</strong>{{ rec.id }}</p>
                  <p><strong>记录开始时间：</strong>{{ rec.start_time }}</p>
                  <p><strong>记录结束时间：</strong>{{ rec.last_time }}</p>
                  <a-button type="link" icon="search" @click="get_rec(rec)"
                    >获取历史数据</a-button
                  >
                </a-card>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
      <a-col :span="24" v-if="!rec_list.length ? true : false"
        ><a-empty
      /></a-col>
    </a-row>

    <div class="loading_scene" v-if="data_loading">
      <a-spin />
      <span style="color: #eee; margin-left: 20px; font-size: 24px"
        >加载中...</span
      >
    </div>
  </div>
</template>

<script>
import { get_device_history_list } from "@/services/history";
export default {
  data() {
    return {
      session_selected: {},
      session_user: {},
      rec_list: [],
      data_loading: true,
    };
  },
  created() {
    this.session_selected = JSON.parse(
      sessionStorage.getItem("session_selected")
    );
    this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
    this.getDeviceRecList();
  },
  mounted() {
    this.session_selected = JSON.parse(
      sessionStorage.getItem("session_selected")
    );
    this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
    this.getDeviceRecList();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/device2") {
        this.session_selected = JSON.parse(
          sessionStorage.getItem("session_selected")
        );
        this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
        this.getDeviceRecList();
      }
      if (from.path == "/device2") {
        this.session_selected = null;
        this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
      }
    },
  },
  methods: {
    async getDeviceRecList() {
      this.data_loading = true;
      let res = await get_device_history_list({
        user: this.session_user.name,
        type: this.session_selected.product_id,
        device: this.session_selected.id,
      });
      this.rec_list = res.data.data;
      setTimeout(() => {
        this.data_loading = false;
      }, 500);
    },
    toHomePage() {
      this.$router.replace({ path: "/mainpage" });
    },
    toDevicedetailPage() {
      this.$router.push({ path: "/device" });
    },
    get_rec(rec) {
      rec.product_id = this.session_selected.product_id;
      sessionStorage.setItem("session_history_selected", JSON.stringify(rec));
      setTimeout(() => {
        this.$router.push({ path: "/devicehistory" });
      }, 100);
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