function getContextPath() {
    var pathName = window.document.location.pathname;
    // 如果pathName只有一个斜杠（即上下文路径为空），直接返回空字符串
    if (pathName === '/') {
        return '';
    }
    // 获取带"/"的项目名，如：/MyWeb
    var firstSlashIndex = pathName.indexOf('/', 1);
    if (firstSlashIndex === -1) {
        // 如果没有第二个斜杠，说明整个pathName就是项目名
        return pathName;
    }
    return pathName.substring(0, firstSlashIndex);
}

var ctx = getContextPath()