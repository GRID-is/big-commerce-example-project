import "./env";
const cors = require('cors');

import express from "express";
import router from "./router";

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// built‑in JSON body parser
app.use(express.json());

// Mount all cart‑related endpoints at /cart
app.use("/api/cart", router);

app.use("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`🚀  Server listening on port ${PORT}`);
});

export default app;
