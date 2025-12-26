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
PATCH /user/categories{id}
```

```mermaid
flowchart TD
  editCategory["PATCH /user/categories{id}"] --> getIdFromPath[Get category ID from path]
  getIdFromPath --> getRequestBody[Get category name from body]

  getRequestBody --> constructQuery[Construct category edit query]
  constructQuery --> executeQuery[Execute category edit query]

  executeQuery --> isQuerySuccessful{Query successful?}
  isQuerySuccessful -->|No| isServerError{Server error?}
  isServerError -->|Yes| returnServerError[Return 500: Server error]

  isQuerySuccessful -->|No| isCategoryTheSame{Category the same?}
  isCategoryTheSame -->|Yes| returnCategoryNoChange[Return 409: Category name doesn't change]

  isQuerySuccessful -->|No| isCategoryAlreadyExist{Category already exist?}
  isCategoryAlreadyExist -->|Yes| returnCategoryAlreadyExist[Return 409: Category already exist]

  isQuerySuccessful -->|Yes| changeExistingProductsCategory

  subgraph changeExistingProductsCategory [Change Existing Products Category]
    direction LR
    A[TODO: Design existing product category change]
  end

  changeExistingProductsCategory --> constructResponseData[Construct response data]
  constructResponseData --> returnSuccessfulQuery[Return 200 with edited category data]
```
