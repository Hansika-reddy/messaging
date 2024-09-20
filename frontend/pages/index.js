import { useRouter } from 'next/router';
import Image from 'next/image'; // Import Next.js Image component
import styles from '../styles/Home.module.css';
import backgroundImage from '../public/homeimage.jpg'; // Import your image

export default function Home() {
  const router = useRouter();

  const handleRegister = () => {
    router.push('/register');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image 
          src={backgroundImage} 
          alt="Background Image" 
          layout="fill" 
          objectFit="cover"
          priority
        />
      </div>
      <header className={styles.header}>
        <h1 className={styles.title}>Hello, Great Day Ahead!</h1>
        <p className={styles.subtitle}>Welcome to the ultimate messaging service. Connect with friends, family, and colleagues with ease.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input type="text" id="username" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" id="password" className={styles.input} required />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.linkText}>
          Are you a new user? <a onClick={handleRegister} className={styles.link}>Click here to register</a>
        </p>
      </header>
    </div>
  );
}
