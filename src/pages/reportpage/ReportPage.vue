<template>
  <div>
    <h2 style="text-align: center">验证报告</h2>
    <a-row>
      <a-col :span="1"></a-col>
      <a-col :span="22">
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <!-- 基本信息 -->
          <a-divider><strong>基本信息</strong></a-divider>
          <a-form-item label="设备ID">
            <a-input
              v-model="session_selected.device_name"
              read-only
              disabled
              size="small"
            />
          </a-form-item>
          <a-form-item label="记录ID">
            <a-input
              v-model="session_selected.id"
              read-only
              disabled
              size="small"
            />
          </a-form-item>
          <a-form-item label="发货时间">
            <a-input
              v-model="session_selected.start_time"
              read-only
              disabled
              size="small"
            />
          </a-form-item>
          <a-form-item label="收货时间">
            <a-input
              v-model="session_selected.last_time"
              read-only
              disabled
              size="small"
            />
          </a-form-item>
          <!-- 货物信息 -->
          <a-divider><strong>货物信息</strong></a-divider>
          <a-form-item label="货物名称" validate-status="warning">
            <a-input v-model="session_selected.goods_name" size="small" />
          </a-form-item>
          <a-form-item
            label="货物数量"
            style="margin-bottom: 0"
            validate-status="warning"
          >
            <a-form-item
              :style="{ display: 'inline-block', width: 'calc(70% - 12px)' }"
            >
              第
              <a-input
                style="width: 30%"
                v-model="session_selected.goods_count"
                validate-status="warning"
              />
              件,共
              <a-input
                style="width: 30%"
                v-model="session_selected.goods_all_count"
                validate-status="warning"
              />
              件
            </a-form-item>
          </a-form-item>
          <a-form-item label="预设温度" style="margin-bottom: 0">
            <a-form-item
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-input
                style="width: 100%"
                v-model="session_selected.tempL"
                read-only
                disabled
              />
            </a-form-item>
            <span
              :style="{
                display: 'inline-block',
                width: '24px',
                textAlign: 'center',
              }"
            >
              -
            </span>
            <a-form-item
              :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
            >
              <a-input
                style="width: 90%"
                v-model="session_selected.tempU"
                read-only
                disabled
              />℃
            </a-form-item>
          </a-form-item>
          <a-form-item label="货物品类" validate-status="warning">
            <a-select
              v-model="session_selected.goods_type"
              size="small"
              :style="{ width: 'calc(50% - 12px)' }"
            >
              <a-select-option value="常规"> 常温 </a-select-option>
              <a-select-option value="冷冻"> 冷冻 </a-select-option>
              <a-select-option value="冷鲜"> 冷鲜 </a-select-option>
              <a-select-option value="药品"> 药品 </a-select-option>
              <a-select-option value="血液类"> 血液类 </a-select-option>
              <a-select-option value="疫苗类"> 疫苗类 </a-select-option>
              <a-select-option value="生物标本类"> 生物标本类 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="采集间隔">
            <a-input
              v-model="session_selected.recspan"
              size="small"
              read-only
              disabled
              :style="{ width: 'calc(50% - 12px)' }"
            />
            分钟
          </a-form-item>
          <!-- 发货方信息 -->
          <a-divider><strong>发货方信息</strong></a-divider>
          <a-form-item label="发货方" validate-status="warning">
            <a-input v-model="session_selected.sender_name" size="small" />
          </a-form-item>

          <a-form-item label="电话" validate-status="warning">
            <a-input v-model="session_selected.sender_phone" size="small" />
          </a-form-item>
          <a-form-item label="发货地点" validate-status="warning">
            <a-input v-model="session_selected.sender_address" size="small" />
          </a-form-item>
          <!-- 承运方信息 -->
          <a-divider><strong>承运方信息</strong></a-divider>
          <a-form-item label="承运方" validate-status="warning">
            <a-input v-model="session_selected.transer_name" size="small" />
          </a-form-item>
          <a-form-item label="电话" validate-status="warning">
            <a-input v-model="session_selected.transer_phone" size="small" />
          </a-form-item>
          <!-- 收货方信息 -->
          <a-divider><strong>收货方信息</strong></a-divider>
          <a-form-item label="收货方" validate-status="warning">
            <a-input v-model="session_selected.reciver_name" size="small" />
          </a-form-item>
          <a-form-item label="电话" validate-status="warning">
            <a-input v-model="session_selected.reciver_phone" size="small" />
          </a-form-item>
          <a-form-item label="收货地点" validate-status="warning">
            <a-input v-model="session_selected.reciver_address" size="small" />
          </a-form-item>

          <a-form-item v-if="!isMobile" :wrapper-col="{ span: 24, offset: 5 }">
            <a-button
              type="primary"
              @click="info_add"
              style="display: inline-block"
              :disabled="!info_add_done_flag"
            >
              确认信息
            </a-button>
            >>>
            <a-button
              type="primary"
              @click="getpdf"
              :disabled="info_add_done_flag"
              :loading="gening"
              style="display: inline-block"
            >
              生成监测报告
            </a-button>
            <div style="display: inline-block" v-show="showpdfUrl.length != 0">
              >>> 请下载:
              <a :href="showpdfUrl">{{ showpdfUrl }}</a>
            </div>
          </a-form-item>

          <a-form-item v-if="isMobile" :wrapper-col="{ span: 24, offset: 3 }">
            <a-button
              type="primary"
              @click="info_add"
              :disabled="!info_add_done_flag"
            >
              确认信息
            </a-button>
            >>>
            <a-button> 发送报告至邮箱 </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="1"></a-col>
    </a-row>
    <a-modal
      :visible="download_flag"
      title="请下载"
      @ok="download_flag = false"
      @cancel="download_flag = false"
    >
      <a :href="download_url">{{ download_url }}</a>
    </a-modal>
  </div>
