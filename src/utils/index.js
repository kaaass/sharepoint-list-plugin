/**
 * 加载样式
 * @param {String} url
 */
export const loadStyle = (url) => {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
}

/**
 * 触发文本文件下载
 * @param content
 * @param filename
 */
export const downloadClob = (content, filename) => {
    let elDownload = document.createElement('a');
    elDownload.download = filename;
    elDownload.style.display = 'none';
    let blob = new Blob([content]);
    elDownload.href = URL.createObjectURL(blob);
    document.body.appendChild(elDownload);
    elDownload.click();
    document.body.removeChild(elDownload);
};