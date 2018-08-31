import Util from '../util/util.js';
import TableTpl from "./footer.html";

import "./footer.scss";

export default function Footer($el, cb) {
    const handlers = {
        init: function() {
            $el.append(TableTpl());
            this.bindEvent();
        },
        bindEvent: function() {
            $(".footer .nav-item").on("click",function() {
                let $this = $(this);
                if($this.hasClass('active')){
                    return;
                }else{
                    let router = $this.data('router')
                    Util.linkTo(`/${router}`);
                }
            });
        }
    }

    handlers.init();
}