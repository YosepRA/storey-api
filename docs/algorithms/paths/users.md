# User Algorithm

User algorithm designs.

---

## User Registration

```
POST /user/register
```

```mermaid
flowchart TD
  userRegistration[POST /user/register] --> getRequestBody[Get request body]
  getRequestBody --> validateRequestBody{"Validate request body (separate chart)"}
  validateRequestBody --> validBody[Valid body]
  validBody --> constructQuery[Construct user registration query]
  constructQuery --> executeQuery[Execute user registration query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| duplicateEmailOrUsername{Email or username already exist?}
  duplicateEmailOrUsername -->|Yes| returnDuplicateEmailOrUsername[Return 409: Username or email already exist]

  isQuerySuccessful -->|Yes| establishSession[Establish user session]
  establishSession --> constructUserData[Construct user data response]
  constructUserData --> returnSuccessfulRegistration[Return 200 with minimum user data]
```

## User Login

```
POST /user/login
```

```mermaid
flowchart TD
  userLogin[POST /user/login] --> executeLoginMiddleware["TODO: Execute login middleware (passport)"]
  executeLoginMiddleware --> isLoginSuccessful{Login successful?}

  isLoginSuccessful -->|No| returnFailedLogin[Return 401: User login failed]

  isLoginSuccessful -->|Yes| establishSession[Establish user session]
  establishSession --> constructUserData[Construct user data response]
  constructUserData --> returnSuccessfulLogin[Return 200 with minimum user data]
```

## User Logout

```
GET /user/logout
```

```mermaid
flowchart TD
  userLogout[GET /user/logout] --> executeLogout[Execute Passport logout interface]
  executeLogout --> isLogoutSuccessful{Logout successful}
  isLogoutSuccessful -->|No| returnServerError[Return 500: Server error]
  isLogoutSuccessful -->|Yes| returnSuccessfulLogout[Return 204]
```

## Create New Category

```
POST /user/categories
```

```mermaid
flowchart TD
  createNewCategory[POST /user/categories] --> getRequestBody[Get category name from body]
  getRequestBody --> constructQuery[Construct create category query]
  constructQuery --> executeQuery[Execute create category query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isCategoryAlreadyExist{Category already exist?}
  isCategoryAlreadyExist -->|Yes| returnCategoryAlreadyExist[Return 409: Category already exist]

  isQuerySuccessful -->|Yes| constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 201 with new category]
```

## Edit Category

```
PATCH /user/categories/{id}
```

```mermaid
flowchart TD
  editCategory["PATCH /user/categories/{id}"] --> getIdFromPath[Get category ID from path]
  getIdFromPath --> getRequestBody[Get new category name from body]

  getRequestBody --> constructQuery[Construct category edit query]
  constructQuery --> executeQuery[Execute category edit query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isCategoryDoesNotExist{Invalid category ID?}
  isCategoryDoesNotExist -->|Yes| returnCategoryDoesNotExist[Return 404: Category does not exist]

  isQuerySuccessful -->|No| isCategoryDoesNotChange{Category does not change?}
  isCategoryDoesNotChange -->|Yes| returnCategoryAlreadyExist[Return 409: Category name does not change]

  isQuerySuccessful -->|Yes| changeExistingProductsCategory

  subgraph changeExistingProductsCategory [Change Existing Products Category]
    A[TODO: Design existing product category change]
  end

  changeExistingProductsCategory --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 200 with edited category data]
```

## Delete Category

```
DELETE /user/categories/{id}
```

```mermaid
flowchart TD
  editCategory["DELETE /user/categories{id}"] --> getIdFromPath[Get category ID from path]
  getIdFromPath --> constructQuery[Construct category delete query]
  constructQuery --> executeQuery[Execute category delete query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isCategoryDoesNotExist{Invalid category ID?}
  isCategoryDoesNotExist -->|Yes| returnCategoryDoesNotExist[Return 404: Category does not exist]

  isQuerySuccessful -->|Yes| deleteCategoryFromProducts

  subgraph deleteCategoryFromProducts [Delete Category From Products]
    A[TODO: Design category deletion from products]
  end

  deleteCategoryFromProducts --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 204]
```

## Create New Unit Measurement

```
POST /user/unit
```

```mermaid
flowchart TD
  createNewUnit[POST /user/unit] --> getRequestBody[Get unit name from body]
  getRequestBody --> constructQuery[Construct create unit query]
  constructQuery --> executeQuery[Execute create unit query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isUnitMeasurementAlreadyExist{Unit already exist?}
  isUnitMeasurementAlreadyExist -->|Yes| returnUnitMeasurementAlreadyExist[Return 409: Unit already exist]

  isQuerySuccessful -->|Yes| constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 201 with new unit]
```

