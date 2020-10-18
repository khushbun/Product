var Promise = require("bluebird"),
    mongoose = require('mongoose'),
    express = require('express'),
    dbModel = require('../dbmodels/product_model');

class Query {
  constructor(options) {
     //this.options = options || {};
   }

   getAllData(){
      return dbModel.find({}).exec();
   }

  addNew(data){
    return new Promise((resolve, reject) => {
      dbModel.create(data).then(
        succ => resolve(data)
        ,err => reject(err)
      )
    })
  }

//first get then update two methods here

getById(id,data){
  return new Promise((resolve, reject) =>{
    dbModel.findOne({_id:id},data).then(
      productData =>resolve(productData)
      ,err => reject(err)
     )
  })
}
updateById(id,data){
  return new Promise((resolve, reject) =>{
    if (id == undefined) {
        return reject();
    }
    dbModel.findOneAndUpdate({_id:id},data).then(
      productData =>{
        if (productData == null || productData == undefined) {
          return reject('user with this {_id} is not avaialble');
        }
        resolve(productData);
      }
      ,err => reject(err)
    )
  })
}

deleteById(id){
  return dbModel.findByIdAndRemove(id).exec()
}


}
module.exports  = new Query();
