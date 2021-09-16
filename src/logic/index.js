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

/**
 * 构造 IDM 下载列表
 * @param fileLists
 * @param cookie
 * @returns {string}
 */
export const buildEf2File = (fileLists, cookie) => {
    return fileLists
        .map(link => `<\r\n${link}\r\n${cookie}\r\n>`)
        .join("\r\n") + "\r\n\r\n";
};

export const getAriaConfig = selected.getAriaConfig;
export const setAriaConfig = selected.setAriaConfig;

/**
 * 发送 Aria RPC 下载请求
 * @param fileLists
 * @param cookie
 */
export const sendAriaRequest = async (fileLists, cookie) => {
    const conf = getAriaConfig();
    if (!conf) {
        return "no_config";
    }
    // 构造 RPC Payload
    let params = {header: [cookie]};
    if (conf.downloadPath.length > 0) {
        params.dir = conf.downloadPath;
    }
    // 发送
    const downloadSingle = async (link) => {
        let payload = {
            jsonrpc: "2.0",
            method: "aria2.addUri",
            id: "sharepoint-list-plugin",
            params: [
                `token:${conf.token}`,
                [link],
                params
            ]
        };
        console.log("发送 Aria RPC：", conf.apiBase, JSON.stringify(payload));
        if (isDev) {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json;charset=UTF-8');
            let response = await fetch(conf.apiBase, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } else {
            // 由于 Mixed-Content，所以只能用 GM_xmlhttpRequest 请求
            return await new Promise(function (resolve, reject) {
                GM_xmlhttpRequest({
                    method: 'POST',
                    responseType: 'json',
                    url: conf.apiBase,
                    data: JSON.stringify(payload),
                    timeout: 3000,
                    onload(res) {
                        if (res.status === 200) {
                            if (res.response.result) {
                                // 正常返回
                                resolve(res.response);
                            } else {
                                // 其它错误
                                reject(`下载错误！${res.response.message}`);
                            }
                        } else {
                            reject(`创建任务失败！${res.responseText}`);
                            console.error("创建任务失败！", res);
                        }
                    },
                    ontimeout(res) {
                        reject("连接超时！");
                        console.error("连接超时！", res);
                    },
                    onerror(res) {
                        reject("无法发送 Aria 下载请求！请尝试添加服务器路径到用户域名白名单。");
                        console.error("无法发送 Aria 下载请求！", res);
                    }
                });
            });
        }
    };
    return Promise.all(fileLists.map(downloadSingle));
};
