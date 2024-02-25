import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getMission } from "../api/getMission";
import Intro from "./intro";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const { data: missionData } = useQuery({
    queryKey: ["getMission"],
    queryFn: () => getMission(),
  });

  const nicknameFromApi = missionData?.data.nickname || "";

  useEffect(() => {
    const currentTime = new Date();
    const openingTime = new Date(currentTime);
    const closingTime = new Date(currentTime);

    openingTime.setHours(9, 0, 0);
    closingTime.setHours(20, 59, 59);

    if (currentTime >= openingTime && currentTime <= closingTime) {
      setIsOpen(true);

      const timer = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= openingTime && currentTime <= closingTime) {
          setIsOpen(true);
          clearInterval(timer);
        }
      });
      return () => clearInterval(timer);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {isOpen ? (
        <Intro nickname={nicknameFromApi} />
      ) : (
        <div>오늘의 데일리 미션이 종료되었습니다</div>
      )}
      <button
        onClick={() =>
          router.push({
            pathname: "/daily-mission/intro",
            query: { nickname: nicknameFromApi },
          })
        }
      >
        데일리미션 열린 페이지
      </button>
    </>
  );
};

export default Index;
