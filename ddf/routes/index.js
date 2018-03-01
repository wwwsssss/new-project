var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");
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
router.get('/goods_list',function(req,res){
	res.render('goods_list');
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
module.exports = router;
