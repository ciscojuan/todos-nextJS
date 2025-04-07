"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col justify-center">
      <h1>Profile Details</h1>
      <span>{session?.user?.name ?? 'No name'}</span>
      <span>{session?.user?.image ?? 'No image'}</span>
      <span>{session?.user?.email ?? ' No email'}</span>
    </div>
  );
}
