# Notes Collection

Notes collection algorithm designs.

This feature is private to each user. Therefore, all of the algorithms below assumes that the user is authorized for these actions.

---

## Get Note List

```
GET /notes
```

```mermaid
flowchart TD
  getNotes[GET /notes request] --> validateParameters[Validate and parse query parameters]
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
