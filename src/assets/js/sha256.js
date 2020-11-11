import { KJUR, hextob64} from 'jsrsasign';

export const SHA256withECDSA = ()=> {
    // 公钥 
    let pk="-----BEGIN PUBLIC KEY-----\n" +
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLMo+gY65VDSCdK1kuuy3+w3UUBOD5FOxyFhV9OE7T1rpbXH8Jl1v+mbfqSwCPPWxOIEG8qvmOdu5WlmxhMiNkyrBOt7SDs0xLUG9leqMn+D9FUYVK4NevIHCbJxVKMrlf89oc1flCGF+hOEIMUoftxXNW9GLYXQXTA5OdzDu14QIDAQAB\n'+
        "-----END PUBLIC KEY-----";
    // 私钥
    let priK = "-----BEGIN PUBLIC KEY-----\n" +
    'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIxv4JCB3uL/Gns+w2u9JSo+VVgMWRQxzQi2Y9BTjwc0Y9DUwAz1+bXzBnTFD0uHz2+SX7dxylY9ZREoBkG0HBQFdUUMRtTbPESnzVQ0Y1Cprn+BQo+FRwcJ/wxJVMVtg1MCsmBxOmxpq71G2rO93ek/2m4JbYeC9W8/T0gwiPyPAgMBAAECgYBTExtUYH7o6N9RaJ9RbGI/yv/RRfyr5YnUTZBd/A/vwx4IutGg2SEOcOSwzqFtnLko1v2oFrgKq+bNb0/ELjctAFPSumQ1e/KQX7KZ7LY11fgRFZlfrtiB7FZNKT323pof8nKlaQ+LsHuWmwSQbDNwsXTaZYmy9JzPaNQ1QJm9AQJBAMSaQdUY7P1QLe7Av82keeBA/ZVS/GL62XjPT9sFQ8FozoiM4V1RupMRFXzvdXDE3qLin0UilEBtoMHMX5X1pAkCQQC23aI8oKWe5jJInQ0QG7Ey/XewRyCM9ETHcDpfqCZN2oAq/pBT5xQYshBXvRpEnrbnGcADIUQzvY7ZaBXKwrHXAkACTENEuFvcwhknVz1mq+t4wYm1OxkUFxZ/oPyv9KnMEuuHEQ55RsFFgsebhDj9Lm/ju35dEoBlGGLuoPLlD8/xAkBNNOpImrMSkbJtQhG/2VFJbAbaoE039fIMGnAq7v2tJTGz9WLOaePsQVHxGWA71J74l8CgEa2QAtqLJAz/XJBlAkEAi5kwEG/aX2y1HqWRcXHoiBS/XHNpUDwBFIutejQQJGwg+xJ/02/fLm7bYOhIHy6IhjjZZ5Qdb0dl9J3vgNrhgw==\n'
    + "-----END PRIVATE KEY-----";
  
    // 原文
    var src = '{ "a": "LANHAISHENGTAI", "b": 1, "c": "d", "e": "system", "values": [{ "dateTime": 1577808000000, "dataValue": 12.3 }] }';

    debugger
    var sig = new KJUR.crypto.Signature({'alg':'SHA256withECDSA'});
    sig.init(priK);
    console.log('sig', sig);
    sig.updateString('aaa');

    var sigValueHex = sig.sign();// 签名hex ecdsa每次的签名是不同的
    console.log('sigValueHex', sigValueHex); // base64格式的签名
    console.log('64', hextob64(sigValueHex)); // base64格式的签名
  
    // return sig.sign();
   // 以下是官方示例
   //  // ECDSA signing  签名
   //  var sig = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
   //  sig.init(prvKeyPEM);
   //  sig.updateString('aaa');
   //  var sigValueHex = sig.sign();
   
   //  // ECDSA verifying 验签
   //  var sig2 = new KJUR.crypto.Signature({'alg':'SHA1withECDSA'});
   //  sig.init(certPEM);
   //  sig.updateString('aaa');
   //  var isValid = sig.verify(sigValueHex);
  
 }