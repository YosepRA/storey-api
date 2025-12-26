# Product Item

Product item algorithm designs.

---

## Get Product Details

```
GET /products/{id}
```

```mermaid
flowchart TD
  getProductDetails["GET /products/{id} request"] --> getIdFromPath[Get product ID from path]
  getIdFromPath --> constructQuery[Construct database query]
  constructQuery --> executeQuery[Execute query]
  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| isIdInvalid{Invalid id?}
  isIdInvalid -->|Yes| returnInvalidId[Return 400: Invalid ID]
  isQuerySuccessful -->|Yes| isThereResults{Found results?}
  isThereResults -->|No| returnDataNotFound[Return 404: Data not found]
  isThereResults -->|Yes| returnSuccessfulResponse[Return 200 with product data]
```

## Edit Product

```
PATCH /products/{id}
```

```mermaid
flowchart TD
  updateProduct["PATCH /products/{id} request"] --> getIdFromPath[Get product ID from path]
  getIdFromPath --> getRequestBody[Get request body]
  getRequestBody --> validateRequestBody{"Validate request body (Separate chart)"}
  validateRequestBody --> validBody[Valid body]
  validBody --> constructQuery[Construct database query]
  constructQuery --> executeQuery[Execute update query]
  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| returnFailedUpdateResponse[Return 500: Failed document update]
  isQuerySuccessful -->|Yes| isProductFound{Product found?}
  isProductFound -->|No| returnProductNotFound[Return 404: Product not found]
  isProductFound -->|Yes| productUpdateSuccessful[Product update successful]
  productUpdateSuccessful --> returnSuccessfulUpdateResponse[Return 200 with updated product]
```

```mermaid
---
title: Product Update Body Validation
---
flowchart TD
  pending[TBD...]
```

## Update Product Price

```
PATCH /products/{id}/price
```

```mermaid
flowchart TD
  updateProduct["PATCH /products/{id}/price request"] --> getIdFromPath[Get product ID from path]
  getIdFromPath --> getPriceBodyValue[Get price body value]
  getPriceBodyValue --> parsePriceToFloat["Parse price to float"]
  parsePriceToFloat --> isPriceValid[Valid price?]
  isPriceValid -->|No| returnInvalidPrice[Return 400: Invalid price]
  isPriceValid -->|Yes| validPrice[Valid price]

  validPrice --> constructQuery[Construct database query]
  constructQuery --> executeQuery[Execute update query]
  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| returnFailedUpdateResponse[Return 500: Failed document update]
  isQuerySuccessful -->|Yes| isProductFound{Product found?}
  isProductFound -->|No| returnProductNotFound[Return 404: Product not found]
  isProductFound -->|Yes| productUpdateSuccessful[Product update successful]
  productUpdateSuccessful --> returnSuccessfulUpdateResponse[Return 200 with updated product]
```

## Delete Product

```
DELETE /products/{id}
```

```mermaid
flowchart TD
  deleteProduct["DELETE /products/{id} request"] --> getIdFromPath[Get product ID from path]
  getIdFromPath --> constructQuery[Construct database query]
  constructQuery --> executeQuery[Execute delete query]
  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| returnFailedDeleteResponse[Return 500: Failed document delete]
  isQuerySuccessful -->|Yes| isProductFound{Product found?}
  isProductFound -->|No| returnProductNotFound[Return 404: Product not found]
  isProductFound -->|Yes| productDeleteSuccessful[Product delete successful]
  productDeleteSuccessful --> returnSuccessfulDeleteResponse[Return 204]
```
