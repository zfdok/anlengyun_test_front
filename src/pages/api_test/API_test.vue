<template>
  <div>
    <h2>{{ $t("title") }}</h2>
    <span>{{ $t("description") }}</span>
    <a-input-search
      placeholder="input a API"
      size="large"
      @search="onSearch"
      v-model="api_str"
      :loading="loading"
    >
      <a-button slot="enterButton" type="primary">
        {{ $t("button_text") }}
      </a-button>
    </a-input-search>
    <a-divider></a-divider>
    <h3>{{ rev_data }}</h3>
  </div>
</template>

<script>
import { api_get_test } from "@/services/api_test";
export default {
  name: "Api_test",
  i18n: require("./i18n"),
  data() {
    return {
      api_str: "https://anlengyun.com:3000/string",
      loading: false,
      rev_data: "收到的响应",
    };
  },
  methods: {
    onSearch() {
      this.loading = true;
      api_get_test(this.api_str)
        .then((result) => {
          this.loading = false;
          this.rev_data = result;
        })
        .catch((err) => {
          this.rev_data = err;
        });
    },
  },
};
</script>

<style>
</style>