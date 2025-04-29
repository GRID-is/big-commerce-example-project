BigCommerce Integration with GRID API

This is an example project showcasing how to use the [GRID API](https://grid.is) as a pricing engine for BigCommerce. The project is built using Node.js and Express and demonstrates how to integrate BigCommerce's API with GRID's API to handle pricing logic.

## Features

- **BigCommerce API Integration**: Connects to BigCommerce to manage cart (create & add items)
- **GRID API Integration**: Uses GRID API as a pricing engine to calculate prices dynamically.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GRID-is/big-commerce-example-project.git
   cd big-commerce-example-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the required API keys and configuration:
   ```
   GRID_API_KEY=xxxx
   GRID_API_WORKBOOK_ID=xxxx
   BIG_COMMERCE_API_TOKEN=xxxx
   BIG_COMMERCE_STORE_HASH=xxxx
   ```

## Usage

1. Start the server:

   ```bash
   npm run build
   npm start
   ```

2. Access the application:
   Open your browser and navigate to `http://localhost:3000`.

