<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="homepage-hero-module">
        <div class="video-container">
          <div :style="fixStyle" class="filter"></div>
          <video
            :style="fixStyle"
            :autoplay="true"
            loop
            class="fillWidth"
            v-on:canplay="canplay"
          >
            <source src="../../assets/img/headvideo3.mp4" type="video/mp4" />
            浏览器不支持 video 标签，建议升级浏览器。
            <source src="PATH_TO_WEBM" type="video/webm" />
            浏览器不支持 video 标签，建议升级浏览器。
          </video>
          <div class="poster hidden" v-if="!vedioCanPlay">
            <img :style="fixStyle" src="../../assets/img/backSVG.svg" alt="" />
          </div>
          <h2 :style="descStyle">安冷云 · 智慧冷链创新者</h2>
        </div>
      </div>

      <a-button type="primary" @click="toLogin"
        >点击进入安冷云管理平台</a-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "homepage",
  data() {
    return {
      vedioCanPlay: false,
      fixStyle: "",
      descStyle: "",
    };
  },
  computed: {
    ...mapState("setting", ["isMobile"]),
  },
  mounted() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      let fontsize;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        fontsize = windowHeight / 200;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial",
        };
        this.descStyle = {
          "font-size": fontsize +"rem",
          position: "absolute",
          color: "#ffffff",
          left: "20%",
          right: "20%",
          top: "30%",
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        fontsize = windowWidth / 300;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial",
        };
        this.descStyle = {
          "text-align":"center",
          "font-size": fontsize +"rem",
          position: "absolute",
          color: "#ffffff",
          left: "20%",
          right: "20%",
          top: "30%",
        };
      }
    };
    window.onresize();
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true;
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  beforeMount() {
    if (this.isMobile) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.outer-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.inner-container {
  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.homepage-hero-module,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
</style>