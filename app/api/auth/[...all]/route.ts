import { toNextJsHandler } from "better-auth/next-js";

async function handle(method: "GET" | "POST", request: Request) {
  try {
    const { auth } = await import("@/lib/auth");
    return await toNextJsHandler(auth)[method](request);
  } catch (error) {
    console.error(error);
    const reason = error instanceof Error ? error.message : "";
    const message =
      process.env.NODE_ENV === "production"
        ? "সার্ভারে সমস্যা হয়েছে, ডাটাবেস যাচাই করুন"
        : `সার্ভারে সমস্যা হয়েছে: ${reason}`;
    return Response.json({ message }, { status: 500 });
  }
}

export function GET(request: Request) {
  return handle("GET", request);
}

export function POST(request: Request) {
  return handle("POST", request);
}
