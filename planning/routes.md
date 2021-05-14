## Tentative API Endpoints
<br>

### Auth endpoints
Request | Endpoint | Request Headers | Request Body |
------------ |------------ | ------------- | ------------- | 
POST | /auth/merchant/register | --- | see "Merchant Registration" JSON |
POST | /auth/merchant/login | --- | see "Login" JSON |
POST | /auth/customer/register | --- | see "Customer Registration" JSON
POST | /auth/customer/login | --- | see "Login" JSON |


#### Additional notes:

<hr>
<br>

### Restaurant endpoints
Request | Endpoint | Request Headers | Request Body |
------------ |------------ | ------------- | ------------- | 
GET | /api/restaurants | --- | --- |
POST | /api/restaurants | Bearer Token | see "Restaurant" JSON |
GET | /api/restaurants/{id} | --- | --- |
PUT | /api/restaurants/{id} | Bearer Token | see "Restaurant" JSON |
DELETE | /api/restaurants/{id} | Bearer Token | --- |

#### Additional notes:
 * The GET `/api/restaurants` endpoint should accept query parameters that can filter by distance from a particular location, filter by cuisine, and filter by number of returned results.
<hr>
<br>

### Menu Item endpoints
Request | Endpoint | Request Headers | Request Body |
------------ |------------ | ------------- | ------------- |
GET | /api/restaurants/{id}/menuitems | --- | --- |
POST | /api/restaurants/{id}/menuitems | Bearer Token | see "Menu Item" JSON | 
GET | /api/restaurants/{id}/menuitems/{id}| --- | --- |
PUT | /api/restaurants/{id}/menuitems/{id} | Bearer Token | see "Menu Item" JSON |
PATCH | /api/restaurants/{id}/menuitems/{id} | Bearer Token | --- |

#### Additional notes:
* The `/api/restaurants/{id}/menuitems/{id}` has no DELETE request because deleting a menu item from the database would mess up rows in the Order table.
* A menu item should be marked as unavailable using the PATCH request when it is no longer needed
<hr>
<br>

### Order placement endpoints
Request | Endpoint | Request Headers | Request Body |
------------ |------------ | ------------- | ------------- |
GET | /api/orders | Bearer Token | --- |
POST | /api/orders | Bearer Token | see "Order" JSON |
GET | /api/orders/{id} | Bearer Token | --- | 
PATCH | /api/orders/{id} | Bearer Token | --- |
* Marking an order as complete should be done through the PATCH request
<hr>
<br>

### Request and Response Body JSON representations
<br>

#### Login JSON
```
{
    "email": "example@google.com"
    "password": "password",
}
```
<br>

#### Merchant Registration JSON
```
{
    "email":"example@google.com"
    "password":"password",
    "business name":"Pizza Place",
    "physical address": {
        "street1": "3033 N Ashland Ave",
        "street2": null,
        "city": "Chicago",
        "zipcode":  "60657",
        "state": "IL"
     }
}
```
<br>


#### Customer Registration JSON
```
{
    "email": "example@google.com"
    "password": "password",
    "first name": "John",
    "last name": "Doe",
}
```
<br>


#### Restaurant JSON
```
{
    "business name": "Burger Place",
    "description": "A place that has the best burgers",
    "time_zone": "America/Chicago",
    "logo_image_url": "",
    "delivery_fee": "2.99",
    "delivery_eta_minutes": "30",
    "pickup_eta_minutes": "15",
    "merchant_cuisine: [
      "burgers", 
      "fastfood"
    ]
    "physical address": {
        "street1": "3043 N Ashland Ave",
        "street2": null,
        "city": "Chicago",
        "zipcode":  "60657",
        "state": "IL"
    }
    "hours": [         
        {
          "day_of_week": "0",
          "start_hour": "12:00",
          "end_hour": "20:00",
        },
        {
          "day_of_week": "1",
          "start_hour": "11:00",
          "end_hour": "22:00",
        },
        {
          "day_of_week": "2",
          "start_hour": "11:00",
          "end_hour": "22:00",
        },
        {
          "day_of_week": "3",
          "start_hour": "11:00",
          "end_hour": "22:00",
        },
        {
          "day_of_week": "4",
          "start_hour": "11:00",
          "end_hour": "22:00",
        },
        {
          "day_of_week": "5",
          "start_hour": "11:00",
          "end_hour": "22:00",
        },
        {
          "day_of_week": "6",
          "start_hour": "11:00",
          "end_hour": "22:00",
        }
    ]
}
```
<br>


#### Menu Item JSON
```
{
    "name": "Bacon Cheeseburger",
    "description": "American cheese, camerlized onions, aplewood bacon",
    "price": "11.00",
    "image_url": "",
    "available": "true",
    "delivery_eta_minutes": "50",
    "pickup_eta_minutes": "30",
    "categories": "burger", 
}
```
<br>


#### Order JSON
```
{
    "payment_method": "card",
    "delivery_method": "pickup",
    "order_lines": [
      {
        "menu_item_id": "32",
        "quantity": "2",
        "price_each": "3.99"
      },
      {
        "menu_item_id": "37",
        "quantity": "2",
        "price_each": "1.99"
      },
    ]
}
```
<br>
