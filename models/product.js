const Sequelize = require('sequelize');

const sequelize = require('../util/database');
// define model 
const product = sequelize.define('product',{
  id : {type : Sequelize.INTEGER , autoIncrement : true , allowNull : false , primaryKey :true } ,
  title: Sequelize.STRING ,
  price:  {type : Sequelize.DOUBLE , allowNull : false  },
  imageUrl:  {type : Sequelize.STRING , allowNull : false  },
  description:  {type : Sequelize.STRING , allowNull : false  }
})

product.findById = async function (id) {
  return await this.findOne({ where: { id } });
};

module.exports = product ;