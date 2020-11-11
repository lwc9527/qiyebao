import CryptoJS from 'crypto-js'
import JsEncrypt from 'jsencrypt'

// 加密
export const Aes = (str, keyStr) => {
    let code = process.env.NODE_ENV == 'development'? 'sWuh13fdMG0NORsNQfM0jg==': '17tnlO0NhS1w3CdYtLYA8Q==';
    keyStr = keyStr? keyStr: code.slice(0, 16);
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let srcs = CryptoJS.enc.Utf8.parse(str)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,                // mode 与后台一致
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
}

export function noAes(word, keyStr){
    let code = process.env.NODE_ENV == 'development'? 'sWuh13fdMG0NORsNQfM0jg==': '17tnlO0NhS1w3CdYtLYA8Q==';
    keyStr = keyStr? keyStr: code.slice(0, 16);
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode:CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Latin1.stringify(decrypt).toString();
}

export const setRsa = (password) => {
    let jse = new JSEncrypt();
    //公钥
    let publicString = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLMo+gY65VDSCdK1kuuy3+w3UUBOD5FOxyFhV9OE7T1rpbXH8Jl1v+mbfqSwCPPWxOIEG8qvmOdu5WlmxhMiNkyrBOt7SDs0xLUG9leqMn+D9FUYVK4NevIHCbJxVKMrlf89oc1flCGF+hOEIMUoftxXNW9GLYXQXTA5OdzDu14QIDAQAB'
    jse.setPublicKey(publicString);
    // 加密内容
    let encrypted = jse.encrypt(password);
    return encrypted
};
export const getRsa = (password) => {
    let jse = new JSEncrypt();
    //这里填写你的私钥
    let privateKey = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIxv4JCB3uL/Gns+w2u9JSo+VVgMWRQxzQi2Y9BTjwc0Y9DUwAz1+bXzBnTFD0uHz2+SX7dxylY9ZREoBkG0HBQFdUUMRtTbPESnzVQ0Y1Cprn+BQo+FRwcJ/wxJVMVtg1MCsmBxOmxpq71G2rO93ek/2m4JbYeC9W8/T0gwiPyPAgMBAAECgYBTExtUYH7o6N9RaJ9RbGI/yv/RRfyr5YnUTZBd/A/vwx4IutGg2SEOcOSwzqFtnLko1v2oFrgKq+bNb0/ELjctAFPSumQ1e/KQX7KZ7LY11fgRFZlfrtiB7FZNKT323pof8nKlaQ+LsHuWmwSQbDNwsXTaZYmy9JzPaNQ1QJm9AQJBAMSaQdUY7P1QLe7Av82keeBA/ZVS/GL62XjPT9sFQ8FozoiM4V1RupMRFXzvdXDE3qLin0UilEBtoMHMX5X1pAkCQQC23aI8oKWe5jJInQ0QG7Ey/XewRyCM9ETHcDpfqCZN2oAq/pBT5xQYshBXvRpEnrbnGcADIUQzvY7ZaBXKwrHXAkACTENEuFvcwhknVz1mq+t4wYm1OxkUFxZ/oPyv9KnMEuuHEQ55RsFFgsebhDj9Lm/ju35dEoBlGGLuoPLlD8/xAkBNNOpImrMSkbJtQhG/2VFJbAbaoE039fIMGnAq7v2tJTGz9WLOaePsQVHxGWA71J74l8CgEa2QAtqLJAz/XJBlAkEAi5kwEG/aX2y1HqWRcXHoiBS/XHNpUDwBFIutejQQJGwg+xJ/02/fLm7bYOhIHy6IhjjZZ5Qdb0dl9J3vgNrhgw=='
    jse.setPrivateKey(privateKey);
    // 加密内容
    let decrypt = jse.decrypt(password);
    return decrypt
};


// AES加密 ：字符串 key iv  返回base64
export const aesEncrypt = (str, keyStr, ivStr) => {

    keyStr = keyStr? keyStr: 'sWuh13fdMG0NORsNQfM0jg==';

    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let iv = CryptoJS.enc.Utf8.parse(ivStr)

    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,                // mode 与后台一致
        padding: CryptoJS.pad.ZeroPadding,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}
// AES 解密 ：字符串 key iv  返回base64
export function aesDecrypt(str, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let iv = CryptoJS.enc.Utf8.parse(ivStr)

    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let base64 = CryptoJS.enc.Base64.parse(str);
    let src = CryptoJS.enc.Base64.stringify(base64);

    let decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        // mode: CryptoJS.mode.ECB,
        mode: CryptoJS.mode.BCB, // 保持一致
        padding: CryptoJS.pad.Pkcs7
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}