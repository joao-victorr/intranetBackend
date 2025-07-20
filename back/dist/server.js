"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/Domain/Errors/AppErrors.ts
var AppError = class _AppError extends Error {
  statusCode;
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
    Object.setPrototypeOf(this, _AppError.prototype);
  }
};
var BadRequestError = class _BadRequestError extends AppError {
  // Nome corrigido
  constructor(message) {
    super(400, message);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, _BadRequestError.prototype);
  }
};
var UnauthorizedError = class _UnauthorizedError extends AppError {
  // Nome corrigido
  constructor(message) {
    super(401, message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, _UnauthorizedError.prototype);
  }
};

// src/Infrastructure/Auth/JWT.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var secret = process.env.JWT_SECRET || "dev-secret";
function signToken(payload, expiresIn) {
  return import_jsonwebtoken.default.sign(payload, secret, {
    expiresIn: expiresIn ?? "30m"
  });
}
function verifyToken(token) {
  return import_jsonwebtoken.default.verify(token, secret);
}

// src/Infrastructure/Databases/Prisma/PrismaClient.ts
var import_client = require("@prisma/client");
var repo = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? [
    // { emit: 'stdout', level: 'query' },
    // { emit: 'stdout', level: 'info' },
    // { emit: 'stdout', level: 'warn' },
    { emit: "stdout", level: "error" }
  ] : [{ emit: "stdout", level: "error" }]
});

// src/Infrastructure/Security/EncryptionUtilit.ts
var bcrypt = __toESM(require("bcrypt"));
var SALT_ROUNDS = 10;
async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}
async function comparePassword(password, hash2) {
  return bcrypt.compare(password, hash2);
}

// src/Aplications/Services/Auth/LoginService.ts
var import_zod = require("zod");
var AuthRequestSchema = import_zod.z.object({
  username: import_zod.z.string(),
  password: import_zod.z.string()
});
var LoginService = class {
  async execute({ username, password }) {
    const user = await repo.user.findFirst({
      where: {
        username
      }
    });
    if (!user) {
      const mensageError = "Invalid username or password";
      throw new UnauthorizedError(mensageError);
    }
    const verifyPassWord = await comparePassword(password, user.password);
    if (!verifyPassWord) {
      const mensageError = "Invalid username or password";
      throw new UnauthorizedError(mensageError);
    }
    const token = signToken({ sub: user.id });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        birthDate: user.birthDate
      }
    };
  }
};

// src/Aplications/Controller/Auth/LoginController.ts
var LoginController = class {
  async handle(request, reply) {
    const { username, password } = request.body;
    const service = new LoginService();
    const auth = await service.execute({ username, password });
    return reply.code(200).send(auth);
  }
};

// src/DTOs/Auth/LoginDTO.ts
var import_zod2 = __toESM(require("zod"));
var LoginRequestSchema = import_zod2.default.object({
  username: import_zod2.default.string(),
  password: import_zod2.default.string()
});
var LoginReplySchema = import_zod2.default.object({
  token: import_zod2.default.string(),
  user: import_zod2.default.object({
    id: import_zod2.default.string().uuid(),
    name: import_zod2.default.string(),
    username: import_zod2.default.string()
  })
});

// src/DTOs/Global/ErrorsDTO.ts
var import_zod3 = require("zod");
var ErrorResponseSchema = import_zod3.z.object({
  statusCode: import_zod3.z.number().int(),
  error: import_zod3.z.string(),
  // Deve ser exatamente o nome da classe do erro, mas deixamos flexível
  message: import_zod3.z.string()
});
var BadRequestSchema = ErrorResponseSchema.extend({
  statusCode: import_zod3.z.literal(400),
  error: import_zod3.z.literal("BadRequestError")
});
var NotFoundSchema = ErrorResponseSchema.extend({
  statusCode: import_zod3.z.literal(404),
  error: import_zod3.z.literal("NotFoundError")
});
var UnauthorizedSchema = ErrorResponseSchema.extend({
  statusCode: import_zod3.z.literal(401),
  error: import_zod3.z.literal("UnauthorizedError")
});
var ForbiddenSchema = ErrorResponseSchema.extend({
  statusCode: import_zod3.z.literal(403),
  error: import_zod3.z.literal("ForbiddenError")
});

