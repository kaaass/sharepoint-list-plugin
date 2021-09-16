<template>
  <el-dialog title="配置 Aria RPC" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="Aria RPC 地址">
        <el-input v-model="form.apiBase" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Aria RPC Token">
        <el-input v-model="form.token" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="下载位置">
        <el-input v-model="form.downloadPath" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getAriaConfig, setAriaConfig} from "@/logic";

export default {
  name: "AriaConfigDialog",
  data() {
    return {
      visible: false,
      form: {
        apiBase: '',
        token: '',
        downloadPath: '',
      },
    };
  },
  mounted() {
    let conf = getAriaConfig();
    if (conf != null) {
      this.form = conf;
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    handleConfirm() {
      // 关闭对话框
      this.visible = false;
      setAriaConfig(this.form);
      this.$message.success("设置成功！");
    }
  }
}
</script>

<style scoped>

</style>