import { redirect } from "react-router-dom";

let token = localStorage.getItem("token");
export function authLoader() {
  if (!token) {
    redirect("/login");
  }
  return null;
}
