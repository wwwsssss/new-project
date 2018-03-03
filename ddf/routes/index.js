var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
var GoodsModel = require("../model/GoodsModel");
var multiparty = require('multiparty')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/admin',function(req,res){
	res.render('admin');
})
router.get('/goods_add',function(req,res){
	res.render('goods_add');
})
router.get('/control',function(req,res){
	res.render('control');
})
router.get('/api/goods_del',function(req,res){
	console.log(11111);
	GoodsModel.findByIdAndRemove({_id:req.query.gid},function(err){
		var result={
			status : 1,
			message : "商品删除成功"
		}
		if(err){
			result.status = -110;
			result.message = "商品删除失败";
		}
		res.send(result);
	})
})
router.post('/admin',function(req,res){	
	var username = req.body.username;
	var psw = req.body.password;	
	var result = {
		status : 1,
		message : "登录成功"
	}
	
	UserModel.find({username:username,psw:psw},function(err,docs){
		if(!err&&docs.length>0){
			console.log("登录成功");
			res.send(result);
		}else{
			console.log("登录失败");
			result.status = -1;
			result.message = "登录失败";
			res.send(result);	 		
		}		
	})	
})
router.get('/list',function(req,res){
	 var pageNo = parseInt(req.query.pageNo || 1);
	 var count = parseInt(req.query.count || 15);
	 var query = GoodsModel.find({}).sort({create_date:-1});
	 query.exec(function(err,docs){
		res.render("goods_list",{list:docs,sum:docs.length,pageNo:pageNo,count:count});	 	
	})
})
router.get('/goods_list',function(req,res){	
	var Form = new multiparty.Form();
	Form.parse(req,function(err,body,files){
		var goods_name = req.query.goods_name[0];
		var goods_sn = req.query.goods_sn[0];
		var shop_price = req.query.shop_price[0];
		var goods_number = req.query.goods_number[0];
		var vertual_sales = req.query.vertual_sales[0];	
		
//		var imgName = files.img[0].path;
//		imgName = imgName.substr(imgName.lastIndexOf("\\")+1);
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.shop_price = shop_price;
		gm.goods_sn = goods_sn;
		gm.goods_number = goods_number;
		gm.vertual_sales = vertual_sales;			
//		gm.img = imgName;
		gm.save(function(err){
			if(!err){
				res.send("商品保存成功");
			}else{
				res.send("商品保存失败");
			}
		})
	})
})

module.exports = router;

