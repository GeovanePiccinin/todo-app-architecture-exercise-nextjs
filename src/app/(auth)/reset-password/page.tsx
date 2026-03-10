export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Recover password</h1>

      <form className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="border p-2"
        />

        <button className="bg-black text-white p-2">Send recovery email</button>
      </form>
    </div>
  );
}
