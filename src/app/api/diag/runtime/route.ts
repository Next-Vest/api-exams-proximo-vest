// app/api/_diag/prisma-files/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const base = "/var/task/node_modules/.prisma/client";
  const files = [
    "libquery_engine-rhel-openssl-3.0.x.so.node",
    "schema.prisma",
    "index.js",
  ];
  const results = files.map((f) => {
    const p = path.join(base, f);
    return { file: f, exists: fs.existsSync(p), path: p };
  });
  return NextResponse.json({ base, results });
}
