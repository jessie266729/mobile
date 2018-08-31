import HeaderTpl from "./header.html";

import "./header.scss";

export default function Header($el, cb) {
    const handlers = {
        init: function() {
            $el.append(HeaderTpl());
            this.bindEvent();
        },
        bindEvent: function() {
            $(".btn-back").on('click',function(){
                window.history.go(-1);
            })
        }
    }

    handlers.init();
}