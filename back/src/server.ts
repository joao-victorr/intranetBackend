import { EnvConfig } from "@Infrastructure/Config/envConfig";
import { Routes } from "Routes";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { ErrorsHandler } from "./Domain/Errors/ErrorsHandler";


const _PORT = 3000;
const isProd = EnvConfig.NODE_ENV === "production";


const server = fastify({ logger: {
  level: 'error',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
}}).withTypeProvider<ZodTypeProvider>();

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify Zod Example",
      description: "API Intranet Perdomo Doces",
      version: '0.1',
    },
    servers: isProd ?
    [
      {
        url: "https://souperdomo.perdomodoces.com.br",
        description: "Desenvolvimento"
      }
    ] :
    [
      {
        url: "http://0.0.0.0:3000",
        description: "Desenvolvimento"
      },
      {
        url: "https://0.0.0.0:3000",
        description: "Desenvolvimento"
      }
    ],
    components: {
      securitySchemes: {
        // Exemplo de esquema para Bearer Token (o mais comum para JWT)
        bearerAuth: { // <-- Este é o nome que você usará no 'security' das rotas
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT', // Opcional, mas útil para documentação
          description: 'Autenticação com token JWT. Cole o token completo aqui (ex: "Bearer SEU_TOKEN_AQUI")',
        }
      }
    },
  },
  transform: jsonSchemaTransform
})

server.register(fastifySwaggerUi, {
  routePrefix: "/api/docs"
})

server.register(fastifyCors, {
  origin: "*"
})

server.setErrorHandler(ErrorsHandler);

Routes(server);


server.listen({ port: _PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
})











