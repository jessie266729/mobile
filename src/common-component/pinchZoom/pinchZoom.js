import Swiper from 'Swiper';
import PinchZoomTpl from "./pinchZoom.html";

import "./pinchZoom.scss";

export default function Header(imgList,index) {
    const handlers = {
        init: function() {
            $("body").append(PinchZoomTpl({imgList}));
            let swiper = new Swiper('#show_img_container', {
                initialSlide :index,
                pagination: '.swiper-pagination',
                paginationClickable :true,
                paginationType : 'bullets'
            });

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
                isZoom || $parent.remove();
            });
        },
    };

    handlers.init();
}