/**
 * 修改头像页
 */

import HeadImageTpl from './edit-user-info-head-image.html';
import API from '../../api/Api.js';
import Util from '../../common-component/util/util.js';
import "./edit-user-info-head-image.scss";

export default function Live($el) {
    const accessToken = Util.getCookie('AccessToken');
    const absoluteUrl = null;
	const handlers = {
		init: function() {

            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }
            $(".container").html( HeadImageTpl( loginUserInfo ) );
            this.bindEvent();
            Util.setTitle("修改头像");

		},
		bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".edit-head-image").on("click", ".js-handle", function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e,$(this));
            });

            Util.previewImg($("input[type='file']"),function(files, resArr){
                let uploadFile = new FormData($("#file")[0]);

                Util.loading(true, '上传中，请稍后...');
                $.ajax({
                    url: API.uploadFile + '?accessToken=' + accessToken,
                    data:uploadFile,
                    isUpload: true,
                    contentType: false, //不设置内容类型
                    processData: false, //不处理数据
                    success:function(req){
                        Util.loading(false);
                        if(!req.IsError){
                            Util.alertMessage("上传成功！");
                            $("#headImageUrl").val(req.Data[0].RelativeUrl);
                            _this.absoluteUrl = req.Data[0].AbsoluteUrl;
                            $(".head-image-url").attr("src", req.Data[0].AbsoluteUrl);
                        }
                    },
                    error:function(){
                        Util.alertMessage("上传失败！");
                    }
                })

            });

		},
        submitEditHeadImage :function () {
            let _this = this;
            $.ajax({
                url: API.upUserInfo,
                data: {
                    AccessToken:Util.getCookie('AccessToken'),
                    Body:{
                        HeadImageUrl:$("#headImageUrl").val()
                    }
                },
                success: function(req){
                    if(!req.IsError){
                        const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));
                        if(!loginUserInfo) {
                            Util.linkTo('../../login');
                            return;
                        }
                        loginUserInfo.Url = _this.absoluteUrl;
                        window.localStorage.setItem('UserInfo',JSON.stringify(loginUserInfo));
                        Util.alertMessage('修改成功！');
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        }
	};
	handlers.init();
}
