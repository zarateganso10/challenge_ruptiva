# challenge_ruptiva

# Requisitos do sistema

-docker e docker-compose
-node versao 12.18.4 ou superior
-gerenciador de pacotes do node Yarn ou Npm


# Como Iniciar o Projeto

## Inicializando API

- Primeiro voce deve inicializar a api entrando na pasta "/backend"
- Utilize o comando "yarn" ou "npm install" para instalar todas as dependencias do projeto
- Depois suba o container do banco de dados com o comando "docker-compose up postgres"
- Com o container subido rode as migrations do banco de dados com o comando "yarn typeorm migration:run"
- Com o Banco de dados feito suba a api com o comando "yarn dev:server"

## Inicializando Frontend

- Estando na raiz do projeto entre na pasta "/web"
- Instale todas as dependencias com o comando "yarn" ou "npm install"
- suba o projeto com "yarn start"
- O site vai estar na porta 3000







