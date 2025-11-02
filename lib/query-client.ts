// /lib/queryClient.ts
"use client";

import { QueryClient } from "@tanstack/react-query";
// lib/queryClient.ts
// import { QueryClient } from "@tanstack/react-query";
// import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'



export const adminQueryClient = new QueryClient();



export const userQueryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 0, // trust data for 5 min
  //     // staleTime: 1000 * 60 * 5, // trust data for 5 min
  //     gcTime: 1000 * 60 * 60,   // keep cached data for 1 hr if unused
  //     retry: 1,
  //   },
  // },  
});

if (typeof window !== "undefined") {
  const localStoragePersister = createAsyncStoragePersister({
    storage: window.sessionStorage,
  });

  // persistQueryClient({
  //   queryClient,
  //   persister: localStoragePersister,
  // });
}
