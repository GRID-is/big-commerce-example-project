import './env';

import express from "express";
import router from "./router";

const app = express();

// built‑in JSON body parser
app.use(express.json());

// Mount all cart‑related endpoints at /cart
app.use("/api/cart", router);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`🚀  Server listening on port ${PORT}`);
});

export default app;
