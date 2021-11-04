# baixa a versão mais recente
FROM node
# pasta que terá os arquivos repassados para o container
WORKDIR /usr/app
# copia o arquivo para dentro do container
COPY package*.json ./
# da o comando de instalação dos pacotes
RUN npm install
# copia todos os arquivos para a pasta do workdir
COPY . .
# expõe a porta 3333
EXPOSE 3333
# executa o comando para levantar a aplicação
CMD [ "npm", "run", "dev" ]