// Mock API responses
const mockUsers = [
  {
    id: "1",
    email: "admin@example.com",
    role: "admin",
  },
];

export const mockApi = {
  async login(email: string, password: string) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = mockUsers.find((u) => u.email === email);

    if (email === "ashraf@gmail.com" && password === "ashraf") {
      const token = "mock-jwt-token";
      localStorage.setItem("token", token);
      return user;
    }

    throw new Error("Invalid email or password");
  },
};
