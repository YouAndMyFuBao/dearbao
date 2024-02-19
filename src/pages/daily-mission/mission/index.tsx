import { useRouter } from "next/router";

const Excution = () => {
  const router = useRouter();

  return (
    <div>
      <header>뒤로가기</header>
      <main>
        <div>
          <div>데일리 미션 내용</div>
          <div>
            <div>
              <textarea></textarea>
              <p>From. 00000 이모</p>
            </div>
            <p>0/400</p>
          </div>
          <button onClick={() => router.push("/home")}>편지 보내기</button>
        </div>
      </main>
    </div>
  );
};

export default Excution;
