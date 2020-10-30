/***********
 * 通讯模块
 * @type {number}
 */
let _uniqueID = 20190315;
let _isLock = false;
const _constants = {};
const _events = {};

export const getZIndex = () => _uniqueID++;
export const getUniqueId = () => ("COMP_UNIQUE_" + _uniqueID++);
export const get = (name) => {
    if(name.includes("COMP_UNIQUE_")) return name;
    let href = location.href;
    const key = href.substr(0, href.includes("?") ? href.indexOf("?") : href.length).replace(/\d/g, '');
    !_constants[key] && (_constants[key] = {});
    !_constants[key][name] && (_constants[key][name] = getUniqueId());
    return _constants[key][name];
};
export const bus = {
    $on: (evtType, handler, isOnce) => {
        if (typeof(handler) !== 'function') {
            return;
        }
        if (!_events[evtType]) {
            _events[evtType] = [];
        }

        var flat = true;
        const len = _events[evtType].length;
        for (let i = 0; i < len; i++) {
            if (_events[evtType][i].fn === handler) {
                flat = false;
                break;
            }
        }
        flat && _events[evtType].push({once: !!isOnce, fn: handler});
    },
    $off: (evtType, handler) => {
        if (!_events[evtType]) {
            return;
        }

        const len = _events[evtType].length;
        for (let i = 0; i < len; i++) {
            if (_events[evtType][i].fn === handler) {
                _events[evtType].splice(i, 1);
                break;
            }
        }
    },
    $emit: (evtType, data) => {
        if (!_events[evtType]) {
            return;
        }

        const arr = [];
        _events[evtType].forEach(item => {
            if(!item.once){
                arr.push(item);
            }
            item.fn(data);
        });
        _events[evtType] = arr;
    },
    $once: (evtType, handler) => {
        bus.$on(evtType, handler, true);
    }
};
export const bind = (type, handler) => bus.$on(get(type), handler);
export const unbind = (type, handler) => bus.$off(get(type), handler);
export const fire = (type, data) => bus.$emit(get(type), data);
export const isLock = () => _isLock;
export const unLock = () => _isLock = false;
export const lock = () => _isLock = true;


