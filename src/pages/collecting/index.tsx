import { useRouter } from "next/router";
import Calendar from "./components/calendar";

const Collecting = () => {
  const router = useRouter();
  const collectingPageTitle = "푸바오와 나의 추억을 모아보세요!";

  return (
    <>
      <button onClick={() => router.push("/home")}>back</button>
      <body>
        <h1>{collectingPageTitle}</h1>
        <Calendar />
      </body>
    </>
  );
};

export default Collecting;
