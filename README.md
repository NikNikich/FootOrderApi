# Foot Order API




Перед вами API для заказа еды.
 
В нём можно зарегестрироваться, 
создать заказ, выбрать ресторан и из выбранного меню создать заказ.
Идентификация реализована на основе jwt токенов с возможностью
автоматически авторизоваться через рефреш токен.

Также имеется возможность посмотреть отзывы по ресторанам

На текущий момент тут нет создания ресторана и меню. 
И отзывы тоже не создаются.

Имеется возможность программного заполнения базы данных, если вы
включите автоматическое применение миграций.
(TYPEORM_MIGRATIONS_RUN = true) 

Для более полного ознакомления с апи рекомендую после установки 
перейти в Swagger(host:port/api). Там более подробно.
Сдесь же приведу краткое описание. 

```
POST /v1/auth/sign-in - вход в систему
POST /v1/auth/sign-up - создание нового пользователя
POST /v1/auth/refresh - получение токена по рефреш токену
GET /v1/user/avatar - скачать аватар пользователя
PUT /v1/user/avatar - обновить(либо создать) аватар пользователя с
                      возможнстью указания любимых адресов 
GET /v1/user/profile - получить профиль пользователя
PUT /v1/user/profile - сохранит профиль пользователя
POST /v1/user/add/address - добавить адрес пользователя
GET /v1/restaurant - получить список ресторанов
GET /v1/restaurant/{restaurantId}/menu - получить информацию 
                                     по ресторану с его меню
GET /v1/restaurant/{restaurantId}/comments - получить информацию 
                                      по ресторану с отзывами
PUT /v1/restaurant/{restaurantId}/selected - отметить ресторан 
                                            как избранный
POST /v1/order - добавление нового заказа
GET /v1/order - получить активные заказы(не оформленные)
GET /v1/order/{orderId} - получить информацию по конкретному заказу
PUT /v1/order/{orderId} - изменить заказ(адрес и меню)
PUT /v1/order/{orderId}/checkout - оформить заказ
```
Далее продублирую опсание на английском(если что виноват не я,
 а гугл переводчик) дабы не нарушать стиль, начатый мной с коммитов
 
 This is the API for ordering food.
  
 You can register in it,
 create an order, select restaurants and create an order from the selected menu.
 Identification is implemented on the basis of jwt tokens with the ability
 automatically log in via a refresh token.
 
 It is also possible to view responses for restaurants
 
 Currently there is no restaurant and menu creation here.
 And no responses are generated either.
 
 It is possible to programmatically populate the database if you
 enable automatic application of migrations.
 (TYPEORM_MIGRATIONS_RUN = true)
 
 For a more complete acquaintance with the api, I recommend it after installation
 go to Swagger (host:port/api). There is more detail.
 Here is a short description.
 
```
POST /v1/auth/sign-in - Sign in
POST /v1/auth/sign-up - Sign up
POST /v1/auth/refresh - Refresh auth tokens
GET /v1/user/avatar - Download Avatar
PUT /v1/user/avatar - Update (or create) user avatar with
                       the ability to specify favorite addresses
GET /v1/user/profile - Get self profile data
PUT /v1/user/profile - Update self profile data
POST /v1/user/add/address - Add new address
GET /v1/restaurant - Get list restaurants data
GET /v1/restaurant/{restaurantId}/menu - Get restaurant with menu
GET /v1/restaurant/{restaurantId}/comments - Get restaurant with comment
PUT /v1/restaurant/{restaurantId}/selected - Put restaurant selected
POST /v1/order - Add new order
GET /v1/order - Get list active orders
GET /v1/order/{orderId} - Get order
PUT /v1/order/{orderId} - Edit order
PUT /v1/order/{orderId}/checkout - Checkout order
```
 
#### Dependencies
postgres:13.1

node:14.15
 
#### Config example

Add `.env` file with content:

```
 TYPEORM_CONNECTION = postgres
 TYPEORM_HOST = localhost
 TYPEORM_USERNAME = postgres
 TYPEORM_PASSWORD = postgres
 TYPEORM_DATABASE = foot-order
 TYPEORM_PORT = 6100
 TYPEORM_SYNCHRONIZE = true
 JWT_SECRET = very_secret
 REFRESH_TOKEN_LIFE_TIME = 7d
 TOKEN_TIME = 60m
 JWT_RESTORE_SECRET = secretRestore
 DADATA_API_KEY = your dadata api key
 DADATA_SECRET_KEY = your dadata secret key
 DADATA_URL = https://cleaner.dadata.ru
 TYPEORM_MIGRATIONS_RUN = false
 BACKEND_PORT = 5000
```

#### Clone project from repository

`$ git clone https://github.com/NikNikich/FootOrderApi.git`

#### Install dependencies and launch server

1. Execute `yarn install` command.
2. Execute `yarn start` command.

#### Launch server for development in watch mode

Execute `yarn start:dev` command.

#### Generate migration script

Execute `yarn migration:generate`

#### Build container
 
First database
`docker-compose -f docker-compose.db.yml up`
then container
`docker-compose up`

