let qqFaceDes=['微笑','撇嘴','色','发呆','流泪','害羞','闭嘴','睡','大哭','尴尬','发怒',
    '调皮','龇牙','惊讶','难过','冷汗','抓狂','吐','偷笑','可爱','白眼','傲慢','饥饿',
    '困','惊恐','流汗','大笑','大兵','奋斗','咒骂','疑问','嘘','晕','折磨','衰','敲打',
    '再见','擦汗','抠鼻','臭大了','坏笑','左哼哼','右哼哼','哈欠','鄙视','委屈','快哭了',
    '阴险','亲亲','吓','可怜','抱抱','月亮','太阳','炸弹','骷髅','菜刀','猪头','西瓜','咖啡',
    '饭','爱心','强','弱','握手','胜利','抱拳','勾引','OK','NO','玫瑰','凋谢','示爱','爱情','飞吻'];
module.exports = {
    getFaceList:function () {
        let listFace = [];
        for(let i = 0,len = 75;i<len;i++){
            let qqGif = {};
            qqGif.url = require('../../asset/images/arclist/'+(i+1)+'.gif');
            qqGif.title = qqFaceDes[i];
            listFace.push(qqGif);
        }
        return listFace;
    },
    qqFaceResolve:function (lt) {
        let qqFaces = this.getFaceList();
        for (let k in lt){
            for(let f in qqFaces){
                let face = '['+qqFaces[f].title+']';
                if(lt[k].Content && lt[k].Content.indexOf(face)!==-1){
                    let fList = lt[k].Content.split(face);
                    lt[k].Content = fList.join('<img style="width: 0.6rem;" src="'+qqFaces[f].url+'"/>');
                }
            }
        }
    }
};