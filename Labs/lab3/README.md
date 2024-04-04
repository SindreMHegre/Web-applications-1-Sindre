# FilmLibrary API

## Retrieve all films

- Method: GET
- URL: /films
- Description: Retrieves the list of all available films.
- Sample Request: N/A
- Sample Response:
    ```json
    [
        {
            "id": 1,
            "title": "The dark knight",
            "rating": 4,
            "favorite": false,
            "watchDate": "2022-10-01",
            "userId" : 1
        },
        {
            "id": 2,
            "title": "Django unchained",
            "rating": 5,
            "favorite": true,
            "watchDate": "2022-09-15",
            "userId" : 1
        },
        ...
    ]
    ```
- Error Response: "There are no films in the DB"

## Retrieve films based on filters

- Method: GET
- URL: /films?filter={filter}
- Description: Retrieves a list of films based on the specified filter.
- Sample Request: /films?filter=favorites, /film?filter=best, /film?filter=last_month, /films?filter=not_seen
- Sample Response:
    ```json
    [
        {
            "id": 2,
            "title": "Django unchained",
            "rating": 5,
            "favorite": true,
            "watchDate": "2022-09-15",
            "userId" : 1
        },
        ...
    ]
    ```
- Error Response: There are no films matching this filter, invalid filter

## Retrieve a specific film

- Method: GET
- URL: /films/{id}
- Description: Retrieves a specific film by its ID.
- Sample Request: /films/1
- Sample Response:
    ```json
    {
        "id": 1,
        "title": "The dark knight",
        "rating": 4,
        "favorite": false,
        "watchDate": "2022-10-01",
        "userId" : 1
    }
    ```
- Error Response: There is no film with this ID

## Create a new film

- Method: POST
- URL: /films
- Description: Creates a new film.
- Sample Request:
    ```json
    {
        "title": "Fellowship of the ring",
        "rating": 4,
        "favorite": false,
        "watchDate": NULL,
        "userId" : 1
    }
    ```
- Sample Response:
    ```json
    {
        "id": 3,
        "title": "Fellowship of the ring",
        "rating": 4,
        "favorite": false,
        "watchDate": NULL,
        "userId" : 1
    }
    ```
- Error Response: Some fields were not correctly filled in

## Update an existing film

- Method: PUT
- URL: /films/{id}
- Description: Updates an existing film by its ID.
- Sample Request:
    ```json
    {
        "title": "The dark knight",
        "rating": 4,
        "favorite": true,
        "watchDate": "2022-10-15",
        "userId" : 1
    }
    ```
- Sample Response:
    ```json
    {
        "id": 1,
        "title": "The dark knight",
        "rating": 4,
        "favorite": true,
        "watchDate": "2022-10-15",
        "userId" : 1
    }
    ```
- Error Response: There is no film with that ID, new data is not valid

## Update the rating of a specific film

- Method: PUT
- URL: /films/{id}/rating
- Description: Updates the rating of a specific film by its ID.
- Sample Request:
    ```json
    {
        "rating": 5
    }
    ```
- Sample Response:
    ```json
    {
        "id": 1,
        "title": "The dark knight",
        "rating": 5,
        "favorite": true,
        "watchDate": "2022-10-15",
        "userId" : 1
    }
    ```
- Error Response: No film with that ID

## Mark a film as favorite/unfavorite

- Method: PUT
- URL: /films/{id}/favorite
- Description: Marks a film as favorite or unfavorite by its ID.
- Sample Request:
    ```json
    {
        "favorite": false
    }
    ```
- Sample Response:
    ```json
    {
        "id": 1,
        "title": "The dark knight",
        "rating": 4,
        "favorite": false,
        "watchDate": "2022-10-15",
        "userId" : 1
    }
    ```
- Error Response: No film with that ID

## Delete a film

- Method: DELETE
- URL: /films/{id}
- Description: Deletes a film by its ID.
- Sample Request: /films/1
- Sample Response:
    ```json
    {
        "status": "Deleted"
    }```
- Error Response: