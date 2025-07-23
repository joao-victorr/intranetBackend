
import { AuthRoutes } from "./Aplications/Routes/AuthRoutes";
import { UsersRoutes } from "./Aplications/Routes/UsersRoutes";
import type { FastifyTypedInstance } from "./Types/Fastify";



export const MainRoutes = async (server: FastifyTypedInstance) => {
 await server.register(AuthRoutes, { prefix: "/api/auth" });
 await server.register(UsersRoutes, { prefix: "/api/users" });


}