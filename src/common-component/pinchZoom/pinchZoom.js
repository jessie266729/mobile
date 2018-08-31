import Swiper from 'Swiper';
import PinchZoomTpl from "./pinchZoom.html";

import "./pinchZoom.scss";

export default function Header(imgList,index) {
    const handlers = {
        init: function() {
            $("body").append(PinchZoomTpl({imgList}));
            let swiper = new Swiper('#show_img_container', {
                initialSlide:index,
                pagination: '.swiper-pagination',
                paginationClickable :true,
                paginationType : 'bullets'
            });
            $(".show-img-container").css({height:"0",top:"50%"});
            $(".show-img-container").animate({height:"100%",top:"0"},500);
            this.bindEvent();
        },
        bindEvent: function() {
            let isZoom = false;
            let $parent = $(".show-img-container");

            // new PinchZoom($pinchZoom[0], {
            //     draggableUnzoomed: false,
            // });

            $parent.parent()
            .on('touchstart',function(){
                isZoom = false;
            })
            .on('touchmove',function(){
                isZoom = true;
            })
            .on('click',function(){
                isZoom || $parent.fadeOut();
                setTimeout(function () {
                    isZoom || $parent.remove();
                },500);
            });
        },
    };

    handlers.init();
}