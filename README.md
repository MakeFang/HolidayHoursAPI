# HOLIDAY HOURS API

[Documentation](https://makefang.github.io/HolidayHoursAPI/#/)

[Base API URL](https://enigmatic-garden-88813.herokuapp.com/api/)

The purpose of this API is

## Authentication Routes

### Request **GET** /auth/

- Parameters: None
- Response: returns the username of the currently logged in user.

### Request **GET** /auth/logout

- Parameters: None
- Response: logs the user out.

### Request **POST** /auth/sign-up

- Body:

| Name        | Type           | Description  |
| :-------------: |:-------------:| -----|
| name      | String | The name of your business |
| username      | String      |    |
| password | String     |    |

- Response: The username of the account.

### Request **POST** /auth/login

- Body:

| Name        | Type           | Description  |
| :-------------: |:-------------:| -----|
| username      | String      |    |
| password | String     |    |

- Response: The username of the account.

### Request **PUT** /auth/login

**The user can only modify its own account.**

- Body:

| Name        | Type           | Description  |
| :-------------: |:-------------:| -----|
| password | String     |    |

- Response: The username of the modified account.

### Request **DELETE** /auth/

**The user can only delete its own account.**

- Body: None
- Response: The deleted user.

## Holiday Hours Routes

### Request **GET** /holiday-hours/

- Parameters: None
- Response: An array of holiday hours for the currently logged-in account. 204 if the current account has no associated holiday hours.

```
[
    {
        "_id": "5c0f63f4d37d6e880a55a6f8",
        "date": "2019-01-01T00:00:00.000Z",
        "open": 0900,
        "close": 2100
    }
]
```

### Request **GET** /holiday-hours/hoursId

- Parameters: None
- Response: A holiday hour associated to the given hoursId. 204 if the given hoursId does not exist in the database.

```
{
    "_id": "5c0f63f4d37d6e880a55a6f8",
    "date": "2019-01-01T00:00:00.000Z",
    "open": 0900,
    "close": 2100,
    "user": {
        "_id": "5c0f62f2300047876420ca2c",
        "name": "business name",
    },
    "__v": 0
}
```

### Request **POST** /holiday-hours/

- Body:

| Name        | Type           | Description  |
| :-------------: |:-------------:| -----|
| date      | Date | The date of holiday, in the form YYYY-MM-DD |
| open      | Number      |  The time the business opens. 4 numbers in the form HHMM in 24-hour-clock convention. For example, 7:15am will become 0715 |
| close | Number     |  The time the business closes. 4 numbers in the form HHMM in 24-hour-clock convention. For example, 6:30pm will become 1830  |

- Response: 201 with the created document.

```
{
    "__v": 0,
    "date": "2018-12-25T00:00:00.000Z",
    "open": 1200,
    "close": 1800,
    "user": "5c10211ee8637800044c92cf",
    "_id": "5c109963e98604000455af56"
}
```

### Request **PUT** /holiday-hours/hoursId

**Only the creator of the holiday hours (specified by the hoursId) has the authorization to update and modify it.**

- Body:

| Name        | Type           | Description  |
| :-------------: |:-------------:| -----|
| date      | Date | The date of holiday, in the form YYYY-MM-DD |
| open      | Number      |  The time the business opens. 4 numbers in the form HHMM in 24-hour-clock convention. For example, 7:15am will become 0715 |
| close | Number     |  The time the business closes. 4 numbers in the form HHMM in 24-hour-clock convention. For example, 6:30pm will become 1830  |

- Response: 200 with the modified document. 403 if the currently logged in user is not the creator of the document.

```
{
    "_id": "5c109963e98604000455af56",
    "date": "2018-12-25T00:00:00.000Z",
    "open": 1100,
    "close": 2100,
    "user": "5c10211ee8637800044c92cf",
    "__v": 0
}
```

### Request **DELETE** /holiday-hours/hoursId

**Only the creator of the holiday hours (specified by the hoursId) has the authorization to delete it.**

- Body: None
- Response: 200 with the deleted document. 403 if the currently logged in user is not the creator of the document.
