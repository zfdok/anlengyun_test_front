<template>
  <div>
    123
    {{ history_selected }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      history_selected: "",
    };
  },
  created() {
    this.history_selected = JSON.parse(
      sessionStorage.getItem("session_history_selected")
    );
  },
  mounted() {
    this.history_selected = JSON.parse(
      sessionStorage.getItem("session_history_selected")
    );
    console.log(this.history_selected);
  },
  watch: {
    $route(to, from) {
      if (to.path == "/devicehistory") {
        this.history_selected = JSON.parse(
          sessionStorage.getItem("session_history_selected")
        );
      }
      if (from.path == "/devicehistory") {
        this.history_selected=null;
      }
    },
  },
  methods: {},
};
</script>

<style>
</style>