import { Routes } from "Routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { ErrorsHandler } from "./Domain/Errors/ErrorsHandler";


const _PORT = process.env.PORT ?? 3000;
const isProd = process.env.NODE_ENV === 'production';


const server = fastify({ logger: {
  level: 'error',
  transport: {
    target: 'pino-pretty',
    options: {
      colarize: true,
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
        url: "https://localhost:3000",
        description: "Desenvolvimento"
      }
    ] :
    [
      {
        url: "https://localhost:3000",
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
  routePrefix: "/docs"
})


server.setErrorHandler(ErrorsHandler);

Routes(server);


server.listen({ port: Number(_PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
})











