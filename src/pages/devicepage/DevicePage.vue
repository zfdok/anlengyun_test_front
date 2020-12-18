<template>
  <div>
    <h2>设备详情</h2>
    <h2>{{ rev_data }}</h2>
    <h2>设备历史数据</h2>
    <h2>{{ device_history }}</h2>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get_device_history } from "@/services/onenet";
export default {
  data() {
    return {
      rev_data: {},
      device_history: {},
    };
  },
  created() {
    console.log(this.$route.query);
    this.rev_data = this.$route.query;
    console.log(this.rev_data["device"]["type"]);
    console.log(this.rev_data["device"]["id"]);
    console.log(this.rev_data["device"]["product_id"]);
    this.get_history(1608159702313,1608259702313,"temp",0,100);
  },
  computed: {
    ...mapState("account", ["user"]),
  },
  methods: {
    get_history(start_time, end_time, identifier, offset, limit) {
      get_device_history({
        user: this.user.name,
        type: this.rev_data["device"]["type"],
        device_name: this.rev_data["device"]["id"],
        start_time,
        end_time,
        identifier,
        offset,
        limit,
      })
        .then((result) => {
          console.log(result);
          this.device_history = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>