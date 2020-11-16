<template>
  <div>
    <!-- 消息下拉菜单 -->
    <a-dropdown :trigger="['click']" v-model="show">
      <div slot="overlay">
        <a-spin :spinning="loading">
          <a-tabs
            class="dropdown-tabs"
            :tabBarStyle="{ textAlign: 'center' }"
            :style="{ width: '297px' }"
          >
            <a-tab-pane tab="全部消息" key="1">
              <a-list class="tab-pane">
                <a-list-item v-for="(msg, index) in msg_data" :key="index">
                  <a-list-item-meta
                    :title="msg.title"
                    :descriptdesion="msg.time"
                  >
                    <a-avatar
                      style="background-color: white"
                      slot="avatar"
                      :src="msg.icon"
                    />
                  </a-list-item-meta>
                  <a-button
                    v-if="msg.type == 'msg'"
                    type="primary"
                    size="small"
                    @click="readNotice(msg, index)"
                    >了解</a-button
                  ><a-button
                    v-if="msg.type == 'alert'"
                    type="danger"
                    size="small"
                    @click="readNotice(msg, index)"
                    >确定</a-button
                  >
                  <a-button
                    v-if="msg.type == 'notice'"
                    style="background-color: #00897b; color: #f0f0f0"
                    size="small"
                    @click="readNotice(msg, index)"
                    >踊跃参加</a-button
                  >
                </a-list-item>
              </a-list>
            </a-tab-pane>
            <a-tab-pane tab="报警" key="2">
              <a-list class="tab-pane"></a-list>
            </a-tab-pane>
            <a-tab-pane tab="公告" key="3">
              <a-list class="tab-pane"></a-list>
            </a-tab-pane>
          </a-tabs>
        </a-spin>
      </div>
      <span @click="fetchNotice" class="header-notice">
        <a-badge class="notice-badge" :count="unreaded_count">
          <a-icon :class="['header-notice-icon']" type="bell" />
        </a-badge>
      </span>
    </a-dropdown>
    <!-- AD广告弹窗 -->
    <a-modal
      :visible="adVisible"
      @cancel="
        () => {
          adVisible = false;
        }
      "
    >
      <!-- 弹窗底部按钮 -->
      <template slot="footer">
        <a-button
          key="back"
          @click="
            () => {
              adVisible = false;
            }
          "
        >
          我已知晓
        </a-button>
        <a-button key="submit" type="primary" @click="adOKclick">
          查看详情
        </a-button>
      </template>
      <img width="100%" :src="ad_img" />
    </a-modal>
  </div>
</template>

<script>
import { request, METHOD } from "@/utils/request";
export default {
  name: "HeaderNotice",
  data() {
    return {
      loading: false,
      show: false,
      msg_count: 0,
      unreaded_count: 0,
      msg_data: [],
      adVisible: false,
      ad_url: "",
      ad_img: "",
    };
  },
  beforeMount() {
    //组件渲染前获取数据
    request("http://localhost:3000/headernotice", METHOD.GET)
      .then((result) => {
        this.msg_count = result.data.count;
        this.unreaded_count = result.data.unreaded_count;
        this.msg_data = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
  methods: {
    //徽标点击时跳出下拉菜单
    fetchNotice() {
      if (this.loading) {
        this.loading = false;
        return;
      }
      this.loadding = true;
      setTimeout(() => {
        this.loadding = false;
      }, 1000);
    },
    //读取消息后的动作 按下消息后按钮的动作
    readNotice(msg, index) {
      if (msg.type != "notice") {
        request("http://localhost:3000/headernotice/readnotice", METHOD.POST, {
          index: msg.msg_id,
        });
        this.msg_data.splice(index, 1);
        this.unreaded_count--;
      }
      if (msg.type == "notice") {
        request("http://localhost:3000/headernotice/getad", METHOD.POST, {
          index: msg.msg_id,
        })
          .then((result) => {
            if (result.data.code >= 0) {
              this.ad_img = result.data.ad_img;
              this.ad_url = result.data.ad_url;
              this.adVisible = true;
            } else {
              this.$message.error(result.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        this.msg_data.splice(index, 1);
        this.unreaded_count--;
      }
    },
    //点击广告了解详情后的动作
    adOKclick() {
      this.adVisible = false;
      window.open(this.ad_url);
    },
  },
};
</script>

<style lang="less">
.header-notice {
  display: inline-block;
  transition: all 0.3s;
  span {
    vertical-align: initial;
  }
  .notice-badge {
    color: inherit;
    .header-notice-icon {
      font-size: 16px;
      padding: 4px;
    }
  }
}
.dropdown-tabs {
  background-color: @base-bg-color;
  box-shadow: 0 2px 8px @shadow-color;
  border-radius: 4px;
  .tab-pane {
    padding: 0 24px 12px;
    min-height: 250px;
  }
}
</style>
