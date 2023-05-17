import "@/styles/globals.css";
import { AuthProvider } from "@/context/user.context";
import { BookProvider } from "@/context/book.context";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </AuthProvider>
  );
}
