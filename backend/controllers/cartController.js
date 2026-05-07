const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;


        let cart = await Cart.findOne({
            user: req.user._id,
        });


        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
            });
        }


        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1,
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");
        cart.items = cart.items.filter((item) => item.product);

        await cart.save();

        if (!cart) {
            return res.status(200).json({
                items: [],
                total: 0,
            });
        }

        let total = 0;

        cart.items.forEach((item) => {
            if (item.product) {
                total += item.product.price * item.quantity;
            }
        });

        res.status(200).json({
            cart,
            total,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                item.product.toString() !== req.params.productId
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed from cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === req.params.productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartQuantity,
};