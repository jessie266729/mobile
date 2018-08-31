/**
 * 互动页
 */

import _ from 'underscore';
import InteractionTpl from './interaction.html';

import "./interaction.scss";

export default function Interaction($el) {

	const handlers = {
		init: function() {
			$el.html( InteractionTpl() );
			this.bindEvent();
		},
		bindEvent: function() {
			$('.interaction-page .operatorBtn > span').on('click',function(){
				let $this = $(this);
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').siblings().removeClass('active');
				}
			});
		}
	}   

	handlers.init(); 
}
