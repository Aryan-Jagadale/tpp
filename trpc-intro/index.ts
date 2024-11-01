import { router, publicProcedure } from "./trpc.ts";
import fs from "fs/promises";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const appRouter = router({
  userList: publicProcedure.query(async () => {
    try {
      // Read data from JSON file
      const data = await fs.readFile("users.json", "utf-8");
      const users = JSON.parse(data);
      return users;
    } catch (error) {
      console.error("Error reading users:", error);
      return [];
    }
  }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      try {
        // Read existing users
        const data = await fs.readFile("users.json", "utf-8");
        const users = JSON.parse(data);

        // Create new user with unique id (assuming users have an id property)
        const newUser = { id: Date.now(), ...input };
        users.push(newUser);

        // Write updated users back to JSON file
        await fs.writeFile("users.json", JSON.stringify(users, null, 2), "utf-8");

        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user");
      }
    }),
});
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  async createContext() {
    return {};
  },
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");

});
