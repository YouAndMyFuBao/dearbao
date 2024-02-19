import { useRouter } from "next/router";

const CompleteInquire = () => {
  const router = useRouter();
  return (
    <>
      <header>
        <button onClick={() => router.push('/home')}>x</button>
      </header>
      <p>문의가 완료되었습니다.</p>
    </>
  );
};

export default CompleteInquire;
