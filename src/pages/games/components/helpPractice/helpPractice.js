import HelpPracticeTpl from './helpPractice.html'

/**
 *
 * @param $el 选择器
 * @param infoList 组件对象
 * @constructor
 */
export default function HelpPractice($el, infoList) {
    const handlers = {
        init: function() {
            $el.html(HelpPracticeTpl({infoList}));
            this.bindEvent();
        },
        bindEvent: function() {

        }
    }
    handlers.init();
}