</template>

<script>
import { gen_reports, set_rec_info, get_reports } from "@/services/history";
import { mapState } from "vuex";
export default {
  data() {
    return {
      session_selected: "",
      session_user: "",
      info_add_done_flag: true,
      gening: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      pdfUrl: "",
      showpdfUrl: "",
      download_flag: false,
      download_url: "",
    };
  },
  created() {
    this.session_selected = JSON.parse(
      sessionStorage.getItem("session_report_selected")
    );
    this.session_user = JSON.parse(sessionStorage.getItem("session_user"));
    this.info_add_done_flag = true;
    this.gening = false;
  },
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("setting", ["isMobile"]),
  },
  watch: {
    $route(to, from) {
      if (to.path == "/datacenter/reportpage") {
        this.session_selected = JSON.parse(
          sessionStorage.getItem("session_report_selected")
        );
      }
      if (from.path == "/datacenter/reportpage") {
        this.info_add_done_flag = true;
      }
    },
  },
  methods: {
    async info_add() {
      let res = await set_rec_info({
        data: this.session_selected,
      });
      if (res.data.success) {
        this.$message.success("信息提交完成 ！", 6);
        this.info_add_done_flag = false;
      }
    },
    async getpdf() {
      this.gening = true;
      let filename = `${this.session_selected.device_name}_${this.session_selected.id}`;
      setTimeout(() => {
        this.gening = false;
        console.log("this.showpdfUrl");
        console.log(this.showpdfUrl);
        this.showpdfUrl = `https://anlengyun.com/report/${this.session_selected.device_name}_${this.session_selected.id}.pdf`;
      }, 10000);
      let res = await gen_reports({
        name: filename,
        device_name: this.session_selected.device_name,
        type: "zx",
        start_time: this.session_selected.start_time,
        last_time: this.session_selected.last_time,
      });
      console.log("res");
      console.log(res);
      this.download_url = res.data.data.url;
      if (res.data.data.success) {
        this.$message.success("正在生成验证简报,请稍等~", 6);
        setTimeout(async () => {
          let res = await get_reports({
            name: filename,
          });
          this.gening = false;
          const dataInfo = res.data;
          const blob = new Blob([dataInfo], {
            type: "application/pdf;charset=utf-8",
          });
          const elink = window.URL.createObjectURL(blob);
          this.pdfUrl = elink;
          this.showpdfUrl = elink;
          sessionStorage.setItem("session_report_pdf", this.pdfUrl);
          URL.revokeObjectURL(elink.href);

          setTimeout(() => {
            this.download_flag = true;
            // this.download_url = res.data.data.url;
            this.gening = false;
            this.$router.push({
              path: "/datacenter/reportPDF",
              query: { url: this.pdfUrl },
            });
          }, 500);
        }, 1000);
      } else {
        this.$message.error("本次记录数据量太小无法生成报告!", 6);
        this.gening = false;
      }
    },
  },
};
</script>

<style>
</style>