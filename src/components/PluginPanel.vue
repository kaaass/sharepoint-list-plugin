<template>
  <div class="app-container">
    <el-scrollbar>
      <div class="sub-container">
        <div class="btn-group-files">
          <el-button
              v-if="this.cookie !== ''"
              type="primary"
              size="mini"
              @click="handleIdm()">IDM 下载
          </el-button>
          <el-button
              v-if="this.cookie !== ''"
              type="primary"
              size="mini"
              @click="handleAria()">Aria 下载
          </el-button>
          <el-button size="mini" @click="handleCopyFile()">复制链接</el-button>
          <el-tooltip class="item" effect="dark" content="不太好用，建议优先使用 IDM 或 Aria 推送" placement="top-start">
            <el-button size="mini" @click="handleBatchDownload()">批量下载</el-button>
          </el-tooltip>
        </div>
        <el-table
            ref="filesTable"
            :data="fileList"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="filename"
              label="文件名">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  size="mini"
                  @click="handleDownload(scope.row.directLink)">下载
              </el-button>
              <el-button
                  size="mini"
                  @click="handleCopyLink(scope.row.directLink)">复制链接
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="sub-container">
        <h3 class="sub-title">Cookie 信息</h3>
        <div class="not-tampermonkey-beta" v-if="this.cookie === ''">
          <!--无法获得-->
          <el-alert
              title="无法获得 Cookie 信息"
              type="info"
              description="由于您没有使用 Tampermonkey Beta，因此无法自动获得 Cookie。请在“开发者选项-Application-Cookie”中，
            复制 FedAuth 对应的值。然后在 AriaNG 的“自定义请求头”填写：Cookie: FedAuth=复制的值"
              show-icon
              v-bind:closable="false">
          </el-alert>
        </div>
        <div class="tampermonkey-beta" v-if="this.cookie !== ''">
          <!--成功获得-->
          <el-alert
              style="margin-bottom: 15px"
              title="Cookie 信息"
              type="success"
              description="下载时在 AriaNG 的“自定义请求头”填写"
              show-icon
              v-bind:closable="false">
          </el-alert>
          <el-input
              type="textarea"
              :rows="3"
              placeholder="Cookie"
              v-model="cookie">
          </el-input>
          <div class="btn-group-files">
            <el-button type="primary" @click="handleCopyCookie()">复制</el-button>
          </div>
        </div>
      </div>
      <div class="sub-container">
        <h3 class="sub-title">设置</h3>
        <div class="btn-group-files">
          <el-button @click="handleConfigAria()">配置 Aria RPC</el-button>
        </div>
      </div>
      <div class="blank"></div>
    </el-scrollbar>
  </div>
</template>

<script>
import {buildEf2File, getCookie, getFileList, sendAriaRequest, setClipboard} from "@/logic";
import {downloadClob} from "@/utils";
import AriaConfigDialog from "@/components/AriaConfigDialog.vue";

export default {
  name: "PluginPanel",
  components: {AriaConfigDialog},
  data() {
    return {
      fileList: null,
      cookie: null,
      multipleSelection: [],
    }
  },

  mounted() {
    this.loadFileList();
    this.loadCookie();
  },

  methods: {
    loadFileList() {
      getFileList().then(data => {
        this.fileList = data;
        // 全选
        this.$nextTick(() => {
          this.$refs.filesTable.clearSelection();
          this.$refs.filesTable.toggleAllSelection();
        });
      }).catch(e => {
        console.log("无法读取文件列表", e);
        this.$message.error(`读取文件列表失败！${e}`);
      })
    },
    loadCookie() {
      getCookie().then(data => {
        this.cookie = data;
      }).catch(e => {
        console.log("无法读取 Cookie", e);
        this.cookie = "";
      })
    },
    getSelectedLinks() {
      return this.multipleSelection.map(obj => obj.directLink);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCopyFile() {
      let links = this.getSelectedLinks();
      if (links.length < 1) {
        this.$message.error("请选择要下载的文件！");
        return;
      }
      setClipboard(links.join("\n")).then(() => {
        this.$message.success("复制成功！");
      });
    },
    handleCopyCookie() {
      setClipboard(this.cookie).then(() => {
        this.$message.success("复制成功！");
      });
    },
    handleDownload(url) {
      window.open(url, "_blank");
    },
    handleCopyLink(url) {
      setClipboard(url).then(() => {
        this.$message.success("复制成功！");
      });
    },
    handleBatchDownload() {
      let links = this.getSelectedLinks();
      if (links.length < 1) {
        this.$message.error("请选择要下载的文件！");
        return;
      }
      links.forEach(link => window.open(link, "_blank"));
    },
    handleIdm() {
      let ef2 = buildEf2File(this.getSelectedLinks(), this.cookie);
      downloadClob(ef2, 'download.ef2');
      this.$message.success("成功！请在 IDM 中导入此文件下载");
    },
    handleAria() {
      sendAriaRequest(this.getSelectedLinks(), this.cookie)
          .then(ret => {
            // 检查是否成功
            if (ret === "no_config") {
              this.$message.warning("还没配置过 Aria RPC，请先配置！");
              this.$emit('onOpenAriaDialog');
              return;
            }
            this.$message.success("成功推送至 Aria！")
          })
          .catch(e => {
            // 报错
            this.$message.error(`推送失败！${e}`);
          });
    },
    handleConfigAria() {
      this.$emit('onOpenAriaDialog');
    }
  }
}
</script>

<style scoped>
.app-container {
  height: 100%;
}

.el-scrollbar {
  height: 100%;
}

.box .el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 120%;
}

.blank {
  height: 100px;
}

.sub-container {
  margin-top: 20px;
}

.sub-title {
  margin-bottom: 15px;
}

.btn-group-files {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>