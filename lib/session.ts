import { headers } from "next/headers";

export async function getSession() {
  try {
    const { auth } = await import("./auth");
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}
