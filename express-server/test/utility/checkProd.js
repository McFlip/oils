// Check a product according to the inventory view
module.exports = (res, model) => {
  if (res.inventory[0].prod) res._id.should.eql(res.inventory[0].prod)
  res.category.should.eql(model.category)
  res.inventory[0].qty.should.eql(model.inventory[0].qty)
  res.inventory[0].wishlist.should.eql(model.inventory[0].wishlist)
  res.size.should.eql(model.size)
  res.sku.should.eql(model.sku)
}
