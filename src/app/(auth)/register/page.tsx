import { registerUser } from "@/modules/auth/actions/register.action";

export default function RegisterPage() {
  async function register(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await registerUser(name, email, password);
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>

      <form action={register} className="flex flex-col gap-4">
        <input name="name" placeholder="Name" required className="border p-2" />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border p-2"
        />

        <button className="bg-black text-white p-2">Register</button>
      </form>
    </div>
  );
}
