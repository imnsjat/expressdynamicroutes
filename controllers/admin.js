const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing : false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null  , title, imageUrl, description, price);
  // product.save()
  // .then(()=>{
  //   res.redirect('/')
  // })
  // .catch(err=> console.log(err));
  Product.create({title : title , price : price , imageUrl :imageUrl , description : description })
  .then(()=>res.redirect('/admin/products'))
  .catch(err=>console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode){
    res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId).then(  product  =>{
    if(!product){
      console.log('no such product');
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'edit Product',
      path: '/admin/edit-product',
      editing : editMode ,
      product : product 
    });

  })
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  Product.findById(prodId)
  .then((product)=>{
    product.title = updatedTitle ;
    product.price = updatedPrice ;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;

    return product.save();
  })
  .then(()=>res.redirect('/products'))
  .catch(err=>console.log(err))
  
  // console.log('id' ,prodId, 'title ',updatedTitle   , 'url', updatedImageUrl, 'price',updatedPrice , 'description' ,updatedDescription, 'product' , updatedProduct);
  // updatedProduct.save();
  
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId=req.body.productId;
  // Product.deleteById(prodId);
  Product.findById(prodId).then(product => {
     return product.destroy();
  }).then(()=> res.redirect('/admin/products'))
  .catch(err=>{console.log(err)})
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
