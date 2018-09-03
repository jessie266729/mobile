import _ from 'underscore';
import spinnerImg from '../../asset/images/Spinner.gif';

Date.prototype.format = function(formatStr){
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}



module.exports = {
    getRouter: function() {
        return document.location.hash.split('#')[1]
    },
    linkTo: function(url) {
        location.hash = url;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:56
     * Desc: 各种日期格式化函数
     */
    dateFormat: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd hh:mm:ss') : "";
    },
    dateFormatWithChinese: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日 hh:mm:ss') : "";
    },
    dateFormatByMonth: function (dateStr) {
        const type = this.language().login_flag, dateInfo = this.getDateNum(dateStr);
        if (type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : '';
    },
    dateFormatByMonthWithChinese: function (dateStr) {
        const type = this.language().login_flag,
            month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], dateInfo = this.getDateNum(dateStr);

        if (type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : '';
        // return dateStr ? `${month[dateInfo.month]} ${dateInfo.day}, ${dateInfo.year}` : "";
    },
    dayFormat: function (dataStr, type) {
        if (!dataStr) {
            return '';
        }
        if (!type) {
            type = '-';
        }
        var dateSs = new Date(dataStr);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        month > 9 ? null : (month = '0' + month);
        day > 9 ? null : (day = '0' + day);
        return year + type + month + type + day;
    },
    getDateNum(timestamp) {
        var dateSs = new Date(timestamp);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        return {
            year,
            month,
            day
        }
    },
    priceFormat: function (price) {
        return price >= 0 && price !== "" ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    priceFormatMinus: function (price) {
        return price !== "" ? parseFloat(parseFloat(price) / 100).toFixed(2) : 0;
    },
    /**
     * 根据传入参数计算当前价格保留位数 四舍五入,当前函数是为了在四舍五入的时候不丢失精度
     * @param price  价格
     * @param n 保留位数
     * @returns {number}
     */
    moneyPrice: function (price, n) {
        var dd = 1; //计算倍数
        var tempNum;
        for (var i = 0; i < n; i++) {
            dd *= 10;
        }
        tempNum = price * dd;
        tempNum = Math.round(tempNum);
        tempNum = (tempNum / dd).toFixed(n);
        return tempNum;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:51
     * Desc: 将金额单位元转换为分.确保不丢失精度
     */
    priceFormatRevers: function (price) {
        var reg = /^\+?(\d*\.\d{2})$/
        var priceArr = [], tempArr = [], originPrice = 0;
        if (price != null && price != "") {
            if (reg.test(price)) {//2位小数
                tempArr = (price + "").split(".");
                for (var i in tempArr) {
                    if (tempArr[i] != ".") {
                        priceArr.push(tempArr[i]);
                    }
                }
                originPrice = parseInt(priceArr.join(""));
            } else {
                originPrice = price * 100;
            }
        } else {
            originPrice = 0;
        }
        return originPrice;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:50
     * Desc: 当金额浮点型数字为空则format为空 而非 0.00
     */
    priceFormatByNull: function (price) {
        return price > 0 ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:49
     * Desc: 通过hash对数组进行去重.
     */
    unique: function (arr) {
        var tmpArr = [], hash = {};//hash为hash表
        for (var i = 0; i < arr.length; i++) {
            if (!hash[arr[i].attrValue.id]) {//如果hash表中没有当前项
                hash[arr[i].attrValue.id] = true;//存入hash表
                tmpArr.push(arr[i]);//存入临时数组
            }
        }
        return tmpArr;
    },
    /**
     * 设置cookie
     * @param objName {string} :cookie key
     * @param objValue {string} :cookie value
     * @param objDays {number} : expire day
     * @param objDomain ?
     * */
    addCookie: function( objName, objValue, objDays, objDomain ){
        // use escape to avoid @#$%^%
        var str = objName + "=" + escape(objValue);
        str += ";path=/;domain=" + objDomain ;
        if( objDays > 0 ){
            var date = new Date();
            var ms = objDays * ( 3600 * 24 * 1000 );
            date.setTime( date.getTime() + ms );
            str += ";expires=" + date.toGMTString();
        }
        return document.cookie = str ;
    },
    /**
     * 获取cookie
     * @param objName {string} : cookie key
     * */
    getCookie: function( objName ){
        var arrStr = document.cookie.split("; ");
        var objVal = "";
        for( var i = 0,l = arrStr.length; i < l ; i++ ){
            var temArr = arrStr[i].split("=" );
            if( temArr[0] === objName ){
                objVal = unescape( temArr[1]  )
            }
        }
        return objVal;
    },
    /**
     * 删除cookie
     * @param objName
     * @param objDomain
     * @returns {string}
     */
    deleteCookie: function(objName, objDomain) {
        return document.cookie = objName + "=;path=/;domain=" + objDomain + ";expires=" + (new Date(0)).toGMTString();
    },
    /**
     * Created with JetBrains WebStorm.
     * User: xp
     * Date: 16/12/5
     * Time: 下午4:45
     * Desc: 弹出提示窗口 delay参数可以为时间,即等待消失时间 也可以为function,即消失后回调. 也可以三者都传入
     */
    alertMessage: function (desc, delay, callback, hasIcon = false) {
        let time = 2000, doc = document,
            body = doc.body, h = 0, hints = doc.querySelector('.hint-popup'),
            timer1 = null, timer2 = null, icon = hasIcon;

        if (hints) {
            return;
        }

        if (typeof delay === 'boolean') {
            icon = delay;
        } else {
            if (!isNaN(delay)) {
                time = delay;
            }
        }

        const div = doc.createElement("div"),
            html = `<div class="hint-content">${icon ? '<i class="icon"></i>' : ''}${desc}</div>`;
        div.className = 'hint-popup show';
        div.innerHTML = html;

        body.appendChild(div);

        div.style.marginTop = `${-(div.offsetHeight / 2)}px`;

        setTimeout(()=> {
            div.className = 'hint-popup hide-hint';
            setTimeout(()=> {
                body.removeChild(div);
                clearTimeout(timer2);
            }, 300);
            clearTimeout(timer1);
            if (typeof delay === 'function') {
                delay();
            }
            if (callback) {
                if (typeof callback === 'function') {
                    callback();
                }

            }
        }, time);
    },
    /**
     * User: xp
     * Date: 2017/2/14
     * Time: 下午15:29
     * @usage: 模拟confirm
     * @param options Object
     *      cancelTxt : "",         取消按钮的文本
     *      confirmTxt : "",        确认按钮的文本
     *      html:"",                传入的html，此项比info优先
     *      isWhite: boolen,        是否默认白色true
     *      info:"",                提示语信息
     *      cancelFun: func1,       取消时的回调函数
     *      confirmFun: func2,      确认时的回调函数
     *      needClose,              设置为false，点击确定时 不自动关闭可通过modal return的函数手动调用关闭
     *      hasCancel,              设置为false时，不包含取消按钮
     *
     * */
    confirmModal: (options = {})=>{
        const _config = {
            title: '提示信息',
            confirmTxt: '确认',
            cancelTxt: '取消',
            info: '',
            needClose: true,
            hasCancel: true,
            isWhite: true,
            html: '',
            className: '',
            confirmFun: ()=>{},
            cancelFun: ()=>{}
        }, config = _.extend({}, _config, options),
        doc = document, div = doc.createElement('div'), body = doc.body,
        hasCancel = config.hasCancel;
        div.className = `_confirm on ${config.className}${config.isWhite ? '' : ' _confirm_dark'}`;
        const _close = ()=>{
            if(!div) {
                return;
            }
            div.className = `_confirm off ${config.className}${config.isWhite ? '' : ' _confirm_dark'}`;
            window.removeEventListener('hashchange', _removeDiv, false); 
            setTimeout(()=>{
                if(hasCancel) {
                    doc.getElementById("js-cancle-modal").removeEventListener("click", _cancle, false);
                }
                doc.getElementById("js-confirm-modal").removeEventListener("click", _confirm, false);
                body.removeChild(div);
            }, 400);
        }

        const _confirm = ()=>{
            if(typeof config.confirmFun === 'function') {
                config.confirmFun();
            }
            if(config.needClose) {
                _close();
            }
        }

        const _cancle = ()=>{
            if(typeof config.cancelFun === 'function') {
                config.cancelFun();
            }
            _close();
        }
        
        const _removeDiv = ()=>{
            div && body.removeChild(div);
            window.removeEventListener('hashchange', _removeDiv, false); 
        }
        let html = [];

        html.push('<div class="_confirm-frame">');
            html.push(`<h4 class="_confirm_title">${config.title}</h4>`)
            if(config.html) {
                html.push(`<div className="_confirm-html">${config.html}</div>`)
            }else {
                html.push('<div class="_confirm-text">');
                    html.push(`<p class="_c-vice-text">${config.info}</p>`);
                html.push('</div>');
            }

            html.push('<div class="_confirm-operate">');
                if(hasCancel) {
                    html.push(`<span id="js-cancle-modal" class="_c-cancel">${config.cancelTxt}</span>`);
                }
                html.push(`<span id="js-confirm-modal" class="_c-confirm${hasCancel ? '' : ' single'}">${config.confirmTxt}</span>`);
            html.push('</div>');

        html.push('</div>');

        div.innerHTML = html.join('');
        body.appendChild(div);
        
        if(hasCancel) {
            doc.getElementById("js-cancle-modal").addEventListener("click", _cancle, false);
        }
        doc.getElementById("js-confirm-modal").addEventListener("click", _confirm, false);
        window.addEventListener('hashchange', _removeDiv, false);        
        if(config.needClose) {
            return ()=>{};
        }else{
            return _close;
        }
    },
    htmlDecode: function (str) {
        return $('<div>').html(str).text();
    },
    htmlEncode: function (html) {
        return $('<div>').text(html).html();
    },
    loading: function (flag, loadingText) {
        if (flag) {
            var loadingText = loadingText || "努力加载中...";
            var html = '<div class="loader-inner">' +
                '<img src="' + spinnerImg + '"/>' +
                '<p>' + loadingText + '</p></div>';
            var loader = document.createElement('div');

            loader.setAttribute('class', 'loader');
            document.body.appendChild(loader);
            document.getElementsByClassName('loader')[0].innerHTML = html;
        } else {
            var loader = document.getElementsByClassName('loader')[0];
            loader.parentNode.removeChild(loader);            
        }
    },
    /**
     * 格式化数字；
     * @param num
     * @returns {*}
     */
    floatNum: function (num) {
        if (!num) {
            return 0;
        }
        if (num >= 10000) {
            return Math.floor(num / 1000) / 10 + 'w';
        }
        if (num >= 1000) {
            return Math.floor(num / 100) / 10 + 'k';
        }
        return num;
    },
    /**
     * 格式化文件大小显示
     * @param size 文件大小
     * @returns {string}
     */
    formatFileSize: function (size) {
        var fileSize = '';
        // 不是数字
        if (isNaN(size)) {
            fileSize = size;
        } else {
            // 文件大小显示Mb
            if (size / (1024 * 1024) >= 1) {
                fileSize = parseFloat(size / (1024 * 1024)).toFixed(2) + 'Mb';
            } else if (size / 1024 * 1024 >= 1) { // 文件大小显示Kb
                fileSize = parseFloat(size / (1024)).toFixed(2) + 'Kb';
            } else {
                fileSize = size + 'B';
            }
        }
        return fileSize;
    },
    setTitle: function(title) {
        $(".page-title").html(title);
    },
    restFooter: function(key) {
        let noFooter = false;
        let isMainRoter = false;
        const blacklist = ['/dynamic-details', '/news', '/newsDetail', '/game-sign-up',
            '/match-details', '/account-rental', '/personal-details','/all-matches',
            '/create-order','/apply-certf', '/invite-success', '/edit-dynamic', 
            '/Order-details', '/training-record','/inviting-to-play','/inviting-create-order', '/order-details'];//footer隐藏黑名单路由
        const mainRoters = ['/groups','/games','/matches','/classes', '/personal'];//主页路由

        blacklist.map((item,index) => {
            if(key.indexOf(item) > -1){
                noFooter = true;
            }
        })

        if(noFooter) {
            $(".footer-layout").hide();
            $(".container").addClass('no-footer');
        }else{
            $(".footer-layout").show();
            $(".container").removeClass('no-footer');

            mainRoters.map((item,index) => {
                if(key.indexOf(item) > -1){
                    isMainRoter = true;
                }
            })

            !isMainRoter && $(".footer .nav-item.active").removeClass("active");
            key.length > 0 && isMainRoter && $(".footer .nav-item.active").removeClass("active");
            key.length > 0 && isMainRoter && $(".footer .nav-item[data-choose="+key.split('/')[1]+"]").addClass("active");
        }
    },
    restHeader: function(key) {
        let noHeader = false;
        const blacklist = ['/games', '/matches', '/classes', '/personal', '/login'];//Header隐藏黑名单路由

        blacklist.map((item,index) => {
            if(key === item){
                noHeader = true;
            }
        })

        if(noHeader){
            $(".header-layout").hide();
            $(".container").addClass('no-header');
        }else{
            $(".header-layout").show();
            $(".container").removeClass('no-header');
        }
    },
    isMainPage: function(key) {
        let bool = true;
        const blacklist = ['/register','/forgetPwd'];//非主页路由

        blacklist.map((item,index) => {
            if(key === item){
                bool = false;
            }
        })

        return bool;
    },
    previewImg: function($input,changCb,loadCb) {
        let _this = this;
        //判断本浏览器是否支持这个API。
        if(typeof FileReader==='undefined'){ 
            this.alertMessage("抱歉，你的浏览器不支持 FileReader"); 
            $input.attr('disabled','disabled'); 
        }else{ 
            $input.on('change',function(){
                var i=0;
                var files = this.files;
                var resArr = [];

                //上传图片限制
                _this.limitImgUpload(files, 8, 5, function(){
                    var func = function(){
                        var file = files[i];
                        var reader = new FileReader();
                        
                        if(!file.type){
                            return;
                        }
                        
                        if(!/image\/\w+/.test(file.type)){
                            show.innerHTML = "请确保文件为图像类型";
                            return false;
                        }
    
                        reader.onload = function(e){
                            resArr.push(this.result);
                            i++;
                            i < files.length && func(); //选取下一张图片
                        }
                        reader.readAsDataURL(file);
                    }
                    func();
                    changCb && changCb(files, resArr);
                });
                
            }); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
        }
    },
    htmlEncode: function(html) {
        var temp = document.createElement("div"); 
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML; 
        temp = null; 
        return output;
    },
    // 上传图片限制，files图片数组，size单个图片大小限制（默认3M），num上传总数限制（默认3张），cb验证通过的回调
    limitImgUpload: function(files = [], size = 3, num = 3, cb) {
        if(files.length > num){
            this.alertMessage(`一次最多上传${num}张图片`);
            return;
        }
        for(let file of files){
            if(file.size > size * 1024 * 1024){
                this.alertMessage(`图片大小不能超过${size}M`);
                return;
            }
        }
        cb && cb();
    },
     Touch:function(dom,range)
    {
        this.init = function () {
            let that = this;
            for (let i = 0; i < dom.length; i++) {
                (function (dom) {
                    function touchstart(event) {
                        let e = event || window.event;
                        if (e.targetTouches.length === 1) {
                            let startX = e.targetTouches[0].clientX,
                                startY = e.targetTouches[0].clientY;

                            function touchmove(e) {
                                let moveEndX = e.targetTouches[0].clientX,
                                    moveEndY = e.targetTouches[0].clientY;
                                if ((that.getAngle(startX, startY, moveEndX, moveEndY) >= 135 || that.getAngle(startX, startY, moveEndX, moveEndY) <= -135) && that.getRange(startX, startY, moveEndX, moveEndY) >= range) {
                                    that.swipeLeft(dom);
                                    dom.removeEventListener("touchmove", touchmove);
                                } else if ((that.getAngle(startX, startY, moveEndX, moveEndY) >= -45 && that.getAngle(startX, startY, moveEndX, moveEndY) <= 45) && that.getRange(startX, startY, moveEndX, moveEndY) >= range) {
                                    that.swipeRight(dom);
                                    dom.removeEventListener("touchmove", touchmove);
                                }
                            }

                            function touchend() {
                                dom.removeEventListener("touchend", touchend);
                                dom.removeEventListener("touchmove", touchmove);
                            }

                            dom.addEventListener("touchmove", touchmove);
                            dom.addEventListener("touchend", touchend);
                        }
                    }

                    dom.addEventListener("touchstart", touchstart);
                })(dom[i]);
            }

            return this;
        };

        //计算滑动的角度
        this.getAngle = function (px1, py1, px2, py2) {
            //两点的x、y值
            let x = px2 - px1;
            let y = py2 - py1;
            let hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            //斜边长度
            let cos = x / hypotenuse;
            let radian = Math.acos(cos);
            //求出弧度
            let angle = 180 / (Math.PI / radian);
            //用弧度算出角度
            if (y < 0) {
                angle = -angle;
            } else if ((y === 0) && (x < 0)) {
                angle = 180;
            }
            return angle;
        };

        //计算两点之间的距离
        this.getRange = function (px1, py1, px2, py2) {
            return Math.sqrt(Math.pow(Math.abs(px1 - px2), 2) + Math.pow(Math.abs(py1 - py2), 2));
        };

        this.swipeLeft = function (dom) {
        };

        this.swipeRight = function (dom) {
        }
    }
}