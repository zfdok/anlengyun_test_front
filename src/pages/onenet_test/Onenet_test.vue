<template>
  <div>
    <a-button type="primary" @click="btn1">测试链接</a-button>
    <br />
    <br />
    <h2>{{ rev_data }}</h2>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  data() {
    return {
      rev_data: "收到的响应",
      onenet_token:
        "version=2020-05-29&res=userid%2F163120&et=1634629884&method=sha1&sign=g6oXn%2B6R%2BYl8aDEqwfrAwSktaTk%3D",
    };
  },
  methods: {
    btn1() {
      console.log("haha");
      this.$axios
        .get(
          "https://openapi.heclouds.com/",
          {
            action: "QueryStatistics",
            version: "1",
            project_id: "Sd5MPm",
          },
          {
            headers: {
              token: "Bearer ",
              Authorization: this.onenet_token,
            },
          }
        )
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