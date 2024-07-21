
# Proyecto Final Ecommerce-Backend

## Recursos para probar APIS
//Postman.json
Dentro del directorio raiz del proyecyo encuentra un archivo Postman.json dentro del este estan todos los endpoint con los ejemplos para utilizar con POSTMAN.

## Detalles 
   **Base de datos: MongoDB MONGO ATLAS**
    **Seguridad: Passport y JWT, bcrypt**
    **Documentacion: Swager**
    **Pasarela de Pago: Stripe**
    **Testing: Chai, Mocha, artillery y SuperTest** 
    **Envio de emails: NodeMailer**
    **Logger: Winston**
    **Otras: moment, multer, nodemon**

## Deploy:
URL BASE BACKEND: https://ecommerce-fullbackend-production.up.railway.app

EL FRONTEND LO TENGO EN DESARROLLO AUN PERO SE PUEDEN PROBAR TODAS LAS FUNCIONALIDADES DEL BACKEND MENOS Cargar docuementos pdf del usuario(aun me falta hacer esa parte en el front), algunas paginas aun no tiene un estilo css lindo pero 
por los tiempos preferi darle al backend para que quede funcionando. 
URL BASE FRONTEND: https://frontend-ecommerce-production.up.railway.app

## Requerimientos obligatiorios VARIABLES DE ENTORNO
SERVER_PORT={port}
MONGO_URL={URL MONGO SERVER}
GMAIL_ACCOUNT={email}
GMAIL_APP_PASSWD={key app gmail }
STRIPE_APP_SECRET_KEY={STRIPE KEY BACKEND}

## Funcionalidades:

### Usuarios:
1. Registrar Usuarios
2. Actualizar Datos de Usuarios
3. Obtener usuarios por ID
4. Obtener usuarios por Email
5. Carga de documentos(PDF o imagenes) de usuarios.
6. Actualizar a premium un usuario
7. Recuperacion de contraseña
8. Login
9. LogOut
   
### Carrito de compras:
1. Agregar Productos.
2. Eliminar Productos.
3. Eliminar una cantidad de un producto
4. Pre Compra de un producto(generacion de orden de compra)
5. Compra de producto(con actualizacion de stock y pasarela de pago Stripe)
6. Obtener carrito de usuario por Id de usuario

### Ordenes
1. Crear orden de compra
2. editar Orden de compra
3. Cambiar estado de pago de una orden de compra
4. Cambiar Estado de envio de una orden de compra
5. Editar direccion de una orden de compra
6. Obtener ordenes de compra por Id

### Preguntas y respuestas
1. Hacer preguntas a un vendedor sobre el producto
2. Obtener todas las preguntas sobre un producto para mostrar en los detalles del producto.

### Direcciones:
1. Agregar direcciones de envio
2. Editar direcciones de envio
3. Obtener direcciones por UserId
4. obtener direcciones por AddressId


### Productos
 1. Agregar un producto
 2. Editar un producto
 3. Eliminar un producto
 4. Preguntar por un producto
 5. Valorar un producto(Solo despues de haber comprado el producto)
 6. Agregar un producto a favoritos(solo desde Backend aun o lo tengo implementado en el front)

## Documentacion con Swager

**ENDPOINT** /apidocs
 1. Documentacion para usuario
 2. Documentacion para el carrito de compras
 3. Documentacion para Productos


## Testings

1. Testing Unitario para carritos de compras y sus opciones
2. Testing Unitario para las funcionalidades de usuarios
3. Testing Unitarios para las funcionaliades de Productos
4. Testing de integracion para registro y logeo de usuario


### FUNCIONALIDADES DESHABILITADAS POR PROBLEMAS CON DEPLOY EN RAILWAY

DOCKER
CLUSTER PARA OCUPAR TODOS LOS PROCESADORES DEL SERVIDOR