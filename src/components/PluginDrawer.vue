<template>
  <div>
    <div class="body" :class="{ 'body-hide': isHide }">
      <Header/>
      <PluginPanel ref="panel" @onOpenAriaDialog="handleOpenAriaDialog"/>
      <div class="btn-toggle" @click="hide">
        <ArrowIcon/>
      </div>
    </div>
    <AriaConfigDialog ref="ariaDialog"/>
  </div>
</template>

<script>
import Header from './Header.vue'
import ArrowIcon from "@/icons/ArrowIcon.vue";
import PluginPanel from "@/components/PluginPanel.vue";
import AriaConfigDialog from "@/components/AriaConfigDialog.vue";

export default {
  name: 'PluginDrawer',
  components: {AriaConfigDialog, PluginPanel, ArrowIcon, Header},
  data() {
    return {
      isHide: true,
    }
  },
  methods: {
    hide() {
      this.isHide = !this.isHide;
      // 打开侧边时重载文件列表
      if (!this.isHide) {
        this.$refs.panel.loadFileList(false);
      }
    },
    handleOpenAriaDialog() {
      this.$refs.ariaDialog.open();
    },
  },
}
</script>

<style lang="scss" scoped>
.body {
  position: fixed;
  z-index: 1999;
  left: 0;
  top: 0;
  height: 100%;
  width: 420px;
  background-color: rgb(255, 255, 255);
  transition: all 0.5s;
  box-shadow: 2px 3px 3px 0 rgba(0, 0, 0, .1);
}

.btn-toggle {
  transition: all 0.5s;
  border-radius: 30px 0 0 30px;
  width: 30px;
  height: 60px;
  background-color: rgb(0, 120, 212);
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  z-index: 2999;

  svg {
    height: 20px;
    width: 20px;
    position: absolute;
    right: 5px;
    top: 20px;
    transition: all 0.5s;
  }
}

.body-hide {
  left: -420px;
  box-shadow: 2px 3px 3px 0 rgba(0, 0, 0, .0);

  .btn-toggle {
    border-radius: 0 30px 30px 0;
    right: -30px;

    svg {
      transform: rotate(180deg);
    }
  }
}
</style>
