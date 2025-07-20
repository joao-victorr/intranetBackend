# --- Estágio de Build ---
  FROM node:lts-alpine AS builder

  WORKDIR /back
  
  # Copia os arquivos do package primeiro para aproveitar o cache do Docker
  COPY package.json package-lock.json ./
  
  # Instala as dependências (npm ci é preferível para CI/CD e builds reproduzíveis)
  RUN npm ci
  
  # Copia o restante do código da aplicação
  COPY . .
  
  # Se estiver usando Prisma, gere o cliente
  RUN npm run generate
  
  # Constrói a aplicação
  # Certifique-se de ter um script "build" no seu package.json, ex: "build": "tsc"
  RUN npm run build
  
  # --- Estágio de Produção ---
  FROM node:lts-alpine
  
  WORKDIR /back
  
  # Define o ambiente do Node.js como produção para otimizações
  # ENV NODE_ENV=production
  
  # Copia apenas os arquivos necessários do estágio de build
  COPY --from=builder /back/dist ./dist
  COPY --from=builder /back/package.json ./package.json
  COPY --from=builder /back/package-lock.json ./package-lock.json
  COPY --from=builder /back/prisma ./prisma
  
  # Instala apenas as dependências de produção
  RUN npm install --omit=dev
  
  EXPOSE 3000
  
  # Executa sua aplicação em modo de produção
  # Certifique-se de ter um script "prod" no seu package.json, ex: "prod": "node dist/index.js"
  CMD ["npm", "run", "prod"]