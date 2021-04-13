<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <!-- 手机界面的顶栏 -->
      <router-link
        v-if="isMobile || layout === 'head'"
        to="/mainpage"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <img width="32" src="https://img.anlengyun.com/logo.png" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <span v-if="isMobile" style="font-size: 1.5rem; margin-left: 2rem"
        >安冷云</span
      >
      <!-- 侧边栏切换按钮 -->
      <a-icon
        v-if="layout !== 'head' && !isMobile"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />
      <!-- 顶部目录, 不是侧边栏模式时才会显示  -->
      <div
        v-if="layout !== 'side' && !isMobile"
        class="admin-header-menu"
        :style="`width: ${menuWidth};`"
      >
        <i-menu
          class="head-menu"
          :theme="headerTheme"
          mode="horizontal"
          :options="menuData"
          @select="onSelect"
        />
      </div>
      <!-- 顶部条,右侧的内容 -->
      <div :class="['admin-header-right', headerTheme]">
        <!-- 帮助文档 -->
        <a-tooltip class="header-item" title="帮助文档" placement="bottom">
          <a href="https://iczer.gitee.io/vue-antd-admin-docs/" target="_blank">
            <a-icon type="question-circle-o" />
          </a>
        </a-tooltip>
        <!-- ant design 文档 -->
        <a-tooltip
          class="header-item"
          title="ant design文档"
          placement="bottom"
        >
          <a
            href="https://www.antdv.com/docs/vue/introduce-cn/"
            target="_blank"
          >
            <a-icon type="meh" />
          </a>
        </a-tooltip>

        <a-tooltip class="header-item" title="模板工程" placement="bottom">
          <a href="https://iczer.gitee.io/vue-antd-admin/" target="_blank">
            <a-icon type="fire" />
          </a>
        </a-tooltip>
        <span>{{ time_now }}</span>
        <!-- 提示 -->
        <header-notice class="header-item" />
        <!-- 头像 -->
        <header-avatar class="header-item" />

        <!-- 国际化 -->
        <a-dropdown class="lang header-item">
          <div><a-icon type="global" /> {{ langAlias }}</div>
          <a-menu
            @click="(val) => setLang(val.key)"
            :selected-keys="[lang]"
            slot="overlay"
          >
            <a-menu-item v-for="lang in langList" :key="lang.key">{{
              lang.key.toLowerCase() + " " + lang.name
            }}</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderNotice from "./HeaderNotice";
import HeaderAvatar from "./HeaderAvatar";
import IMenu from "@/components/menu/menu";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AdminHeader",
  components: { IMenu, HeaderAvatar, HeaderNotice },
  props: ["collapsed", "menuData"],
  data() {
    return {
      langList: [
        { key: "CN", name: "简体中文", alias: "简体" },
        { key: "HK", name: "繁體中文", alias: "繁體" },
        { key: "US", name: "English", alias: "English" },
      ],
      searchActive: false,
      time_now: "2020/01/01 下午3:43:26",
    };
  },
  created() {
    if (!this.isMobile) {
      setInterval(() => {
        let date = new Date();
        this.time_now = date.toLocaleString();
      }, 1000);
    }
  },
  computed: {
    ...mapState("setting", [
      "theme",
      "isMobile",
      "layout",
      "systemName",
      "lang",
      "pageWidth",
    ]),
    //判断主题
    headerTheme() {
      if (
        this.layout == "side" &&
        this.theme.mode == "dark" &&
        !this.isMobile
      ) {
        return "light";
      }
      return this.theme.mode;
    },
    //判断语言
    langAlias() {
      let lang = this.langList.find((item) => item.key == this.lang);
      return lang.alias;
    },
    //目录宽度
    menuWidth() {
      const { layout, searchActive } = this;
      const headWidth = layout === "head" ? "100% - 188px" : "100%";
      const extraWidth = searchActive ? "600px" : "400px";
      return `calc(${headWidth} - ${extraWidth})`;
    },
  },
  methods: {
    //打开关闭侧边栏
    toggleCollapse() {
      this.$emit("toggleCollapse");
    },
    //顶部菜单选择 非侧边栏模式时触发
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    },
    ...mapMutations("setting", ["setLang"]),
  },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
