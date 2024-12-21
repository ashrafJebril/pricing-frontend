import { mockApi } from "../mockApi";
import { User } from "../../types/user";

export const authApi = {
  async login(email: string, password: string): Promise<User> {
    // Use mock API for now
    return { email, id: "1", role: "admin" };
  },

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
};
