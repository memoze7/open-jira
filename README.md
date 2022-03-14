# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

* El -d, significa __detached__

MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

* Reconstruir módulos de node

```
npm run dev
```

## Configurar las variables de entorno

Renonbrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con información de pruebas

LLamara:

```
http://localhost:3000/api/seed
```
