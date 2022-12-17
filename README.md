Приложение за Project Defence Angular декември 2022г

Може да се стартира като свалите репото , инсталирате package.json на рест-сервиза с npm install и стартиране с npm start.
В главната папка инсталирате package.json с npm install , след това сервирате приложението с ng serve.
Нужно ви е и MongoDB за база данни.

Приложението е проектирано с Angular.cli , за rest-api съм използвал Node.js-Express.js за база данни MongoDB.

Single Page Application - Маркет за продажба или покупка на бебешка количка.

Structure

+Store - NGRX

Auth Module
-login
-register
-profile

Core Module
-header
-footer
-guards
-interfaces

Feature Module
/Pages
-Home
-Search
-not-found

/Strollers
-Catalog
-Create Stroller
-Details Stroller
-Edit Stroller
-Delete Stroller
-User Strollers