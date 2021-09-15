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

export default {
    getFileList,
    getCookie,
    setClipboard
}