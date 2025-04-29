import { Router, Request, Response } from "express";
import { Cart } from "./cart/cart";
import { PricingApi } from "./api/pricingApi";
import { BigCommerceApi } from "./api/bigCommerceApi";

// Verify that env variables are set
if (!process.env.BIG_COMMERCE_API_TOKEN) {
  throw new Error("BIG_COMMERCE_API_TOKEN is not set");
}

if (!process.env.BIG_COMMERCE_STORE_HASH) {
  throw new Error("BIG_COMMERCE_STORE_HASH is not set");
}

if (!process.env.GRID_API_KEY) {
  throw new Error("GRID_API_KEY is not set");
}

if (!process.env.GRID_API_WORKBOOK_ID) {
  throw new Error("GRID_API_WORKBOOK_ID is not set");
}

const router = Router();
const cart = new Cart(new PricingApi(), new BigCommerceApi());

// POST /cart/add-item
router.post("/add-item", async (req: Request, res: Response) => {
  try {
    const cartRes = await cart.addItem(req.body);
    res.status(200).json(cartRes);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// PUT /cart/update-item
router.put("/update-item", async (req: Request, res: Response) => {
  try {
    const cartRes = await cart.updateItem(req.body);
    res.status(200).json(cartRes);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
});

// POST /cart/create
router.post("/create", async (req: Request, res: Response) => {
  try {
    const cartRes = await cart.createCart(req.body);
    res.status(200).json(cartRes);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Failed to create cart" });
  }
});

export default router;
