// pages/_app.tsx

import "@/styles/globals.css"; // IMPORTANT
import { AuthProvider } from "../context/authcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}