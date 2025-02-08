# Development

1. Correr el proyecto de la máquina local
```
npm run start
```
2. Iniciar el ORM de Prisma para crear el schema de la bd.
```
npx prisma init
```

3. Renombrar .env-tamplate a .env

4. Reemplazar las variables user, password, location db por las credenciales propias dde su bd.

5. realizar la migracion
```
npx prisma migrate dev
```
6. Generar el cliente de Prisma. 
```
npx prisma generate
```
7. Ejecutar SEED para [Crear una base de datos de prueba](http//localhost:300/api/seed)
