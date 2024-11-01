"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
