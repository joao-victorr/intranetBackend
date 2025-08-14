import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { ErrorsHandler } from "./Domain/Errors/ErrorsHandler";
import { EnvConfig } from "./Infrastructure/Config/envConfig";
import { MainRoutes } from "./MainRoutes";


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

// Swagger e Swagger UI SÓ em dev
if (!isProd) {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Perdomo Doces Intranet API",
        description: "API interna para gerenciamento de usuários, conteúdos e operações da intranet da Perdomo Doces.",
        version: "1.0",
      },
      servers: [
        {
          url: EnvConfig.URL,
          description: EnvConfig.NODE_ENV,
        },
        {
          url: `http://localhost:${_PORT}`,
          description: "Local Development Server",
        },

      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "Bearer",
            bearerFormat: "JWT",
            description:
              'Autenticação com token JWT. Ex: "Bearer SEU_TOKEN_AQUI"',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/api/docs",
  });
}

server.register(fastifyCors, {
  origin: isProd ? EnvConfig.URL : '*'
})

server.setErrorHandler(ErrorsHandler);

MainRoutes(server);


server.listen({ port: _PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
})











