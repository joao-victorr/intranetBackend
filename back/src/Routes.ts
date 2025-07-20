
import type { FastifyTypedInstance } from "@Types/Fastify";
import { AuthRoutes } from "Aplications/Routes/AuthRoutes";
import { UsersRoutes } from "Aplications/Routes/UsersRoutes";



export const Routes = async (server: FastifyTypedInstance) => {
 await server.register(AuthRoutes, { prefix: "/auth" });
 await server.register(UsersRoutes, { prefix: "/users" });


}