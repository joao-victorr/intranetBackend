
import type { FastifyTypedInstance } from "@Types/Fastify";
import { AuthRoutes } from "Routes/AuthRoutes";



export const Routes = async (server: FastifyTypedInstance) => {
 await server.register(AuthRoutes, { prefix: "/auth" });


}