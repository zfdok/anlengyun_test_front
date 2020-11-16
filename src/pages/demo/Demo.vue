<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <h1>{{$t('content')}}</h1>
    <h2>123{{user}}</h2>
  </div>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  export default {
    name: 'Demo',
    i18n: require('./i18n'),
    data() {
      return {
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      ...mapGetters('account', ['user']),
      desc() {
        return this.$t('description')
      }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>