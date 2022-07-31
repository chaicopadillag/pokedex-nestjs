# Pokemon API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## Stack Usado

- Node.js
- NestJS
- MongoDB

## Requisitos

```
npm i -g @nestjs/cli
```

## Instalacion

```
 yarn
```

## Crear en archivo de configuracion **.env**

```
 cp .env.example .env && cp .env.example .env.prod
```

## Docker Base de Datos

```
 docker-compose up -d
```

## Correr el Servidor

```
 yarn dev
```

## Correr el Servidor Prod

```
 docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build ó docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
