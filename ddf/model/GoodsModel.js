var mongoose = require("mongoose");
var Schema = mongoose.Schema;   
var Goods = new Schema({    
    goods_name     : String,
    shop_price      : String,
    goods_number      : String,
    vertual_sales      : String,
    goods_sn      : String,    
    supreme_pro : String,
    new_pro : String,
    grounding : String,
    hot_pro : String,
    pro_num : String,
    create_date      : { type: Date, default: Date.now }
});
var GoodsModel = mongoose.model('goods', Goods);
module.exports = GoodsModel;