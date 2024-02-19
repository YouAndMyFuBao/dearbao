import { useRouter } from "next/router";

const Intro = () => {
  const router = useRouter();

  return (
    <div>
      <header>OOOOO 임오</header>
      <main>
        <button onClick={() => router.push("/daily-mission/mission")}>
          쪽지이미지 여기를 클릭하세요
        </button>
      </main>
    </div>
  );
};

export default Intro;
