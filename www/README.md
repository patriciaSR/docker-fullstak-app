# algunas pistas para empezar a saltar las piedras del camino:

solución al error de CORS:
https://expressjs.com/en/resources/middleware/cors.html

hay que instalar:
npm install cors --save


como hacer el fetch de get y post desde el js del FRONT de tu aplicación (www):
https://attacomsian.com/blog/using-javascript-fetch-api-to-get-and-post-data

solucion al req.body de app (mongo) en el BACK:
https://stackoverflow.com/questions/45288147/post-an-object-with-fetch-using-react-js-and-express-api-server

hay que instalar: 
npm install body-parse --save

logs del contenedor del servidor app:
docker-compose logs app


para borrar dentro de mongo elementos de la base de datos:
db.micoleccion.find({})
db.micoleccion.deleteOne({objeto})


## CADA VEZ QUE MODIFIQUEMOS EL INDEX.JS DE APP (NUESTRO BACK):

colocados sobre la carpeta api:

docker-compose down
docker-compose build
docker-compose up -d


con la aplicación MongoDB Compass --> puedes visualizar bases de datos.


## Correcciones: 
-la funcion isChecked debiera estar declarada antes de llamarla.
-Se podría optimizar el código de las diferentes llamadas porque prácticamente cambia solo el objeto del json.
-en los if, la primera condición debiera ser la que se va a ser la más común que suceda.
-en la parte _back_ los delete se pueden concentrar en uno solo con el mismo endpoint y poniendo dentro un condicional:
    -si viene con id entras aquí
    -si no viene con id entras en este otro lado.

## Para pubicar:
HEROKU _ servidor gratuito de node.js  Lo que tu subes ahí te da una url. 

Subes tu base de datos a heroku y tu index.js a heroku y estás en producción.

Con githubpages lo puedes subir (html css js etc) y haces las llamadas a la api que subes a heroku

con FIREBASE podrías pero sólamente tendrías la base de datos. Te provee una api para llamar a los endpoints. 

