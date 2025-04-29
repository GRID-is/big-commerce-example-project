import Grid from "@grid-is/api";
import { WorkbookQueryParams } from "@grid-is/api/resources";

export class PricingApi {
  gridApi: Grid;
  workbookId: string;

  constructor(
    apiKey = process.env.GRID_API_KEY,
    workbookId = process.env.GRID_API_WORKBOOK_ID || "",
  ) {
    this.gridApi = new Grid({
      apiKey: apiKey,
    });
    this.workbookId = workbookId;
  }

  async calculatePrice(pricingParams: Record<string, string>): Promise<number> {
    const queryParams: WorkbookQueryParams = {
      options: {
        originals: "off",
        structure: "single",
      },
      read: [],
      apply: [],
    };

    Object.keys(pricingParams).forEach((key) => {
      if (key.includes("SUBTOTAL")) {
        queryParams.read.push(key);
      } else {
        if (!queryParams.apply) {
          queryParams.apply = [];
        } else {
          queryParams.apply.push({
            target: key,
            value: pricingParams[key],
          });
        }
      }
    });

    const data = await this.gridApi.workbooks.query(
      this.workbookId,
      queryParams,
    );

    if (data.read.length === 0) {
      throw new Error("No data found");
    }
    // @ts-expect-error type incorrectly evaluates data
    const price = data.read[0].data.v;

    if (!price || typeof price !== "number") {
      throw new Error("Invalid price data");
    }
    return price;
  }
}
