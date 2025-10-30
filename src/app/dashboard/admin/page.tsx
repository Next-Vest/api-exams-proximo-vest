"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [can, setCan] = useState(false);

  useEffect(() => {
    const result = authClient.admin.checkRolePermission({
      role: "user",
      permissions: { exam: ["publish"] },
    });
    setCan(result);
  }, []);

  if (!can) {
    return <p>Você não tem acesso a esta página.</p>;
  }

  return <p>Bem-vindo, Admin!</p>;
}
