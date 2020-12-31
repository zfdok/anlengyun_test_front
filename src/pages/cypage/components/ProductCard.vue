<template>
  <div>
    <!-- 加载中动画 -->
    <a-spin class="loadingthings" :spinning="loading" />
    <!-- 产品卡片列表 -->
    <a-list
      :grid="{ gutter: 24, xl: 4, lg: 2, md: 2, sm: 1, xs: 1 }"
      :dataSource="dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card
          :class="[
            'card_meta',
            { card_meta_selected: current_select_item == index },
          ]"
          @click="card_meta_click(index)"
        >
          <a-card-meta>
            <div
              style="
                margin-bottom: 3px;
                color: #fff;
                font-size: 1.5rem;
                white-space: normal;
              "
              slot="title"
            >
              {{ item.title }}
            </div>
            <a-avatar
              class="card-avatar"
              slot="avatar"
              :src="item.avatar"
              size="large"
              v-if="!isMobile"
            />
            <div class="meta-content" slot="description">
              <div style="font-size: 1rem; color: white">
                在线:
                <span style="font-size: 1.4rem; color: #55efc4">{{
                  item.online
                }}</span
                >/{{ item.all
                }}<span style="font-size: 0.2rem; color: #bbb">
                  (离 线 : {{ item.offline }} )</span
                >
              </div>
              <div style="font-size: 1rem; color: white">
                故障:
                <span style="font-size: 1.4rem; color: #fab1a0">0</span>/{{
                  item.all
                }}<span style="font-size: 0.2rem; color: #bbb">
                  (未激活:{{ item.un_activation }})</span
                >
              </div>
            </div>
          </a-card-meta>
          <a v-if="!isMobile" slot="actions">在线</a>
          <a v-if="!isMobile" slot="actions">故障</a>
          <a v-if="!isMobile" slot="actions">添加</a>
          <a v-if="!isMobile" slot="actions">删除</a>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  get_user_devicelist,
} from "@/services/onenet";

export default {
  name: "ProductCard",
  computed: {
    ...mapState("account", ["user"]),
    ...mapState("device_cysb", ["dataSource"]),
    ...mapState("setting", ["isMobile"]),
  },
  data() {
    return {
      current_select_item: 0,
      loading: false,
    };
  },
  created() {
    this.update_product_card_info();
    if (!this.isMobile) {
      this.$notification.open({
        message: "提示",
        description: "数据每分钟自动刷新, 如有需要可按F5手动刷新",
        icon: <a-icon type="smile" style="color: #108ee9" />,
      });
      setInterval(() => {
        this.update_product_card_info();
      }, 60000);
    }
  },
  methods: {
    ...mapMutations("device_cysb", ["set_cysb"]),
    //产品卡片选择时间
    card_meta_click(item) {
      this.current_select_item = item;
      this.$emit("change_main_page_item", this.current_select_item);
    },
    //更新产品卡片信息
    update_product_card_info() {
      this.loading = true;
      get_user_devicelist({
        user: this.user.name,
        type: "znbwx"
      })
        .then((result) => {
          this.update_cysb_state(result, 0); //更新在线监测仪状态
        })
        .catch((err) => {
          console.log(err);
        });
        get_user_devicelist({
        user: this.user.name,
        type: "llc"
      })
        .then((result) => {
          this.update_cysb_state(result, 1); //更新在线监测仪状态
        })
        .catch((err) => {
          console.log(err);
        });
              get_user_devicelist({
        user: this.user.name,
        type: "zhlk"
      })
        .then((result) => {
          this.update_cysb_state(result, 2); //更新在线监测仪状态
        })
        .catch((err) => {
          console.log(err);
        });
      get_user_devicelist({
        user: this.user.name,
        type: "lcjzx"
      })
        .then((result) => {
          this.update_cysb_state(result, 3); //更新蓝牙监测仪状态
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //设备更新状态数据通用函数
    update_cysb_state(result, index) {
      let temp_all = JSON.parse(result.data.msg.body).data.meta.total; //在线监测仪设备总数
      let zx_list = JSON.parse(result.data.msg.body).data.list;
      let un_activation = 0;
      let un_activation_device = [];
      let online = 0;
      let online_device = [];
      let offline = 0;
      let offline_device = [];
      let ordered_cysb_all_list = [];
      var now_date = new Date();
      zx_list.forEach((device) => {
        let last_time = new Date(device.last_time);
        if (device.status == 1) {
          un_activation++;
          un_activation_device.push(device);
        } else if (device.status == 2 || now_date - last_time < 360000) {
          online++;
          online_device.push(device);
        } else {
          offline++;
          offline_device.push(device);
        }
      });
      ordered_cysb_all_list = ordered_cysb_all_list.concat(online_device);
      ordered_cysb_all_list = ordered_cysb_all_list.concat(offline_device);
      ordered_cysb_all_list = ordered_cysb_all_list.concat(
        un_activation_device
      );
      this.set_cysb({ index: index, data: { all: temp_all } });
      this.set_cysb({
        index: index,
        data: { all_device: ordered_cysb_all_list },
      });
      this.set_cysb({ index: index, data: { un_activation: un_activation } });
      this.set_cysb({
        index: index,
        data: { un_activation_device: un_activation_device },
      });
      this.set_cysb({ index: index, data: { online: online } });
      this.set_cysb({ index: index, data: { online_device: online_device } });
      this.set_cysb({ index: index, data: { offline: offline } });
      this.set_cysb({ index: index, data: { offline_device: offline_device } });
    },
  },
};
</script>

<style lang="less" scoped>
.loadingthings {
  position: absolute;
  top: -20px;
}
.card_meta {
  display: block;
  box-shadow: 5px 5px 10px #ccc;
  text-shadow: 1px 1px 5px #aaaaaa;
  position: relative;
  background-color: #1890ff;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606192351631&di=90caa6623a190814804d8b99ceb55283&imgtype=0&src=http%3A%2F%2Fppt.yyfangchan.com%2Fd%2FIMG%2F154nxv02knd.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  text-align: center;
}

.card_meta:hover {
  display: block;
  position: relative;
  box-shadow: 10px 10px 15px #999;
  background-size: 130% 130%;
  text-shadow: 2px 2px 5px #888;
}
.card_meta_selected {
  display: block;
  position: relative;
  box-shadow: 10px 10px 15px #999;
  background-size: 130% 130%;
  text-shadow: 2px 2px 5px #888;
}
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.new-btn {
  border-radius: 2px;
  width: 100%;
  height: 187px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>