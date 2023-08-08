import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.company}>CASH BUDDY</p>
      <p>© 2023 Grace Sio.</p>
    </div>
  );
}

export default Footer;
