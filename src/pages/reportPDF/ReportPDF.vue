<template>
  <iframe
    :src="pdfUrl"
    frameborder="0"
    style="width: 100%; height: 100%"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      pdfUrl: "",
    };
  },
  created() {
    this.pdfUrl = sessionStorage.getItem("session_report_pdf");
  },
  mounted() {
    this.pdfUrl = sessionStorage.getItem("session_report_pdf");
  },
  watch: {
    $route(to, from) {
      if (to.path == "/datacenter/reportPDF") {
        this.pdfUrl = sessionStorage.getItem("session_report_pdf");
      }
      if (from.path == "/datacenter/reportPDF") {
        console.log("OKdevice");
      }
    },
  },
};
</script>

<style>
</style>