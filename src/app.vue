<template>
  <div class="app">
    <PluginDrawer />
  </div>
</template>

<script>
import PluginDrawer from '@/components/PluginDrawer.vue'
import { AppName, AppVersion } from '@/config'

export default {
  name: 'app',
  components: {
    PluginDrawer,
  },
  data() {
    return {
      AppName,
      AppVersion,
    }
  },
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
