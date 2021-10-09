<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-space
          ><h2>验证报告申请</h2>
          <h3 style="color: grey">( 您的验证报告申请配额:67次 )</h3>
        </a-space>
      </a-col>
      <a-col :span="9">
        <a-select
          :default-value="product_selected.name"
          style="width: 100%"
          :loading="product_loading"
          :disabled="product_loading"
        >
          <a-select-option
            :value="pro.name"
            v-for="pro in product_list"
            :key="pro._id"
            @click="handleMenuClick"
          >
            {{ pro.name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="11">
        <a-select
          :default-value="device_selected.name"
          v-model="device_selected.device_name"
          style="width: 100%"
          :loading="device_loading"
          :disabled="device_disabled"
        >
          <a-select-option
            :value="device.device_name"
            v-for="device in device_list"
            :key="device._id"
            @click="handleDeviceClick"
          >
            {{ device.device_name }}
          </a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-button
          type="primary"
          :disabled="btn_query_disabled"
          @click="getDeviceRecList"
          >查询</a-button
        >
      </a-col>
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
                    >获取监测报告</a-button
                  >
                </a-card>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {
  onenet_get_project_info,
  get_user_devicelist_by_type,
} from "@/services/onenet";
import {
  get_device_history_list,
} from "@/services/history";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      product_loading: false,
      product_list: [],
      product_selected: { _id: "", count: 1, name: "请选择产品类型" },
      device_loading: false,
      device_disabled: true,
      device_list: [],
      device_selected: { _id: "", count: 1, name: "请选择设备" },
      btn_query_disabled: true,
      rec_list: [],
    };
  },
  created() {
    this.getProductsList();
    sessionStorage.setItem("session_user", JSON.stringify(this.user));
  },
  computed: {
    ...mapState("account", ["user"]),
  },
  methods: {
    ...mapMutations("report_selected_device", ["set_report_selected"]),
    async getProductsList() {
      this.product_loading = true;
      let res = await onenet_get_project_info();
      this.product_list = JSON.parse(res.data.msg.body).data.product_aggregate;
      this.product_loading = false;
    },
    async handleMenuClick(e) {
      this.product_list.forEach(async (pro) => {
        if (e.key == pro.name) {
          this.device_disabled = false;
          this.device_loading = true;
          this.product_selected = pro;
          let res = await get_user_devicelist_by_type({
            user: this.user.name,
            type: pro._id,
          });
          this.device_list = JSON.parse(res.data.msg.body).data.list;
          this.device_loading = false;
          this.device_selected.device_name = "";
          this.btn_query_disabled = true;
        }
      });
    },
    handleDeviceClick(e) {
      this.device_list.forEach(async (device) => {
        if (e.key == device.device_name) {
          this.device_selected = device;
          this.btn_query_disabled = false;
        }
      });
    },
    //获取设备记录列表
    async getDeviceRecList() {
      // console.log(this.device_selected);
      let res = await get_device_history_list({
        user: this.user.name,
        type: this.device_selected.product_id,
        device: this.device_selected.device_name,
      });
      this.rec_list = res.data;
    },
    get_rec(rec) {

      rec.product_id = this.device_selected.product_id
      this.set_report_selected(rec);
      sessionStorage.setItem("session_report_selected", JSON.stringify(rec));
      this.$router.push({ path: "/datacenter/reportpage" });
    },
  },
};
</script>

<style>
</style>