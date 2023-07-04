import Image from "next/image";
import styles from "./page.module.css";
import images from "./image.js";
import Gallery from "./pages/gallery/page";
import SignInForm from "./pages/signup/page";
import LoginForm from "./pages/login/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
    
  );
}