## Edit Unit Measurement

```
PATCH /user/unit/{id}
```

```mermaid
flowchart TD
  editUnit["PATCH /user/unit/{id}"] --> getIdFromPath[Get unit ID from path]
  getIdFromPath --> getRequestBody[Get new unit name from body]

  getRequestBody --> constructQuery[Construct unit edit query]
  constructQuery --> executeQuery[Execute unit edit query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isUnitDoesNotExist{Invalid unit ID?}
  isUnitDoesNotExist -->|Yes| returnUnitDoesNotExist[Return 404: Unit does not exist]

  isQuerySuccessful -->|No| isUnitDoesNotChange{Unit does not change?}
  isUnitDoesNotChange -->|Yes| returnUnitAlreadyExist[Return 409: Unit name does not change]

  isQuerySuccessful -->|Yes| changeExistingProductsUnit

  subgraph changeExistingProductsUnit [Change Existing Products Unit]
    A[TODO: Design existing product unit change]
  end

  changeExistingProductsUnit --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 200 with edited unit data]
```

## Delete Unit Measurement

```
DELETE /user/unit/{id}
```

```mermaid
flowchart TD
  editUnit["DELETE /user/unit{id}"] --> getIdFromPath[Get unit ID from path]
  getIdFromPath --> constructQuery[Construct unit delete query]
  constructQuery --> executeQuery[Execute unit delete query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isUnitDoesNotExist{Invalid unit ID?}
  isUnitDoesNotExist -->|Yes| returnUnitDoesNotExist[Return 404: Unit does not exist]

  isQuerySuccessful -->|Yes| deleteUnitFromProducts

  subgraph deleteUnitFromProducts [Delete Unit From Products]
    A[TODO: Design unit deletion from products]
  end

  deleteUnitFromProducts --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 204]
```

## Create New Store

```
POST /user/store
```

```mermaid
flowchart TD
  createNewStore[POST /user/store] --> getRequestBody[Get store data from body]
  getRequestBody --> validateRequestBody{TODO: Store body validation}
  validateRequestBody -->|Yes| validBody[Valid body]
  validBody --> constructQuery[Construct create store query]
  constructQuery --> executeQuery[Execute create store query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isStoreAlreadyExist{"Store already exist? (Based on its name)"}
  isStoreAlreadyExist -->|Yes| returnStoreAlreadyExist[Return 409: Store already exist]

  isQuerySuccessful -->|Yes| constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 201 with new store]
```

## Edit Store

```
PATCH /user/store/{id}
```

```mermaid
flowchart TD
  editStore["PATCH /user/store/{id}"] --> getIdFromPath[Get store ID from path]
  getIdFromPath --> getRequestBody[Get new store data from body]

  getRequestBody --> validateRequestBody{TODO: Store body validation}
  validateRequestBody -->|Yes| validBody[Valid body]

  validBody --> constructQuery[Construct store edit query]

  constructQuery --> executeQuery[Execute store edit query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isStoreDoesNotExist{Invalid store ID?}
  isStoreDoesNotExist -->|Yes| returnStoreDoesNotExist[Return 404: Store does not exist]

  isQuerySuccessful -->|No| isStoreDoesNotChange{Store does not change?}
  isStoreDoesNotChange -->|Yes| returnStoreAlreadyExist[Return 409: Store name does not change]

  isQuerySuccessful -->|Yes| changeExistingProductsStore

  subgraph changeExistingProductsStore [Change Existing Products Store]
    A[TODO: Design existing product store change]
  end

  changeExistingProductsStore --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 200 with edited store data]
```

## Delete Store

```
DELETE /user/store/{id}
```

```mermaid
flowchart TD
  editStore["DELETE /user/store{id}"] --> getIdFromPath[Get store ID from path]
  getIdFromPath --> constructQuery[Construct store delete query]
  constructQuery --> executeQuery[Execute store delete query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isStoreDoesNotExist{Invalid store ID?}
  isStoreDoesNotExist -->|Yes| returnStoreDoesNotExist[Return 404: Store does not exist]

  isQuerySuccessful -->|Yes| deleteStoreFromProducts

  subgraph deleteStoreFromProducts [Delete Store From Products]
    A[TODO: Design store deletion from products]
  end

  deleteStoreFromProducts --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 204]
```
