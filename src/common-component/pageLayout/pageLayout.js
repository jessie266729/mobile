/**
 * 主页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import Footer from '../../common-component/footer/footer.js';
import Header from '../../common-component/header/header.js';
import PageLayoutTpl from './pageLayout.html';

import "./pageLayout.scss";

export default function PageLayout() {
	//主页渲染
    $("#app-container").html( PageLayoutTpl({userName: '用户名XXX'}) );
	//header渲染
    Header($(".header-layout"));
    //footer渲染
    Footer($(".footer-layout"));
}