// src/Aplications/Routes/AuthRoutes.ts
var loginController = new LoginController();
var AuthRoutes = async (server2) => {
  server2.post(
    "/login",
    {
      schema: {
        tags: ["Auth"],
        operationId: "Auth.login",
        summary: "User login",
        description: "Authenticate user with username and password. Returns JWT token on success.",
        body: LoginRequestSchema,
        response: {
          200: LoginReplySchema,
          401: UnauthorizedSchema
        }
      }
    },
    loginController.handle
  );
};

// src/Infrastructure/Security/EnsureAutenticated.ts
async function EnsureAuthenticated(req, _reply) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedError("Cabe\xE7alho Authorization faltando");
  }
  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Formato de autoriza\xE7\xE3o inv\xE1lido. Esperado 'Bearer <token>'.");
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("Token faltando");
  }
  const payload = verifyToken(token);
  req.user = { id: String(payload.sub) };
}

// src/Aplications/Services/Users/GetUserByIdService.ts
var GetUserByIdService = class {
  async execute({ id }) {
    const user = await repo.user.findUnique({
      where: {
        id
      },
      omit: {
        password: true
      }
    });
    if (!user) {
      throw new BadRequestError("UserId not found");
    }
    return user;
  }
};

// src/Aplications/Controller/Users/CreateUserByIdController.ts
var CreateUserByIdController = class {
  async handle(request, _reply) {
    const { id } = request.params;
    const service = new GetUserByIdService();
    const user = await service.execute({ id });
    return user;
  }
};

// src/Aplications/Services/Users/CreateUserService.ts
var CreateUserService = class {
  async execut(user) {
    const verifyExistUser = await repo.user.findUnique({
      where: {
        username: user.username
      }
    });
    if (verifyExistUser) {
      const mesageError = "User already exists";
      throw new BadRequestError(mesageError);
    }
    const passwordhash = await hashPassword(user.password);
    const newUser = await repo.user.create({
      data: {
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: passwordhash,
        birthDate: user.birthDate
      },
      omit: {
        password: true
      }
    });
    return { id: newUser.id };
  }
};

// src/Aplications/Controller/Users/CreateUserController.ts
var CreateUserController = class {
  async handle(request, reply) {
    const user = request.body;
    const service = new CreateUserService();
    const { id } = await service.execut(user);
    return reply.code(201).send({ id });
  }
};

// src/Aplications/Services/Users/GetUsersService.ts
var GetUsersService = class {
  async execute() {
    const users = await repo.user.findMany({
      omit: {
        password: true
      }
    });
    return users;
  }
};

// src/Aplications/Controller/Users/GetUserController.ts
var GetUserController = class {
  async handle(_request, reply) {
    const service = new GetUsersService();
    const users = await service.execute();
    return reply.code(200).send(users);
  }
};

// src/Domain/Validators/BirthDate.ts
var import_zod4 = require("zod");
function parseBirthDate() {
  const minAge = 14;
  return import_zod4.z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) {
        const date = new Date(val);
        if (Number.isNaN(date.getTime())) {
          return import_zod4.z.NEVER;
        }
        return date;
      }
      return import_zod4.z.NEVER;
    },
    import_zod4.z.date().refine((date) => date < /* @__PURE__ */ new Date(), {
      message: "A data de nascimento n\xE3o pode estar no futuro"
    }).refine((date) => {
      const today = /* @__PURE__ */ new Date();
      const minBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      return date <= minBirthDate;
    }, {
      message: `\xC9 necess\xE1rio ter pelo menos ${minAge} anos`
    })
  );
}

// src/DTOs/Users/CreateUserDTO.ts
var import_zod5 = require("zod");
var CreateUserRequestSchema = import_zod5.z.object({
  name: import_zod5.z.string(),
  surname: import_zod5.z.string(),
  username: import_zod5.z.string(),
  password: import_zod5.z.string(),
  birthDate: parseBirthDate()
});
var CreateUserReplySchema = import_zod5.z.object({
  id: import_zod5.z.string().uuid()
});

// src/DTOs/Users/GetUserByIdDTO.ts
var import_zod6 = require("zod");
var GetUserByIdRequestSchema = import_zod6.z.object({
  id: import_zod6.z.string()
});
var GetUserByIdReplySchama = import_zod6.z.object({
  id: import_zod6.z.string().uuid(),
  name: import_zod6.z.string(),
  surname: import_zod6.z.string(),
  username: import_zod6.z.string(),
  birthDate: parseBirthDate()
});

