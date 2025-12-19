# Product Collection

Product collection algorithm designs.

---

## Get Product List

```
GET /products
```

```mermaid
flowchart TD
  getProducts[GET /products request] --> validateParameters[Validate and parse query parameters]
  validateParameters --> pageParameterCheck[Page parameter?]
  pageParameterCheck -->|Yes| parsePageToInteger[Parse to integer] --> pageIntegerCheck{Valid integer?}
  pageIntegerCheck -->|No| returnInvalidPage[Return 400: Invalid page]
  pageIntegerCheck -->|Yes| validPage[Valid page]
  pageParameterCheck -->|No| defaultPage[Set page = 1] --> validPage

  validPage --> limitParameterCheck{Limit parameter?}
  limitParameterCheck -->|Yes| limitValueCheck{Is limit 10, 25, 50?}
  limitValueCheck -->|No| returnInvalidLimit[Return 400: Invalid limit]
  limitValueCheck -->|Yes| validLimit[Valid limit]
  limitParameterCheck -->|No| defaultLimit[Set limit = 10] --> validLimit

  validLimit --> sortParameterCheck{Sort parameter?}
  sortParameterCheck -->|Yes| sortValueCheck{Is sort A-Z, Z-A, newest, oldest?}
  sortValueCheck -->|No| returnInvalidSort[Return 400: Invalid sort]
  sortValueCheck -->|Yes| validSort[Valid sort]
  sortParameterCheck -->|No| defaultSort[Set sort = 'newest'] --> validSort

  validSort --> constructQuery[Construct database query]
  constructQuery --> executeQuery[Execute query]

  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| returnDatabaseError[Return 500: Database error]
  isQuerySuccessful -->|Yes| isThereResults{Found results?}
  isThereResults -->|No| returnEmptyQuery[Return 200 with empty list]
  isThereResults -->|Yes| formatPaginatedResponse[Format paginated response]
  formatPaginatedResponse --> returnSuccessfulResponse[Return 200 with product list]
```

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

## Create a New Product

```
POST /products
```

```mermaid
flowchart TD
  createProducts[POST /products request] --> getRequestBody[Get request body]
  getRequestBody --> validateRequestBody{"Validate request body (Separate chart)"}
  validateRequestBody --> constructQuery[Construct query]
  constructQuery --> executeQuery[Execute insert query]
  executeQuery --> isQuerySuccessful{Is query successful?}
  isQuerySuccessful -->|No| returnFailedInsertResponse[Return 500: Failed document insert]
  isQuerySuccessful -->|Yes| returnSuccessfulResponse[Return 200 with the created product]
```

## Update Product

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
  isQuerySuccessful -->|Yes| returnSuccessfulUpdateResponse[Return 200 with updated product]
```

---

## Mermaid Flowchart Practice

### A Node (Default)

```mermaid
flowchart LR
  ID
```

### A Node with a Text

```mermaid
---
title: Node with a text
---

flowchart LR
  ID[This is a node with a text]

```

---

### Frying an Egg with Salt Flowchart

```mermaid
flowchart
  breakOpen[Break open the egg] --> putInPan[Put egg in a frying pan] --> salt{Do you need salt?}

  salt -->|Yes| putSalt[Add salt as needed] --> waitToFry[Wait a bit until the egg side is fried]
  salt -->|No| waitToFry

  waitToFry --> isItFried{Is it done frying?}
  isItFried -->|Yes| areBothSidesFried{Are both sides fried?}
  isItFried -->|No| waitToFry

  areBothSidesFried -->|Yes| serve[Serve on a plate]
  areBothSidesFried -->|No| flip[Flip the egg] --> waitToFry
```

