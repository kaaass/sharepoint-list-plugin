import {isDev} from "@/config";
import mock from "@/logic/mock.js";
import actual from "@/logic/actual.js";

let selected = actual;
// 开发环境启用 Mock
if (isDev) {
  selected = mock;
}

// 函数
const getFileList = selected.getFileList;
const getCookie = selected.getCookie;
const setClipboard = selected.setClipboard;

export {
  getFileList,
  getCookie,
  setClipboard
}