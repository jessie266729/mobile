/**
 * 课程直播页
 */

import _ from 'underscore';
import Util from '../../../../common-component/util/util.js';
import API from '../../../../api/Api.js';
import ActivityTpl from './activity.html';

import "./activity.scss";

export default function Activity($el, infoList) {

	const handlers = {
		init: function() {
			let _this = this;

			this.getActivityList(function(data){
                $el.html( ActivityTpl({allData: data}) );
                _this.bindEvent();
            });
			
		},
		bindEvent: function() {

		},
		getActivityList: function(cb){
			$.ajax({
                url: API.getPersonalActivityList,
                type: 'post',
                data: {Body:{
                    "PageIndex": 1,
                    "PageSize": 2
                }},
                success: function(req){

                    if(!req.IsError){
                        cb && cb(req.Result || []);
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
