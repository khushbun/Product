var Promise = require("bluebird"),
    mongoose = require('mongoose'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    dbQuery = require('../dbquery/product_query');

const multiparty = require('multiparty');
const fs = require('fs');

router.get('/',(req, res, next)=>{
  dbQuery.getAllData().then(
    data=>{res.send({success:true, data:data});}
   ,err => res.send({success:false, msg:err})
  )
})

router.post('/add', (req, res, next)=>{
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    let data = {};

    data.name = fields['name'][0],
    data.price = fields['price'][0],
    data.unit_of_measurement = fields['unit_of_measurement'][0],
    data.description = fields['description'][0];

    if(files['product_image']) {
      data.product_image = files['product_image'][0]['originalFilename'];

      var oldpath = files['product_image'][0]['path'];
      var newpath = '../uploads/' + data.product_image;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        
        dbQuery.addNew(data).then(
          data=>res.send({success:true, data:data})
          ,err => res.send({success:false, msg:err})
        )
      });
    } else {
      dbQuery.addNew(data).then(
        data=>res.send({success:true, data:data})
        ,err => res.send({success:false, msg:err})
      )
    }
  });
  
})

router.get('/edit/:_id',(req, res, next)=>{
  var id =req.params._id;
  
    dbQuery.getById(id).then(
      (userData)=>{
        return res.send({success:true, data:userData})
        }
      ,err => res.send({success:false, msg:err})
    )
})

router.post('/update/:_id',(req, res, next)=>{
  var id =req.params._id;
  
  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    let data = {};

    data.name = fields['name'][0],
    data.price = fields['price'][0],
    data.unit_of_measurement = fields['unit_of_measurement'][0],
    data.description = fields['description'][0];

    if(files['product_image']) {
      data.product_image = files['product_image'][0]['originalFilename'];

      var oldpath = files['product_image'][0]['path'];
      var newpath = '../uploads/' + data.product_image;

      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;

        dbQuery.updateById(id,data).then(
          userData=>res.send({success:true, data:userData})
          ,err => res.send({success:false, msg:err})
        )
      });
    } else {
      dbQuery.updateById(id,data).then(
        userData=>res.send({success:true, data:userData})
        ,err => res.send({success:false, msg:err})
      )
    }
  });
})

router.get('/delete/:_id',(req, res, next)=>{
  var id =req.params._id;
  
  dbQuery.deleteById(id).then(
    succ => res.send('deleted successfully')
  ).catch(
    err => res.send('delete fail') //res.redirect('/all')
  );
})

module.exports = router;
