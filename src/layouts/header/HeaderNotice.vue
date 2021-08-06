<template>
  <div>
    <!-- 消息下拉菜单 -->
    <a-dropdown :trigger="['click']" v-model="show">
      <div slot="overlay">
        <a-spin :spinning="loading">
          <a-tabs
            class="dropdown-tabs"
            :tabBarStyle="{ textAlign: 'center' }"
            :style="{ width: '420px' }"
          >
            <a-tab-pane tab="未读消息" key="1">
              <div style="text-align: center">
                <a-button
                  type="primary"
                  size="small"
                  shape="round"
                  @click="clearAllNotice"
                  >全部已读</a-button
                >
              </div>
              <a-list class="tab-pane">
                <a-list-item v-for="(msg, index) in msg_data" :key="index">
                  <a-list-item-meta :title="msg.title + '(' + msg.time + ')'">
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
                    shape="round"
                    @click="readNotice(msg, index)"
                    >了解</a-button
                  ><a-button
                    v-if="msg.type == 'alert'"
                    type="danger"
                    size="small"
                    shape="round"
                    @click="readNotice(msg, index)"
                    >确定</a-button
                  >
                  <a-button
                    v-if="msg.type == 'notice'"
                    style="background-color: #00897b; color: #f0f0f0"
                    size="small"
                    shape="round"
                    @click="readNotice(msg, index)"
                    >踊跃参加</a-button
                  >
                </a-list-item>
              </a-list>
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
import {
  get_headernotice,
  read_notice,
  set_firstshow_readed,
} from "@/services/headerNotice";
import { mapState } from "vuex";
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
      notice_auto_flash_timespan: 60000,
      timer1: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.timer1);
    this.timer1 = null;
  },
  created() {
    if (!this.isMobile) {
      if (this.timer1 == null) {
        this.timer1 = setInterval(() => {
          this.get_notice();
        }, this.notice_auto_flash_timespan);
      }
    }
  },
  mounted() {
    //组件渲染前获取数据
    this.get_notice();
  },
  computed: {
    ...mapState("account", ["user"]),
  },
  methods: {
    //获取消息
    get_notice() {
      get_headernotice({
        user: this.user.name,
      })
        .then((result) => {
          this.msg_count = result.data.count;
          this.unreaded_count = result.data.unreaded_count;
          this.msg_data = result.data.data;
          this.msg_data.forEach((notice) => {
            if (notice.type == "alert") {
              if (notice.first_show == 0) {
                setTimeout(() => {
                  const key = notice.msg_id;
                  this.$notification.open({
                    message: notice.title + "  (" + notice.time + ")",
                    description: notice.desc,
                    duration: this.notice_auto_flash_timespan / 1000 - 2,
                    style: {
                      backgroundColor: "#ff7979",
                    },
                    icon: <a-icon type="alert" style="color: darkred" />,
                    key,
                    onClose: () => {},
                    btn: (h) => {
                      return [
                        h(
                          "a-button",
                          {
                            props: {
                              type: "dashed",
                              size: "small",
                              ghost: "ghost",
                              shape: "round",
                            },
                            on: {
                              click: () => {
                                this.clearAllNotice();
                              },
                            },
                          },
                          "全部已读"
                        ),
                        h("span", " "),
                        h(
                          "a-button",
                          {
                            props: {
                              type: "primary",
                              size: "small",
                              shape: "round",
                            },
                            on: {
                              click: () => {
                                set_firstshow_readed({ msg_id: notice.msg_id });
                                this.$notification.close(key);
                              },
                            },
                          },
                          "已读"
                        ),
                      ];
                    },
                  });
                }, 100);
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
        this.$warning({
          title: msg.title + "(" + msg.time + ")",
          content: msg.desc,
          onOk() {},
        });
        read_notice({
          index: msg.msg_id,
        });
        this.msg_data.splice(index, 1);
        this.unreaded_count--;
      }
      if (msg.type == "notice") {
        read_notice({
          index: msg.msg_id,
        });
        if (msg.ad_url) {
          this.ad_img = msg.ad_img;
          this.ad_url = msg.ad_url;
          this.adVisible = true;
        }
        this.msg_data.splice(index, 1);
        this.unreaded_count--;
      }
    },
    //点击广告了解详情后的动作
    adOKclick() {
      this.adVisible = false;
      window.open(this.ad_url);
    },
    clearAllNotice() {
      this.msg_data.forEach((msg) => {
        if (msg.type != "notice") {
          read_notice({
            index: msg.msg_id,
          });
        }
      });
      this.msg_data = [];
      this.unreaded_count = 0;
      this.$notification.destroy();
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
