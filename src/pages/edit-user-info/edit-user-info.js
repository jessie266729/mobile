

import EditUserInfoTpl from './edit-user-info.html';
import "./edit-user-info.scss";


export default function EditUserInfo() {
    const handlers = {
        init: function() {

            const loginUserInfo = JSON.parse(localStorage.getItem('UserInfo'));

            if(!loginUserInfo) {
                Util.linkTo('/login');
                return;
            }



            $("#app-container").html( EditUserInfoTpl( loginUserInfo ) );
            this.bindEvent();
        },
        bindEvent: function() {

        }
    }

    handlers.init();
}
