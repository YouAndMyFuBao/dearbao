import { useEffect } from "react";
import { useRouter } from "next/router";

const Sending = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div>
      <main>
        <strong>편지 전달 중...</strong>
        <div>푸바오 이미지</div>
      </main>
    </div>
  );
};

export default Sending;
