import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import MatchDetailsTpl from './match-details.html';

import "./match-details.scss";

export default function MatchDetails(id) {

    const handlers = {

        init: function() {

            let _this = this;

            Util.setTitle('赛程详情');
            
            this.getMatchDetailsInfo(function(data){
                $(".container").html(MatchDetailsTpl({info: data}));
                _this.bindEvent();
            });

        },
        bindEvent: function() {
            let _this = this;
            //公共事件添加
            $(".match-details-page").on("click",".js-handle",function(e){
                let handle = $(this).data('handle');
                _this[handle] && _this[handle](e, $(this));
            });
        },
		getMatchDetailsInfo: function(cb){
			$.ajax({
                url: API.getMatchDetailsInfo,
                type: 'post',
                data: {Body:id},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req.Data || []);
                    }

                },
                error: function(msg){
                    console.log(msg);
                }
            })
		}

    }

    handlers.init();
}