// src/DTOs/Users/GetUsersDTO.ts
var import_zod7 = require("zod");
var GetUsersReplySchema = import_zod7.z.array(import_zod7.z.object({
  id: import_zod7.z.string().uuid(),
  name: import_zod7.z.string(),
  surname: import_zod7.z.string(),
  username: import_zod7.z.string(),
  birthDate: parseBirthDate()
}));

// src/Aplications/Routes/UsersRoutes.ts
var createUserController = new CreateUserController();
var createUserByIdController = new CreateUserByIdController();
var getUserController = new GetUserController();
var UsersRoutes = async (server2) => {
  server2.post(
    "/",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Create.User",
        summary: "Create User",
        description: "Create User",
        security: [{
          bearerAuth: []
        }],
        body: CreateUserRequestSchema,
        response: {
          200: CreateUserReplySchema,
          400: BadRequestSchema,
          401: UnauthorizedSchema
        }
      }
    },
    createUserController.handle
  );
  server2.get(
    "/",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Get.User.By.Id",
        summary: "Get user by ID",
        description: "Get user by ID",
        security: [{
          bearerAuth: []
        }],
        response: {
          200: GetUsersReplySchema,
          401: UnauthorizedSchema
        }
      }
    },
    getUserController.handle
  );
  server2.get(
    "/:id",
    {
      preHandler: EnsureAuthenticated,
      schema: {
        tags: ["User"],
        operationId: "Get.User.By.Id",
        summary: "Get user by ID",
        description: "Get user by ID",
        security: [{
          bearerAuth: []
        }],
        params: GetUserByIdRequestSchema,
        response: {
          200: GetUserByIdReplySchama,
          401: UnauthorizedSchema
        }
      }
    },
    createUserByIdController.handle
  );
};

// src/Routes.ts
var Routes = async (server2) => {
  await server2.register(AuthRoutes, { prefix: "/auth" });
  await server2.register(UsersRoutes, { prefix: "/users" });
};

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var import_swagger = __toESM(require("@fastify/swagger"));
var import_swagger_ui = __toESM(require("@fastify/swagger-ui"));
var import_fastify = require("fastify");
var import_fastify_type_provider_zod = require("fastify-type-provider-zod");

// src/Domain/Errors/ErrorsHandler.ts
var ErrorsHandler = (error, request, reply) => {
  const logger = request.server.log;
  if (error instanceof AppError) {
    logger.error(`AppError [${error.statusCode}]: ${error.message}`);
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.name,
      message: error.message
    });
  } else {
    logger.error(`Erro inesperado: ${error.message}`, error);
    reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Ocorreu um erro interno no servidor."
    });
  }
};

// src/server.ts
var _PORT = 3e3;
var isProd = process.env.NODE_ENV === "production";
var server = (0, import_fastify.fastify)({ logger: {
  level: "error",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname"
    }
  }
} }).withTypeProvider();
server.setSerializerCompiler(import_fastify_type_provider_zod.serializerCompiler);
server.setValidatorCompiler(import_fastify_type_provider_zod.validatorCompiler);
server.register(import_swagger.default, {
  openapi: {
    info: {
      title: "Fastify Zod Example",
      description: "API Intranet Perdomo Doces",
      version: "0.1"
    },
    servers: isProd ? [
      {
        url: "https://souperdomo.perdomodoces.com.br",
        description: "Desenvolvimento"
      }
    ] : [
      {
        url: "http://0.0.0.0:3000",
        description: "Desenvolvimento"
      }
    ],
    components: {
      securitySchemes: {
        // Exemplo de esquema para Bearer Token (o mais comum para JWT)
        bearerAuth: {
          // <-- Este é o nome que você usará no 'security' das rotas
          type: "http",
          scheme: "Bearer",
          bearerFormat: "JWT",
          // Opcional, mas útil para documentação
          description: 'Autentica\xE7\xE3o com token JWT. Cole o token completo aqui (ex: "Bearer SEU_TOKEN_AQUI")'
        }
      }
    }
  },
  transform: import_fastify_type_provider_zod.jsonSchemaTransform
});
server.register(import_swagger_ui.default, {
  routePrefix: "/docs"
});
server.register(import_cors.default, {
  origin: "*"
});
server.setErrorHandler(ErrorsHandler);
Routes(server);
server.listen({ port: _PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
//# sourceMappingURL=server.js.map