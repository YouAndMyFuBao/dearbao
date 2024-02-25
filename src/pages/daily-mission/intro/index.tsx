import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Intro: React.FC<{ nickname: string }> = ({ nickname }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const router = useRouter();

  // 데일리미션 열린 페이지 <- 버튼 통해 들어왔을 경우 대비
  const nicknameFromQuery = router.query.nickname;

  const formattedNickname = nickname || nicknameFromQuery;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const currentHours = currentTime.getHours();
  const isTimerOpen = currentHours >= 9 && currentHours < 21;

  const closingTime = new Date(currentTime);
  closingTime.setHours(20, 59, 59);

  const restTimeUntilClosing = Math.max(
    closingTime.getTime() - currentTime.getTime()
  );

  const dailyMissionTimer = (time: number): string => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);

    const twoDigitHours = hours < 10 ? "0" + hours : hours;
    const twoDigitMinutes = minutes < 10 ? "0" + minutes : minutes;
    const twoDigitSeconds = seconds < 10 ? "0" + seconds : seconds;

    return `${twoDigitHours} : ${twoDigitMinutes} : ${twoDigitSeconds}`;
  };

  return (
    <div>
      <header>{formattedNickname} 임오</header>
      <main>
        {isTimerOpen ? (
          <>
            <strong>{dailyMissionTimer(restTimeUntilClosing)}</strong>
            <button
              onClick={() =>
                router.push({
                  pathname: "/daily-mission/mission",
                  query: {
                    nickname: formattedNickname,
                  },
                })
              }
            >
              쪽지이미지 여기를 클릭하세요
            </button>
          </>
        ) : (
          <div>내일을 이용해주세요</div>
        )}
      </main>
    </div>
  );
};

export default Intro;
