"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";

import animationData_1 from "./loading_2.json";
import TestPreview from "../../components/TestPreview";
import Footer from "../../components/Footer";
import styles from "./index.module.css";
import { DOMAIN_BE_PROD, DOMAIN_BE_DEV } from "../../constants/constant";
import { getHeaders } from "@/utils/util";

export default function RandomTest() {
  const [thumbnailStr, setThumbnailStr] = useState("");
  const [playCnt, setPlayCnt] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnailUri, setThumbnailUri] = useState("");
  const [testId, setTestId] = useState("");
  const router = useRouter();
  const containerRef_1 = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef_1.current,
      renderer: "svg",
      animationData: animationData_1,
      loop: true,
      autoplay: true,
    });

    const headers = getHeaders();
    axios
      .get(`${DOMAIN_BE_PROD}/api/v1/tests/random`, { headers })
      .then((res) => {
        setThumbnailStr(res.data.title);
        setPlayCnt(res.data.playCount);
        setDescription(res.data.content);
        setThumbnailUri(res.data.imageUrl);
        setTestId(res.data.id);
      })
      .catch((err) => {
        alert(err.response.data);
        router.push("/login");
      });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className={styles.wrap}>
      {description ? (
        <TestPreview
          testId={testId}
          thumbnailStr={thumbnailStr}
          playCnt={playCnt}
          description={description}
          thumbnailUri={thumbnailUri}
        />
      ) : (
        <div className={styles.loadImgWrap_1}>
          <div ref={containerRef_1}></div>
        </div>
      )}
      <Footer />
    </div>
  );
}
