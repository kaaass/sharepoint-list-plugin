<template>
  <div class="app-container">
    <el-scrollbar>
      <div class="sub-container">
        <div class="btn-group-files">
          <el-button type="primary" @click="handleCopyFile()">复制所选链接</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
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
      <div class="blank"></div>
    </el-scrollbar>
  </div>
</template>

<script>
import {getCookie, getFileList, setClipboard} from "@/logic";

export default {
  name: "PluginPanel",
  data() {
    return {
      fileList: null,
      cookie: null,
      multipleSelection: []
    }
  },

  mounted: function () {
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.filesTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.filesTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCopyFile() {
      let links = this.multipleSelection.map(obj => obj.directLink);
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