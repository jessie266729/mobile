/**
 * 课程直播页
 */

import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import LiveDetailsTpl from './live-details.html';

import "./live-details.scss";

export default function LiveDetails(id) {

	const handlers = {
		init: function() {
			let _this = this;

			this.getLiveDetailsInfo((data)=>{
				$('.container').html( LiveDetailsTpl({info: data}) );
				_this.bindEvent();
				Util.setTitle('');
			});
		},
		bindEvent: function() {

		},
		getLiveDetailsInfo: function(cb){
			$.ajax({
                url: API.getLiveDetailsInfo,
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
