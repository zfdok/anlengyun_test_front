<template>
  <div class="outer-container">
    <a-affix>
      <div
        style="
          background: linear-gradient(to bottom, #ffffff, #ddd);
          box-shadow: 2px 2px 10px #999;
          height: 3rem;
          line-height: 3rem;
          font-size: 1.3rem;
        "
      >
        <a-row>
          <a-col :span="2">
            <img
              src="https://img.anlengyun.com/anlengLogo.png"
              style="height: 2rem; margin-left: 1rem"
            />
          </a-col>
          <a-col :span="13"> </a-col>
          <a-col :span="3" class="a_col">
            <a v-if="!isMobile" href="http://www.anleng-tec.com"
              >安冷科技官网</a
            >
          </a-col>
          <a-col v-if="!isMobile" :span="3" class="a_col">
            <a href="http://www.uroica.com.cn/">精准信息官网</a>
          </a-col>
          <a-col :span="3" v-if="!isMobile">
            <div class="header_button" @click="toLogin">登录安冷云</div>
          </a-col>
          <a-col :span="6" v-if="isMobile">
            <div class="header_button" @click="toLogin">登录安冷云</div>
          </a-col>
        </a-row>
      </div>
    </a-affix>
    <div class="inner-container">
      <div class="homepage-hero-module">
        <div class="video-container">
          <div :style="fixStyle" class="filter"></div>
          <video
            :style="fixStyle"
            :autoplay="true"
            :muted="true"
            loop
            class="fillWidth"
            v-on:canplay="canplay"
          >
            <source
              src="https://img.anlengyun.com/headvideo.webm"
              type="video/webm"
            />
            浏览器不支持 video 标签，建议升级浏览器。
          </video>
          <!-- <div class="poster hidden" v-if="!vedioCanPlay">
            <img :style="fixStyle" src="../..//backSVG.svg" alt="" />
          </div> -->
          <h2 :style="descStyle">安冷云 · 智慧冷链创新者</h2>
        </div>
      </div>
      <div style="height: 30rem">
        <h2>第2幅</h2>
      </div>
      <div style="height: 30rem">
        <h2>第3幅</h2>
      </div>
      <div style="height: 30rem">
        <h2>第4幅</h2>
      </div>
      <div style="height: 30rem">
        <h2>第5幅</h2>
      </div>
      <div style="height: 30rem">
        <h2>第...幅</h2>
      </div>
      <div class="footer" v-if="!isMobile">
        <a-row>
          <a-col :span="3" style="height: 100%">
            <img
              src="https://img.anlengyun.com/anlengLogo_white.png"
              class="footter_img"
            />
          </a-col>
          <a-col :span="16" style="height: 100%">
            <div
              style="
              <!-- background-color: red; -->
               width: 100%; height: 15rem"
            ></div>
          </a-col>
          <a-col :span="2" style="height: 100%; text-align: center">
            <img
              src="https://img.anlengyun.com/al_site.png"
              class="footter_img_ewm"
            />
            <p
              style="
                font-size: 0.9rem;
                font-weight: bold;
                color: #aaa;
                margin-top: 1rem;
                width: 100%;
                text-align: center;
              "
            >
              安冷科技官网
            </p>
          </a-col>
          <a-col :span="2" style="height: 100%; text-align: center">
            <img
              src="https://img.anlengyun.com/weixingzh.png"
              class="footter_img_ewm"
            />
            <p
              style="
                font-size: 0.9rem;
                font-weight: bold;
                color: #aaa;
                margin-top: 1rem;
                width: 100%;
                text-align: center;
              "
            >
              安冷科技公众号
            </p>
          </a-col>
        </a-row>
      </div>
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
        fontsize = windowHeight / 180;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial",
        };
        this.descStyle = {
          "font-size": fontsize + "rem",
          position: "absolute",
          color: "#ffffff",
          left: "10%",
          right: "10%",
          "text-align": "center",
          top: "30%",
          "font-weight": "bold",
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
          "font-size": fontsize + "rem",
          position: "absolute",
          color: "#ffffff",
          left: "10%",
          right: "10%",
          "text-align": "center",
          top: "30%",
          "font-weight": "bold",
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
    // if (this.isMobile) {
    //   this.$router.push("/login");
    // }
  },
};
</script>

<style scoped>
a {
  display: block;
  font-size: 0.9rem;
  color: cadetblue;
  width: 100%;
}
a:hover {
  color: #5369e4;
  font-weight: bolder;
}
.a_col {
  text-align: center;
}
.a_col:hover {
  background: linear-gradient(to bottom, #f0f0f0, #ccc);
}
.outer-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.inner-container {
  position: absolute;
  left: 0;
  top: 3rem;
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
.header_button {
  position: flex;
  height: 3rem;
  font-size: 1.2rem;
  color: #ffffff;
  background: linear-gradient(to bottom, #168957, #16a957);
  width: 100%;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.header_button:hover {
  font-size: 1.2rem;
  color: #ffffff;
  background: linear-gradient(to bottom, #16a957, #168957);
  width: 100%;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.footer {
  height: 15rem;
  background-image: url("https://img.anlengyun.com/footer_back_img.jpg");
}
.footter_img {
  opacity: 0.7;
  height: 3rem;
  margin-left: 1rem;
  margin-top: 6rem;
  margin-left: 6rem;
}
.footter_img_ewm {
  opacity: 0.7;
  height: 6rem;
  margin-top: 3rem;
}
</style>