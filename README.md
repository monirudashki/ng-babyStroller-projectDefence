Приложение за Project Defence Angular декември 2022г

Може да се стартира като свалите репото , инсталирате package.json на рест-сервиза с npm install и стартиране с npm start.
В главната папка инсталирате package.json с npm install , след това сервирате приложението с ng serve.
Нужно ви е и MongoDB за база данни.

Приложението е проектирано с Angular.cli , за rest-api съм използвал Node.js-Express.js за база данни MongoDB.

Single Page Application - Маркет за продажба или покупка на бебешка количка.

Structure

+Store - NGRX
A have global store with login reducer and logout reducer

Auth Module - lazy loaded
Register 
- Dynamic validation , error handling , disabled button after request , correct register user
- First you have to create a admin user , create regular user , then in mongo database , change role to created user to 'admin'
(only admin user can approve or moderated created strollers)
Login
- Dynamic validation , error handling , disabled button after request , correct login user
Profile
- User info
- edit user info - Dynamic validation , error handling , disabled button after request , correct editing user
- user strollers - active strollers with pagination, holding strollers , moderated strollers (loading angular animation)

Core Module
- header - correct navigation for all users
- footer - app owner
- guards - authGuard , GuestGuard , adminGuard
- interfaces - all needed interfaces

Feature Module
/Pages
Home - Home Page
Search 
- search by brand , condition and price min and max
- search results with correct search result with pagination (loading angular animation)
- not-found-page - incorrect url lead to not-found-page

/Admin
Admin Catalog
- catalog of ads in holding position , admin can approve or moderated strollers , then send them to catalog or to edit from user

/Strollers - lazy loaded
Catalog
- all strollers ads with pagination (loading angular animation)
Create Stroller
- Dynamic validation , error handling , disabled button after request , correct created stroller
- after success , admin will receive stroller , then he can approve or moderated ad
Details Stroller
- Details about current stroller , with functionality (loading angular animation)
- if current user is owner , edit stroller , delete stroller , add comment
- if current user is not owner , like , unlike , comment or reach owner strollers catalog 
Edit Stroller
- Dynamic validation , error handling , disabled button after request , correct editing stroller
- after success , admin will receive stroller , then he can approve or moderated ad
User Strollers
- user strollers catalog (loading angular animation)