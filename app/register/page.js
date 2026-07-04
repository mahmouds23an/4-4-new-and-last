import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Create Account | 4x4 Center",
  description:
    "Create your 4x4 Center account to shop faster, track orders and manage your wishlist.",
  robots: {
    index: false,
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
