<template>
  <div>
    <a-button-group>
      <a-button type="primary" @click="btn2">获取项目概况</a-button>
      <a-button type="primary" @click="btn_onenet_get_user_project_info"
        >获取用户的项目概况</a-button
      >
    </a-button-group>
    <br />
    <br />
    <h2>{{ rev_data }}</h2>

    <baidu-map
      class="bm-view"
      :scroll-wheel-zoom="true"
      mapType="BMAP_NORMAL_MAP"
      center="北京"
      :zoom="zoom"
      ak="kb7cVym4jgEbuVs5EG6vPFer5vXNkpB1"
    >
      <!-- <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale> -->
      <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        type="BMAP_NAVIGATION_CONTROL_LARGE"
      ></bm-navigation>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-overview-map
        anchor="BMAP_ANCHOR_TOP_RIGHT"
        :isOpen="true"
        :size="{ width: 100, height: 100 }"
      ></bm-overview-map>
      <bm-panorama
        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
        :offset="{ width: 0, height: 50 }"
      ></bm-panorama>
      <bm-marker
        :position="{ lng: 116.404, lat: 39.915 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="我爱北京天安门"
          :labelStyle="{ color: 'red', fontSize: '14px' }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmNavigation,
  BmMapType,
  BmOverviewMap,
  BmPanorama,
  BmMarker,
  BmLabel,
} from "vue-baidu-map";
import { mapGetters } from "vuex";
import {
  onenet_get_project_info,
  onenet_get_user_project_info,
} from "@/services/onenet";
export default {
  components: {
    BaiduMap,
    BmNavigation,
    BmMapType,
    BmOverviewMap,
    BmPanorama,
    BmMarker,
    BmLabel,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 13,
      rev_data: "收到的响应",
      onenet_token:
        "version=2020-05-29&res=userid%2F163120&et=1634629884&method=sha1&sign=g6oXn%2B6R%2BYl8aDEqwfrAwSktaTk%3D",
    };
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  methods: {
    btn2() {
      onenet_get_project_info()
        .then((result) => {
          let temp_rev_data = JSON.parse(result.data.msg.body).data;
          this.rev_data =
            `激活设备总数(activate_count):${temp_rev_data.activate_count}` +
            `活跃设备总数active_count:${temp_rev_data.active_count}` +
            `设备总数device_count:${temp_rev_data.device_count}` +
            `设备在线总数online_count:${temp_rev_data.online_count}` +
            `产品类型总数product_count:${temp_rev_data.product_count}` +
            `产品类型清单product_aggregate:${temp_rev_data.product_aggregate}`;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    btn_onenet_get_user_project_info() {
      onenet_get_user_project_info({
        user: this.user.name,
      })
        .then((result) => {
          this.rev_data = result.data.msg;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
.bm-view {
  width: 100%;
  height: 300px;
}
@import "index";
</style>