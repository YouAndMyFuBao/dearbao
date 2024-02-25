import { useState } from "react";
import { postMission } from "@/pages/api/postMission";
import { useRouter } from "next/router";

const Excution = () => {
  const router = useRouter();
  const [missionText, setMissionText] = useState<string>("");

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
          <div>데일리 미션 내용</div>
          <div>
            <div>
              <textarea
                value={missionText}
                onChange={handleTextareaChange}
              ></textarea>
              <p>From. 00000 이모</p>
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
