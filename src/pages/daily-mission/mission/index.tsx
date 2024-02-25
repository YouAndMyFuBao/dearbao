import { useState } from "react";
import { getDailyMission } from "@/pages/api/getDailyMission";
import { postMission } from "@/pages/api/postMission";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SlangList } from "./constant/slang-list";

const Excution = () => {
  const router = useRouter();
  const [missionText, setMissionText] = useState<string>("");
  const [isDailyMissionValid, setIsDailyMissionValid] = useState<boolean>(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [textErrorMessage, setErrorMessage] = useState<string>("");
  const nicknameFromQuery = router.query.nickname;

  const { data: dailyMissionData } = useQuery({
    queryKey: ["getDailyMission"],
    queryFn: () => getDailyMission(),
  });

  const { mutate: mutatePostDailyMission } = useMutation({
    mutationKey: ["postMission"],
    mutationFn: () => postMission(missionText),
    onSuccess: () => {
      window.alert("데일리 미션 제출이 완료되었습니다.");
      router.push("/daily-mission/sending");
    },
    onError: () => {
      const postDailyMissionResponse = window.confirm(
        "이미 수행한 데일리미션입니다. 홈으로 돌아가시겠습니까?"
      );
      if (postDailyMissionResponse) {
        router.push("/home");
      }
    },
  });

  const dailyMissionContent = dailyMissionData?.data.content;

  // 정제된 데일리미션 텍스트를 useState변수에 담음
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaValue = e.target.value;

    textValidationFunction(textareaValue);

    setMissionText(textareaValue);
    setIsButtonEnabled(true);
  };

  // 데일리 미션 텍스트 유효성 검사
  const textValidationFunction = (text: string) => {
    const isTextNone = text.length === 0 ? true : false;
    const isTextOver = text.length >= 400 ? true : false;
    const isLengthValid = !isTextNone && !isTextOver;
    const isSlangContained = SlangList.some((slang) => text.includes(slang));

    if (isLengthValid && !isSlangContained) {
      setIsDailyMissionValid(true);
    } else {
      if (isTextNone) {
        setErrorMessage("내용을 입력해주세요.");
        setIsDailyMissionValid(false);
      } else if (isTextOver) {
        setErrorMessage("400자 이하로 입력해주세요.");
        setIsDailyMissionValid(false);
      } else if (isSlangContained) {
        setErrorMessage("비속어는 사용할 수 없어요.");
        setIsDailyMissionValid(false);
      }
    }
  };

  // 편지 보내기
  const handlePostMission = () => {
    mutatePostDailyMission();
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
                style={{ borderColor: isDailyMissionValid ? "black" : "red" }}
              ></textarea>
              <p>From. {nicknameFromQuery} 이모</p>
            </div>
            {!isDailyMissionValid && (
              <p style={{ color: "red" }}>{textErrorMessage}</p>
            )}
            <p>{missionText.length}/400</p>
          </div>
          <button
            onClick={handlePostMission}
            disabled={!isButtonEnabled || !isDailyMissionValid}
          >
            편지 보내기
          </button>
        </div>
      </main>
    </div>
  );
};

export default Excution;
