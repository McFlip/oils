// Check all of the product properties for detail view
const checkProd = require('./checkProd')
module.exports = (res, model) => {
  checkProd(res, model)
  const { photosensitive, topical, dilute, aromatic, dietary } = model.oil
  if (photosensitive) res.oil.photosensitive.should.eql(photosensitive)
  if (topical) res.oil.topical.should.eql(topical)
  if (dilute) res.oil.dilute.should.eql(dilute)
  if (aromatic) res.oil.aromatic.should.eql(aromatic)
  if (dietary) res.oil.dietary.should.eql(dietary)
}
