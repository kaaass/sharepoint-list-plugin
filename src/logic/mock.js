/**
 * 获得文件列表 Mock
 * @returns {Promise<*[]>}
 */

const getFileList = async () => {
    let ret = [];
    for (let i = 0; i < 20; i++) {
        ret.push({
            filename: '文件名1.rar',
            directLink: 'https://aaaaaaaaaaaaaaaaaaaa.bbb/ccccc.ddddd?eeeeeeeeeee'
        })
    }
    return ret;
};

/**
 * 获得 Cookie Mock
 * @returns {Promise<unknown>}
 */
const getCookie = async () => {
    return "Cookie: FedAuth=";
};

/**
 * 复制到剪切板
 * @returns {Promise<boolean>}
 */
const setClipboard = async () => {
    return true;
}

/**
 * 取得 Aria 配置
 * @returns {{downloadPath: string, apiBase: string, token: string}|null}
 */
const getAriaConfig = () => {
    if (!window._aria_config) {
        return null;
    }
    return window._aria_config;
};

/**
 * 设置 Aria 配置
 * @param conf
 */
const setAriaConfig = (conf) => {
    console.log('设置新的 Aria 配置：', JSON.stringify(conf));
    window._aria_config = conf;
};

export default {
    getFileList,
    getCookie,
    setClipboard,
    getAriaConfig,
    setAriaConfig
}