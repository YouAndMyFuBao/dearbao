import { useState } from "react";
import { getDailyMission } from "@/pages/api/getDailyMission";
import { postMission } from "@/pages/api/postMission";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Excution = () => {
  const router = useRouter();
  const [missionText, setMissionText] = useState<string>("");
  const nicknameFromQuery = router.query.nickname;

  const { data: dailyMissionData } = useQuery({
    queryKey: ["getDailyMission"],
    queryFn: () => getDailyMission(),
  });

  const dailyMissionContent = dailyMissionData?.data.content;

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value;
    if (textareaValue.length > 400) {
      return;
    }

    setMissionText(textareaValue);
  };

  const handlePostMission = () => {
    postMission(missionText);
    window.alert("데일리 미션 제출 완료하였습니다");
    router.push("/home");
  };

  return (
    <div>
      <header>
        <button onClick={() => router.back()}>뒤로가기</button>
      </header>
      <main>
        <div>
          <div>{dailyMissionContent}</div>
          <div>
            <div>
              <textarea
                value={missionText}
                onChange={handleTextareaChange}
              ></textarea>
              <p>From. {nicknameFromQuery} 이모</p>
            </div>
            <p>{missionText.length}/400</p>
          </div>
          <button onClick={handlePostMission} disabled={!missionText}>
            편지 보내기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Excution;
