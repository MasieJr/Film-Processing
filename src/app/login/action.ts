"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ADDED: prevState as the first argument!
export async function authenticateAdmin(prevState: { error: string }, formData: FormData) {
  const password = formData.get("password");
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const cookieStore = await cookies();
    
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 24 * 365, 
      path: "/",
    });

    redirect("/admin");
  }

  // If password fails, return the error string back to the form state
  return { error: "Incorrect Lab Password" };
}