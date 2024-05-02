export interface User {
  id: string;
  role: "admin" | "normal" | "resturator";
  username: string;
}
