<template>
  <div>
    <a-button type="primary" @click="btn1">测试链接</a-button>
    <br />
    <br />
    <h2>{{ rev_data }}</h2>
  </div>
</template>

<script>
import { request, METHOD } from "@/utils/request";

export default {
  data() {
    return {
      rev_data: "收到的响应",
    };
  },
  methods: {
    btn1() {
      console.log("haha");
      //http://www.anlengyun.top:3000/string
      request("http://www.anlengyun.top:3000/string", METHOD.GET)
        .then((result) => {
          console.log(result);
          this.rev_data = result.data;
          console.log(this.rev_data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>