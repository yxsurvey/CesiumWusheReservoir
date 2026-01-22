function setWithExpiry(key, value, ttl) {

    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + ttl*60000,  // 注意 ttl 的單位為豪秒
    };

    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {

    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // 比較當前的時間是否已超過我們所設定的過期時間
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}
