import {isDev} from "@/config";
import mock from "@/logic/mock.js";
import actual from "@/logic/actual.js";

let selected = actual;
// 开发环境启用 Mock
if (isDev) {
    selected = mock;
}

// 函数
export const getFileList = selected.getFileList;
export const getCookie = selected.getCookie;
export const setClipboard = selected.setClipboard;

export const buildEf2File = (fileLists, cookie) => {
    return fileLists
        .map(obj => `<\r\n${obj.directLink}\r\n${cookie}\r\n>`)
        .join("\r\n");
};
