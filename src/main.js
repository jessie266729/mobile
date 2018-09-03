import { Router } from 'director/build/director';
import Util from './common-component/util/util';
import API from './api/Api.js';

import PageLayout from './common-component/pageLayout/pageLayout.js';

import './asset/reset.scss';
import 'swiper/dist/css/swiper.min.css';
import './asset/mescroll.css';
import "./asset/normal.scss";

// 引入垫片兼容IE
import "babel-polyfill";

/*按需加载require方式，和组件里面的module.exports对应*/
/*登陆页*/
const LoginCb = function() {
    require.ensure([], (require) => {
        let Login = require('./pages/login/login.js');
        Login.default();
    },'Login')
};
/*注册页*/
const RegisterCb = function() {
    require.ensure([], (require) => {
        let Register = require('./pages/register/register.js');
        Register.default();
    },'Register')
};
/*注册页*/
const ForgetPwdCb = function() {
    require.ensure([], (require) => {
        let ForgetPwd = require('./pages/forgetPwd/forgetPwd.js');
        ForgetPwd.default();
    },'forgetPwd')
};
/*首页*/
const GroupsCb = function(userId) {    
    require.ensure([], (require) => {
        let Groups = require('./pages/groups/groups.js');
        Groups.default(userId);
    },'Groups')
};
/*游戏页*/
const GamesCb = function(index) {
    require.ensure([], (require) => {
        let Games = require('./pages/games/games.js');
        Games.default(index);
    }, 'Games')
};
/*动态详情*/
const DynamicDetailsCb = function(type,id) {
    require.ensure([], (require) => {
        let DynamicDetails = require('./pages/dynamic-details/dynamic-details.js');
        DynamicDetails.default(type,id);
    },'DynamicDetails')
};
/*比赛页*/
const MatchesCb = function() {
    require.ensure([], (require) => {
        let Matches = require('./pages/matches/matches.js');
        Matches.default();
    },'Matches')
};
/*新闻列表页*/
const NewsCb = function() {
    require.ensure([], (require) => {
        let News = require('./pages/news/news.js');
        News.default();
    },'News')
};
/*新闻详情页*/
const NewsDetailCb = function(id) {
    require.ensure([], (require) => {
        let NewsDetail = require('./pages/newsDetail/newsDetail.js');
        NewsDetail.default(id);
    },'NewsDetail')
};
/*课程页*/
const ClassesCb = function(id) {
    require.ensure([], (require) => {
        let Classes = require('./pages/classes/classes.js');
        Classes.default(id);
    },'Classes')
};
/*赛事报名*/
const GameSignUpInfoCb = function(id) {
    require.ensure([], (require) => {
        let GameSignUpInfo = require('./pages/game-signUp-info/gameSignUpInfo.js');
        GameSignUpInfo.default(id);
    },'GameSignUpInfo')
};
/*赛事报名入口*/
const GameSignUpEntrCb = function(id) {
    require.ensure([], (require) => {
        let GameSignUpEntr = require('./pages/game-signUp-entr/gameSignUpEntr.js');
        GameSignUpEntr.default(id);
    },'GameSignUpEntr')
};
/*赛事详情*/
const MatchDetailsCb = function(id) {
    require.ensure([], (require) => {
        let MatchDetails = require('./pages/match-details/match-details.js');
        MatchDetails.default(id);
    },'MatchDetails')
};
/*账号租用详情*/
const AccountRentalCb = function(id) {
    require.ensure([], (require) => {
        let AccountRental = require('./pages/account-rental/account-rental.js');
        AccountRental.default(id);
    },'AccountRental')
};
/*直播详情*/
const LiveDetailsCb = function(id) {
    require.ensure([], (require) => {
        let LiveDetails = require('./pages/live-details/live-details.js');
        LiveDetails.default(id);
    },'LiveDetails')
};
/*我的*/
const PersonalCb = function(id) {
    require.ensure([], (require) => {
        let Personal = require('./pages/personal/personal.js');
        Personal.default(id);
    },'Personal')
};
/*个人详情*/
const PersonalDetailsCb = function(id) {
    require.ensure([], (require) => {
        let PersonalDetails = require('./pages/personal-details/personal-details.js');
        PersonalDetails.default(id);
    },'PersonalDetails')
};
/*全部赛事*/
const AllMatchesCb = function(id) {
    require.ensure([], (require) => {
        let AllMatches = require('./pages/all-matches/all-matches.js');
        AllMatches.default(id);
    },'AllMatches')
};
/*申请认证*/
const ApplyCertificationCb = function() {
    require.ensure([], (require) => {
        let ApplyCertification = require('./pages/apply-certification/apply-certification.js');
        ApplyCertification.default();
    },'ApplyCertification')
}
/*下单*/
const CreateOrderCb = function(id) {
    require.ensure([], (require) => {
        let CreateOrder = require('./pages/create-order/create-order.js');
        CreateOrder.default(id);
    },'CreateOrder')
};
/*下单*/
const InviteSuccessCb = function(id) {
    require.ensure([], (require) => {
        let InviteSuccess = require('./pages/invite-success/invite-success.js');
        InviteSuccess.default(id);
    },'InviteSuccess')
}
/*账号租用下单成功*/
const AccountRentSuccessCb = function(id) {
    require.ensure([], (require) => {
        let AccountRentSuccess = require('./pages/accountRent-success/accountRent-success.js');
        AccountRentSuccess.default(id);
    },'AccountRentSuccess')
};
/*编辑动态*/
const EditDynamicCb = function(id,name) {
    require.ensure([], (require) => {
        let EditDynamic = require('./pages/edit-dynamic/edit-dynamic.js');
        EditDynamic.default(id,name);
    },'EditDynamic')
};
/*邀请陪玩*/
const InvitingToPlayCb = function(id) {
    require.ensure([], (require) => {
        let InvitingToPlay = require('./pages/inviting-to-play/inviting-to-play.js');
        InvitingToPlay.default(id);
    },'InvitingToPlay')
};
/*邀请下单*/
const InvitingCreateOrderCb = function(id) {
    require.ensure([], (require) => {
        let InvitingCreateOrder = require('./pages/inviting-create-order/inviting-create-order.js');
        InvitingCreateOrder.default(id);
    },'InvitingCreateOrder')
};
/*订单详情*/
const OrderDetailsCb = function(id) {
    require.ensure([], (require) => {
        let OrderDetails = require('./pages/order-details/order-details.js');
        OrderDetails.default(id);
    },'OrderDetails')
};
/*训练记录*/
const TrainingRecordCb = function(id) {
    require.ensure([], (require) => {
        let TrainingRecord = require('./pages/training-record/training-record.js');
        TrainingRecord.default(id);
    },'TrainingRecord')
};
/*编辑用户信息主界面*/
const EditUserInfoCb = function() {
    require.ensure([], (require) => {
        let Register = require('./pages/edit-user-info/edit-user-info.js');
        Register.default();
    },'EditUserInfo')
};
/*jquery ajax setup*/
$.ajaxSetup({
    cache: false,
    type: "POST",
    dataType: 'JSON',
    beforeSend: function(xhr){
        if(arguments[1].isUpload){
            return;
        }

        let AccessToken = Util.getCookie('AccessToken');
        arguments[1].data += "&AccessToken=" + AccessToken;
    },
    complete: function (xhr,status) {
        let result = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        let { IsError, ErrCode } = result;
        let currentRote = Util.getRouter();

        if(result.IsError){
            if(ErrCode == 400){
                localStorage.removeItem('UserInfo');
                Util.deleteCookie('AccessToken',document.domain);
                currentRote != '/login' && Util.linkTo('/login');
            }else{
                Util.alertMessage(result.Message);
            }
            return false;
        }
    },
    error: function(xhr,status,error) {
        console.log(error)
    }
});

