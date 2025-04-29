type AddItemInCartParams = {
  cartId: string;
  price: number;
  quantity: number;
  product_id: string;
  option_selections: OptionSelection[];
};

type RemoveItemInCartParams = {
  cartId: string;
  lineItemId: string;
};

type UpdateItemInCartParams = {
    cartId: string;
    price: number;
    quantity: number;
    product_id: string;
    option_selections: OptionSelection[];
  };

export type ProductModifier = {
  id: number;
  option_value: string;
  name: string;
  display_name: string;
};

export type OptionSelection = {
  option_id: number;
  option_value: string;
};

type UpdateItemInCartProps = {
    lineItemId: string;
    price: number;
    quantity: number;
    product_id: string;
    model_id: string;
    option_selections: OptionSelection[];
  };

export class BigCommerceApi {
  apiToken: string;
  storeHash: string;

  constructor(
    apiToken = process.env.BIG_COMMERCE_API_TOKEN,
    storeHash = process.env.BIG_COMMERCE_STORE_HASH
  ) {
    this.apiToken = apiToken || '';
    this.storeHash = storeHash || '';
  }

  addItemToCart({
    cartId,
    price,
    quantity,
    product_id,
    option_selections,
  }: AddItemInCartParams) {
    const url =
      "https://api.bigcommerce.com/stores/" +
      this.storeHash +
      "/v3/carts/" +
      cartId +
      "/items" +
      "?include=lineItems.physicalItems.options";

    //XXX actually make a request to fetch the product and get hte model_id option id.

    const body = {
      line_items: [
        {
          quantity,
          product_id,
          list_price: price,
          option_selections,
        },
      ],
      channel_id: 1,
      currency: { code: "CAD" },
      locale: "en-US",
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": this.apiToken,
      },
      body: JSON.stringify(body),
    };

    return fetch(url, options).then((res) => res.json());
  }

  removeItemInCart({ cartId, lineItemId }: RemoveItemInCartParams) {
    const url =
      "https://api.bigcommerce.com/stores/" +
      this.storeHash +
      "/v3/carts/" +
      cartId +
      "/items/" +
      lineItemId;

    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": this.apiToken,
      },
    };

    return fetch(url, options);
  }

  async getProductModifiers(productId: string): Promise<ProductModifier[]> {
    const url =
      "https://api.bigcommerce.com/stores/" +
      this.storeHash +
      "/v3/catalog/products/" +
      productId +
      "/modifiers";

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": this.apiToken,
      },
    };

    const modifiers = await fetch(url, options).then((res) => res.json());

    return modifiers.data;
  }

  createCart({
    price,
    quantity,
    product_id,
    option_selections,
  }: UpdateItemInCartProps) {
    const url =
      "https://api.bigcommerce.com/stores/" +
      this.storeHash +
      "/v3/carts" +
      "?include=redirect_urls,line_items.physical_items.options";

    const body = {
      line_items: [
        {
          quantity,
          product_id,
          list_price: price,
          option_selections,
        },
      ],
      channel_id: 1,
      currency: { code: "CAD" },
      locale: "en-US",
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": this.apiToken,
      },
      body: JSON.stringify(body),
    };

    return fetch(url, options).then((res) => res.json());
  }


 updateItemToCart({
    cartId,
    price,
    quantity,
    product_id,
    option_selections,
  }: UpdateItemInCartParams) {
    const url =
      "https://api.bigcommerce.com/stores/" +
      this.storeHash +
      "/v3/carts/" +
      cartId +
      "/items" +
      "?include=lineItems.physicalItems.options";
  
    //XXX actually make a request to fetch the product and get hte model_id option id.
  
    const body = {
      line_items: [
        {
          quantity,
          product_id,
          list_price: price,
          option_selections,
        },
      ],
      channel_id: 1,
      currency: { code: "CAD" },
      locale: "en-US",
    };
  
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": this.apiToken,
      },
      body: JSON.stringify(body),
    };
  
    return fetch(url, options).then((res) => res.json());
  }
}
