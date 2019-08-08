import Vue from 'vue';
// import Cookies from 'js-cookie';
// import Countly from 'countly-sdk-web';
// import $ from 'jquery';
let Base64 = require('js-base64').Base64;
// import store from '../store';

const ON_SCREEN_HEIGHT = 50;
const ON_SCREEN_WIDTH = 50;

let common = {
    // countly用户轨迹跟踪事件
    clyListenEvent(ob) {
        Countly.q.push(['add_event', {
            key: "viewRouter",
            segmentation: {
                "path": ob.path
            }
        }]);

        Countly.q.push(['track_pageview', ob.path]);
    },
    // 下载资源
    downloadFile(url, fileName) {
        let form = $("<form method='get'>");//定义form表单,通过表单发送请求
        form.attr("style", "display:none");//设置为不显示
        form.attr("action", url);//设置请求路径
        $("body").append(form);//添加表单到页面(body)中
        form.submit();//表单提交

        // this.download(url, fileName);
    },
    download(url, fileName) {
        let _this = this
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.onload = function (res) {
            // 请求完成
            let blob = this.response
            console.log(blob)
            // 创建隐藏的可下载链接
            let eleLink = document.createElement('a')
            eleLink.download = fileName
            eleLink.style.display = 'none'
            // eleLink.href = url
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink)
            eleLink.click()
            // 然后移除
            document.body.removeChild(eleLink)
        }
        xhr.ontimeout = function (e) {
            //下载超时请重试
            console.log(e)
            // _this.$message.error('下载超时请重试')
        }
        xhr.onerror = function (e) {
            //下载出错
            console.log(e)
            // _this.$message.error('下载出错，请联系管理员')
        }
        // 发送ajax请求
        xhr.send()
    },
    getSession(key) {
        if (window.sessionStorage) {
            let item = sessionStorage.getItem(key)
            if (window.location.href.includes('basejy')) {
                if (item) {
                    item = Base64.decode(item);
                }
            }
            return JSON.parse(item);
        }
        return null;
    },
    setSession(key, value) {
        if (window.sessionStorage) {
            if (window.location.href.includes('basejy')) {
                sessionStorage.setItem(key, Base64.encode(JSON.stringify(value)));
            } else {
                sessionStorage.setItem(key, JSON.stringify(value));
            }
        }
    },
    removeSession(key) {
        if (window.sessionStorage) {
            sessionStorage.removeItem(key)
        }
    },
    setCookie(key, value, exp) {
        Cookies.set(key, JSON.stringify(value), { expires: exp })
    },
    getCookie(key) {
        if (Cookies.get(key)) {
            return JSON.parse(Cookies.get(key))
        }
        return null
    },
    removeCookie(key) {
        Cookies.remove(key)
    },
    // 是否登录
    isLogin() {
        return this.getCookie('userData');
    },
    // 获取当前用户信息
    getUser() {
        if (this.getCookie('userData')) {
            return this.getCookie('userData').member
        }
        return null;
    },
    // swiper双向控制
    setController(swiper1, swiper2) {
        swiper1.controller.control = swiper2;
        swiper2.controller.control = swiper1;
    },
	/**
	 * 最外围容器滚动到顶部
	 */
    scrollToTop() {
        let target = document.getElementById('chatContainer')
        target.scrollTop = 0
    },
    /**
     * @param obj1 第一个对象
     * @param obj2 第二个对象
     */
    setTwoRollingSynchronization(obj1, obj2) {
        function getScrollTopMax(obj) {
            return $(obj).children().height() - $(obj).height();
        }
        let scrollTopMax1 = getScrollTopMax(obj1);
        let scrollTopMax2 = getScrollTopMax(obj2);
        let scale = scrollTopMax1 / scrollTopMax2;
        // 设置两个元素滚动同步
        obj1.addEventListener('mouseover', function () {
            obj2.scrollTop = obj1.scrollTop / scale
        })
        obj2.addEventListener('mouseover', function () {
            obj1.scrollTop = obj2.scrollTop * scale
        })
    },
    listenRouterCommandNav(path, arr) {
        for (let p of arr) {
            if (p == path) {
                return false;
            }
        }
        return true;
    },
    // 检验必填项是否填入
    checkMustParams(paramsArr, _this) {
        for (let params of paramsArr) {
            if (!_this[params.name]) {
                _this.$message.error(params.msg)
                return false
            }
        }
        return true
    },
    // 初始化数据，重新调用data方法
    initialize(obj) {
        Object.assign(obj.$data, obj.$options.data());
    },
    // 添加设置班级id参数（行政班、教学班）
    setClassId(_params, classType, classObj) {
        if (classType == 1) {
            _params.kClassesGroupId = classObj.kClassesGroupId;
        } else if (classType == 2) {
            _params.kClassId = classObj.kClassId;
        }
    },
    // 设置点击body区域关闭btnBox
    setBodyCloseBtnBox(vObj, vAttr, index = -1) {
        vObj[vAttr] = !vObj[vAttr];
        $('body').click();

        if (vObj[vAttr]) {
            $('body').one('click', (ev) => {
                if (index == -1) {
                    vObj[vAttr] = false;
                } else {
                    vObj.$set(vObj[vAttr], index, false);
                }
            });
        }
    },
    /**
     * 把数组列表中的某个值用字符串加“，”连接
     * @param Array list
     * @param String key
     */
    getStringByArray(list, key) {
        let str = "";
        for (let item of list) {
            if (item) {
                if (key == 'unobject') {
                    str += `${item},`;
                } else {
                    if (item[key]) {
                        str += `${item[key]},`;
                    }
                }
            }
        }
        return str.substring(0, str.length - 1);
    },
    // 获取课程类型文本
    getCourseTypeText(type) {
        switch (type) {
            case 1:
                return "等级考";
            case 2:
                return "合格考";
            case 3:
                return "必考";
            default:
                return "其他";
        }
    },
    // 获取加载的背景高度
    getLoadingBgHeight(h) {
        return window.innerHeight - h;
    },
    // 设置面包屑列表
    setBreadcrumbList(vObj, router) {
        let current = router.history.current;
        let parentPath = current.matched[current.matched.length - 1].parent.path;

        let breadcrumb = {
            path: current.path,
            name: current.meta.breadcrumb[0],
            parentPath: parentPath
        };
        vObj.$store.commit('BREADCRUMBLIST', { breadcrumb: breadcrumb, parentPath: parentPath });
    },
    // 限制只能输入数字
    limitInpNum(obj, name, event, vObj) {
        if (obj) {
            obj[name] = event.target.value.replace(/[^\d]/g, '');
        } else {
            vObj[name] = event.target.value.replace(/[^\d]/g, '');
        }
    },
    // 取几位小数
    takeDecimal(target, n) {
        return (parseInt(parseFloat(target) * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n);
    },
    // 根据年级id获取年级名称
    getGradeNameById(id, list) {
        for (let item of list) {
            if (item.id == id) {
                return item.name;
            }
        }
    },
    /*
     * 给目标元素添加滚动触发事件函数
     * @params $obj JQ目标元素对象
     * @params fn 滚动触发的函数
     */
    setScrollEvent($obj, fn) {
        $obj.scroll(() => {
            fn();
        });
    },
    // 判断是否是正整数
    checkNumber(theObj) {
        let reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(theObj)) {
            return true;
        }
        return false;
    },
    closest(el, selector) {
        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    },
    addClass(el, cls) {
        if (!el) return
        let arr = el.className.split(" ")
        if (arr.indexOf(cls) === -1) {
            arr.push(cls)
            el.className = arr.join(" ")
        }
    },
    removeClass(el, cls) {
        if (!el) return
        let arr = el.className.split(" ")
        if (arr.indexOf(cls) !== -1) {
            arr.splice(arr.indexOf(cls), 1)
            el.className = arr.join(" ")
        }
    },
    hasClass(el, cls) {
        let arr = el.className.split(" ")
        return arr.indexOf(cls) !== -1
    },
    type(o) {
        if (o === null) return 'null';
        var s = Object.prototype.toString.call(o);
        var t = s.match(/\[object (.*?)\]/)[1].toLowerCase();
        return t === 'number' ? isNaN(o) ? 'nan' : !isFinite(o) ? 'infinity' : t : t;
    },
    clone(a) {
        let arr = Array.prototype.slice.call(arguments, 1)
        let obj = {}
        arr.forEach(t => {
            t && a.forEach(k => {
                if (t[k]) obj[k] = t[k]
            })
        })
        console.log(obj)
        return obj
    },
    pos(el) {
        function Postion(x, y, el) {
            // if (_.isDocument(el)) el = document.doctype ? window.document.documentElement : document.body;
            this.x = x;
            this.y = y;
            this.time = +new Date();
            this.el = el;
            this.width = el.clientWidth; //不包括边框   el.offsetWidth包括边框;
            this.height = el.clientHeight; //el.offsetHeight;
            this.scrollTop = el.scrollTop;
            this.scrollHeight = el.scrollHeight;
            this.offsetHeight = el.offsetHeight;
            this.top = y;
            this.left = x;
            this.right = x + this.width;
            this.bottom = y + this.height;
        }
        var pos = new Postion(el.offsetLeft, el.offsetTop, el);
        var target = el.offsetParent;
        while (target) {
            // if(target.scrollTop){
            //     console.log(target,target.scrollTop)
            // }
            // console.log(target,target.scrollTop)

            pos.x += target.offsetLeft;
            pos.y += target.offsetTop;
            target = target.offsetParent
        }
        // if (offsetPos) {
        //     pos.x -= offsetPos.x;
        //     pos.y -= offsetPos.y;
        // }
        return pos;
    },
    format(date, fmt) {
        var self = this;
        fmt = fmt || "yyyy-MM-dd hh:mm:ss.S";
        // var date = this.date
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate(); //日期 day_of_month
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var msecond = date.getMilliseconds(); //毫秒
        var quarter = (date.getMonth() + 3) / 3 << 0; // //季度
        var o = {
            "y+|Y+": year, //年份4位特殊处理
            "M+": month,
            "d+|D+": day,
            "h+|H+": hour,
            "m+": minute,
            "s+": second,
            "q+": quarter,
            "S": msecond,
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    isOnScreen(element) {

        let rect = element.getBoundingClientRect();
        let windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let windowWidth = window.innerWidth || document.documentElement.clientWidth;

        let elementHeight = element.offsetHeight;
        let elementWidth = element.offsetWidth;

        let onScreenHeight = ON_SCREEN_HEIGHT > elementHeight ? elementHeight : ON_SCREEN_HEIGHT;
        let onScreenWidth = ON_SCREEN_WIDTH > elementWidth ? elementWidth : ON_SCREEN_WIDTH;

        // 元素在屏幕上方
        let elementBottomToWindowTop = rect.top + elementHeight;
        let bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

        // 元素在屏幕下方
        let elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
        let topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

        // 元素在屏幕左侧
        let elementRightToWindowLeft = rect.left + elementWidth;
        let rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

        // 元素在屏幕右侧
        let elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
        let leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

        return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
    }
};

['Null', 'Undefined', 'Array', 'String', 'Number',
    'Boolean', 'Function', 'RegExp', 'NaN', 'Infinity', // 'Infinite',
    'NodeList', 'Arguments', 'Window', 'TouchEvent', 'MouseEvent', 'Screen', 'Date', 'DOMRect'
].forEach(function (t) {
    common['is' + t] = function (o) {
        return common.type(o) === t.toLowerCase();
    };
});
common.isElement = function (o) {
    return /html.*?element/i.test(common.type(o));
};

common.isObject = function (o) {
    return common.isElement(o) ? true : common.type(o) === "object";
};
common.install = function (Vue) {
    Vue.prototype.$common = Vue.common = common;
};
export default common;
