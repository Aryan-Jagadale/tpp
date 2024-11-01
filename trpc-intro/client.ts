import {
  createTRPCClient,
  splitLink,
  unstable_httpBatchStreamLink,
  unstable_httpSubscriptionLink,
} from "@trpc/client";

import type { AppRouter } from "./index.ts";

// Initialize the tRPC client
const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: unstable_httpSubscriptionLink({
        url: "http://localhost:3000",
      }),
      false: unstable_httpBatchStreamLink({
        url: "http://localhost:3000",
      }),
    }),
  ],
});

async function main() {
  // Call procedure functions

  // 💡 Tip, try to:
  // - hover any types below to see the inferred types
  // - Cmd/Ctrl+click on any function to jump to the definition
  // - Rename any variable and see it reflected across both frontend and backend

  const users = await trpc.userList.query();
  //    ^?
  console.log("Users:", users);

  const createdUser = await trpc.userCreate.mutate({ name: "sachinraja" });
  //    ^?
  console.log("Created user:", createdUser);
}

void main();