const routes = {
    '/': () => {
        Util.linkTo('/groups');
    },
    '/login': LoginCb,
    '/register': RegisterCb,
    '/forgetPwd': ForgetPwdCb,
    '/groups': GroupsCb,
    '/games/:index': GamesCb,
    '/dynamic-details/:type/:id': DynamicDetailsCb,
    '/matches': MatchesCb,
    '/news': NewsCb,
    '/newsDetail/:id': NewsDetailCb,
    '/classes': ClassesCb,
    '/game-sign-up-info/:id': GameSignUpInfoCb,
    '/game-sign-up-entr/:id': GameSignUpEntrCb,
    '/match-details/:id':MatchDetailsCb,
    '/account-rental/:id':AccountRentalCb,
    '/live-details/:id':LiveDetailsCb,
    '/personal':PersonalCb,
    '/personal-details/:id':PersonalDetailsCb,
    '/all-matches':AllMatchesCb,
    '/apply-certf':ApplyCertificationCb,
    '/create-order/:id':CreateOrderCb,
    '/invite-success/:id':InviteSuccessCb,
    '/accountRent-success/:id':AccountRentSuccessCb,
    '/edit-dynamic/:id/:name':EditDynamicCb,
    '/inviting-to-play/:id':InvitingToPlayCb,
    '/inviting-create-order/:id':InvitingCreateOrderCb,
    '/order-details/:id':OrderDetailsCb,
    '/training-record':TrainingRecordCb,
    '/edit-user-info':EditUserInfoCb
};

const router = new Router(routes).configure({
    notfound: () => {
        Util.alertMessage('错误链接！');
    },
    before: () => {
        let currentRote = Util.getRouter();
        let userId = Util.getCookie('userId');  

        if(!Util.isMainPage(currentRote)){
            return;
        }

        if($(".container").length > 0){
            //页面滚动条初始化
            $(".container").scrollTop(0).html('');
            //footer显示隐藏及底部按钮控制
            Util.restFooter(currentRote);
            //header显示隐藏及底部按钮控制
            Util.restHeader(currentRote);            
        }else{
            /*页面结构初始化*/
            PageLayout();
            //footer显示隐藏及底部按钮控制
            Util.restFooter(currentRote);
            //header显示隐藏及底部按钮控制
            Util.restHeader(currentRote);             
        }
    },
    after: () => {

    }
});
router.init();

//初始化默认路由
if(!Util.getRouter()){
    Util.linkTo('/groups');
}
