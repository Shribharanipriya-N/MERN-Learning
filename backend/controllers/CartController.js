const Cart = require('../models/CartModel');
const Product = require('../models/ProductModels');
const addcart = async (req, res) => {
  const { productid, quantity } = req.body;
  const userid = req.user.id;
  if (!productid || !userid || quantity == null) {
    return res.status(401).send({ message: "Cannot add item, missing data." });
  }
  try {
    const cart = await Cart.findOne({ userid });

    if (cart) {
      const oldProduct = cart.products.find(p => p.productid === productid);
      if (oldProduct) {
        oldProduct.quantity = quantity;
        await cart.save();
        return res.status(200).send({ message: "Item quantity updated." });
      } else {
        cart.products.push({ productid, quantity });
        await cart.save();
        return res.status(200).send({ message: "Item added to cart." });
      }
    } else {
      const newCart = new Cart({ userid, products: [{ productid, quantity }] });
      await newCart.save();
      return res.status(200).send({ message: "New cart created." });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send({ error: "An error occurred." });
  }
};




const getcart = async (req, res) => {
  const userid = req.user.id;
  console.log(userid);
  try {
    const cart = await Cart.findOne({ userid });
    console.log(cart);
    if (cart) {
      let subtotal = 0
      const productDetails = await Promise.all(
        cart.products.map(async (item) => {
          const product = await Product.findOne({ id: item.productid });
          subtotal += product.price * item.quantity
          return {
            id:product.id,
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity: item.quantity
          };

        })
      );
      res.status(200).send({ productDetails, subtotal });
    } else {
      res.status(200).send({ message: "No items found" ,productDetails:[]});
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
const deletecart = async (req, res) => {
  const productid = req.body.productid;
  const userid = req.user.id;
  console.log(productid, userid)
  try {
    const cart = await Cart.findOne({ userid });
    if (cart) {
      const product = cart.products.findIndex(p => p.productid === productid);
      console.log(product);
      if (product > -1) {
        cart.products.splice(product, 1);
        if (cart.products.length > 0) {
          await cart.save();
        } else {
          await Cart.deleteOne({ userid });
        }
        res.send({ message: "Product removed from cart" });
      } else {
        res.send({ message: "Item not found" });
      }
    } else {
      res.send({ message: "No products found" });
    }

  }
  catch (e) {
    console.log(e);
  }

}




module.exports = { addcart, getcart, deletecart };