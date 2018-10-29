var express = require('express');
var router = express.Router();
let userDate = require('../data/user');
let userJsonData = require('../data/user.Json')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', userDate);
});
/**
 * GET Sam Send page router
 */
router.get('/sam/home', function(req, res, next) {
  console.log('sam home router!')
  res.render('sendSam', userDate);
});
/**
 * GET Sam receive Page 
 */
router.route('/sam/form')
.get( function(req, res, next) {
  console.log('receive!');
  console.log(req)
  let receiveData = req.query;
  console.log('=========')
  console.log(req.query)
  let answer = req.query.answer;
  userDate.result = answer
  userDate.receiveData = receiveData;
  res.render('samForm', userDate);
})
.post(function(req,res){
  console.log('POST receive!');
  let receiveData = req.body;
  console.log(req.body)
  userDate.receiveData = receiveData;
  // console.log(userDate)
  res.render('samForm', userDate);
})

router.route('/sam/form/f')
.get( function(req, res, next) {
  console.log('f form!');
  console.log(req)
  let receiveData = req.query;
  console.log('=========')
  console.log(req.query)
  let answer = req.query.answer;
  userDate.result = answer
  userDate.receiveData = receiveData;
  res.render('samForm', userDate);
})
.post(function(req,res){
  console.log('f form post')
  console.log('POST receive!');
  let receiveData = req.body;
  console.log(req.body)
  userDate.receiveData = receiveData;
  // console.log(userDate)
  res.render('samForm', userDate);
})

router.route('/sam/form/angel')
.get( function(req, res, next) {
  console.log('f form!');
  console.log(req)
  let receiveData = req.query;
  console.log('=========')
  console.log(req.query)
  let answer = req.query.answer;
  userDate.result = answer
  userDate.receiveData = receiveData;
  res.render('samForm', userDate);
})
.post(function(req,res){
  console.log('andgel form post')
  console.log('POST receive!');
  let receiveData = req.body;
  console.log(req.body)
  userDate.receiveData = receiveData;
  // console.log(userDate)
  res.render('samForm', userDate);
})
module.exports = router;
