import * as cartService from "../services/cart.js";

export const getCart = async (req, res) => {
  const id_user = req.data.id;
  if (!id_user) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const cart = await cartService.getCart(id_user);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const id_user = req.data.id;
  if (!id_user) {
    console.log("id_user", id_user);
    return res.status(400).json({ message: "Missing required fields" });
  }
  const { id_product, quantity, price } = req.body;
  if (!id_product || !quantity || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (isNaN(quantity) || isNaN(price)) {
    return res.status(400).json({ message: "Invalid price " });
  }
  if (price < 0) {
    return res.status(400).json({ message: "Invalid price" });
  }
  const total_price = quantity * price;
  try {
    const response = await cartService.addToCart(
      id_user,
      id_product,
      quantity,
      price,
      total_price
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const id_user = req.data.id;
    if (!id_user) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const id_product = req.body.id_product;
    if (!id_product) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await cartService.removeFromCart(id_user, id_product);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const id_user = req.data.id;
    if (!id_user) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const response = await cartService.clearCart(id_user);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}