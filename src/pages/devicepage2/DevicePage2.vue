<template>
  <div>
    <a-row type="flex" justify="end">
        <a-col :span="24">
          <a-button type="primary" @click="toDevicedetailPage"
            >切换至时间模式</a-button
          >
        </a-col>
    </a-row>
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
      <a-col :span="24" v-if="!rec_list.length ? true : false"><a-empty /></a-col>
    </a-row>
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
        this.session_selected = null
        this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
      }
    },
  },
  methods: {
    async getDeviceRecList() {
      let res = await get_device_history_list({
        user: this.session_user.name,
        type: this.session_selected.product_id,
        device: this.session_selected.id,
      });
      this.rec_list = res.data.data;
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
</style>