import { useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./index.module.css";
import Footer from "@/components/Footer";
import TestAdd from "@/components/TestAdd";

import { decodeToken } from "@/utils/util";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    if (decodeToken().role !== "ROLE_ADMIN") return router.push("/main");
  }, []);
  return (
    <div className={styles.wrap}>
      <TestAdd />
      <div className={`${styles.bgWhite} ${styles.footerWrap}`}>
        <Footer />
      </div>
    </div>
  );
}
