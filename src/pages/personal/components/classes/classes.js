/**
 * 课程直播页
 */

import _ from 'underscore';
import Util from '../../../../common-component/util/util.js';
import API from '../../../../api/Api.js';
import PersonalClassesTpl from './classes.html';

import "./classes.scss";

export default function PersonalClasses($el, infoList) {

	const handlers = {
		init: function() {

			let _this = this;
			this.getPersonalClassesList(function(data){
                $el.html( PersonalClassesTpl({allData: data}) );
                _this.bindEvent();
            });
			
		},
		bindEvent: function() {

		},
		getPersonalClassesList: function(cb){
			$.ajax({
                url: API.getPersonalClassesList,
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
