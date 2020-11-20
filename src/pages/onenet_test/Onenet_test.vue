<template>
  <div>
    <a-button-group>
      <a-button type="primary" @click="btn1">测试链接</a-button>
      <a-button type="primary" @click="btn2">获取项目概况</a-button>
      <a-button type="primary" @click="btn_onenet_get_user_project_info"
        >获取用户的项目概况</a-button
      >
    </a-button-group>
    <br />
    <br />
    <h2>{{ rev_data }}</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  onenet_get_test,
  onenet_get_project_info,
  onenet_get_user_project_info,
} from "@/services/onenet";
export default {
  data() {
    return {
      rev_data: "收到的响应",
      onenet_token:
        "version=2020-05-29&res=userid%2F163120&et=1634629884&method=sha1&sign=g6oXn%2B6R%2BYl8aDEqwfrAwSktaTk%3D",
    };
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  methods: {
    btn1() {
      onenet_get_test({})
        .then((result) => {
          this.rev_data = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
      //{ "code": 0, "msg": { "statusCode": 200, "body": "{\"code\":\"iot.application.invalidParameter\",\"msg\":\"invalid parameter\",\"requestId\":\"1699b29eb41148ce9cb5676589dc5aeb\",\"success\":false}", "headers": { "content-length": "132", "content-type": "application/json; charset=utf-8", "date": "Fri, 20 Nov 2020 03:01:58 GMT", "x-readtime": "8", "connection": "close" }, "request": { "uri": { "protocol": "http:", "slashes": true, "auth": null, "host": "openapi.heclouds.com", "port": null, "hostname": "openapi.heclouds.com", "hash": null, "search": "?action=QueryGroupDetail&version=1&project_id=Sd5MPm&id=HkhwSb", "query": "action=QueryGroupDetail&version=1&project_id=Sd5MPm&id=HkhwSb", "pathname": "/application", "path": "/application?action=QueryGroupDetail&version=1&project_id=Sd5MPm&id=HkhwSb", "href": "http://openapi.heclouds.com/application?action=QueryGroupDetail&version=1&project_id=Sd5MPm&id=HkhwSb" }, "method": "GET", "headers": { "Authorization": "version=2020-05-29&res=userid%2F163120&et=1634629884&method=sha1&sign=g6oXn%2B6R%2BYl8aDEqwfrAwSktaTk%3D" } } } }
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>