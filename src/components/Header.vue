<template>
  <div class="header">
    <i class="el-icon-link"></i>
    <h3>{{AppName}}</h3>
    <el-tag>v{{AppVersion}}</el-tag>
  </div>
</template>

<script>
import { AppName, AppVersion } from '@/config'
export default {
  name: 'Header',
  data() {
    return {
      AppName,
      AppVersion,
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding:10px;

  i {
    font-size: 20px;
  }

  h3 {
    margin: 0 10px;
    font-size: 20px;
  }
}
</style>