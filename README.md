# Development
Steps to get up the app in development

1. Init Database
```
docker comp ose up -d
```
2. Creaty a copy of .env.template and rename it to .env
3. Replace env
4. Execute ```pnpm install```
5. Execute ```pnpm run dev```
6. Execute ```pnpx prisma migrate dev``` and ```pnpx prisma generate```
7. Execute seed to [create local database](localhost:3000/api/seed) in postman

# Nota: Cuenta por defecto
__usuario:__ test1@google.com
__password:__ 123456


* Prisma commands
```
pnpx prisma init
pnpx prisma migrate dev
pnpx prisma generate
```