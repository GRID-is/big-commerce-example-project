import {
  BigCommerceApi,
  OptionSelection,
  ProductModifier,
} from "../api/bigCommerceApi";
import { PricingApi } from "../api/pricingApi";

function modifiersToOptionSelections(
  modifiers: ProductModifier[],
  model_id: string,
  model_description: string
): OptionSelection[] {
  // 1. filter out the model_id and model_description modifiers
  const filteredModifiers = modifiers.filter(
    (modifier) =>
      modifier.display_name === "model_id" ||
      modifier.display_name === "model_description"
  );
  // 2. build a modifier object with the option_id and the value
  return filteredModifiers
    .map((modifier) => {
      const option_value =
        modifier.display_name === "model_id" ? model_id : model_description;
      return {
        option_id: modifier.id,
        option_value: option_value,
      };
    })
    .filter((option) => !!option.option_value);
}

type Params = {
  cartId: string;
  lineItemId: string;
  price: number;
  quantity: number;
  product_id: string;
  model_id: string;
  parameters: Record<string, string>;
  model_description: string;
};

export class Cart {
  pricingApi: PricingApi;
  bigCommerceApi: BigCommerceApi;

  constructor(pricingApi: PricingApi, bigCommerceApi: BigCommerceApi) {
    this.pricingApi = pricingApi;
    this.bigCommerceApi = bigCommerceApi;
  }

  async addItem(params: Params) {
    const {
      quantity,
      model_id,
      product_id,
      parameters,
      cartId,
      model_description,
    } = params;
    const price = await this.pricingApi.calculatePrice(parameters);
    const modifiers = await this.bigCommerceApi.getProductModifiers(product_id);
    const option_selections = modifiersToOptionSelections(
      modifiers,
      model_id,
      model_description
    );
    const itemInCart = this.bigCommerceApi.addItemToCart({
      cartId,
      price,
      quantity,
      product_id,
      option_selections,
    });
    return itemInCart;
  }

  async updateItem(params: Params) {
    const { cartId, lineItemId } = params;
    await this.bigCommerceApi.removeItemInCart({
      cartId,
      lineItemId,
    });

    return this.addItem(params);
  }

  async createCart(params: Params) {
    const {
      quantity,
      model_id,
      model_description,
      product_id,
      parameters,
      lineItemId,
    } = params;

    const price = await this.pricingApi.calculatePrice(parameters);
    const modifiers = await this.bigCommerceApi.getProductModifiers(product_id);
    const option_selections = modifiersToOptionSelections(
      modifiers,
      model_id,
      model_description
    );
    const itemInCart = await this.bigCommerceApi.createCart({
      lineItemId,
      price,
      quantity,
      product_id,
      model_id,
      option_selections,
    });
    return itemInCart;
  }
}
