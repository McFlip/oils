import Use from "../models/use.js";
import _ from "lodash";

// remove a reference to a product or recipe
export function removeUse( req, res ) {
  const { id, category, refId } = req.params;
  Use.findById(id, function (err, use) {
    if (err) {
      res.status(500).send(error);
    }
    if (category == 'product') {
      use.products = _.filter(use.products, i => i != refId);
    } else if (category == 'recipe') {
      use.recipes = _.filter(use.recipes, i => i != refId);
    } else {
      res.status(500).send('invalid category')
    }
    use.save();
    res.status(200);
  });
}
