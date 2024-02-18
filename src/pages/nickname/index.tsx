import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postInit } from "../api/postInit";
import { AdjectiveList } from "./constant/adjective-list";
import { NounList } from "./constant/noun-list";
import { SlangList } from "./constant/slang-list";

const getRandomItem = (list: string[]) =>
  list[Math.floor(Math.random() * list.length)];

const NickName = () => {
  const router = useRouter();
  const [combinedText, setCombinedText] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectGender, setSelectGender] = useState<boolean>();

  // 닉네임 데이터 보내기
  const mutation = useMutation({
    mutationKey: ["postInit"],
    mutationFn: async () => {
      if (combinedText && selectGender !== undefined) {
        return postInit({
          nickName: combinedText,
          title: selectGender ? "FEMALE" : "MALE",
        });
      }
    },
    onSuccess: (data) => {
      console.log("닉네임 생성 성공", data);
      router.push("/home");
    },
  });

  useEffect(() => {
    // 자동 생성 닉네임
    const generateRandomText = () => {
      const randomAdjective = getRandomItem(AdjectiveList);
      const randomNoun = getRandomItem(NounList);
      const newCombinedText = `${randomAdjective}${randomNoun}`;

      setCombinedText(newCombinedText);
      validateInput(newCombinedText);
    };

    generateRandomText();
  }, []);

  // 닉네임 입력
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim().slice(0, 8);
    setCombinedText(inputValue);
    validateInput(inputValue);
  };

  // 닉네임 유효성 검사
  const validateInput = (inputValue: string) => {
    const isLengthValid = inputValue.length >= 2 && inputValue.length <= 8;
    const isFormatValid = /^\S+$/.test(inputValue);
    const containsSlang = SlangList.some((slang) => inputValue.includes(slang));

    if (!isLengthValid || inputValue.length === 0 || containsSlang) {
      setIsInputValid(false);

      if (containsSlang) {
        setErrorMessage("닉네임 규정에 어긋납니다.");
      } else {
        setErrorMessage("닉네임을 2~8자로 입력해주세요.");
      }
    } else {
      setIsInputValid(isLengthValid && isFormatValid && !containsSlang);
      setErrorMessage("");
    }
  };

  // 닉네임 전체 삭제
  const handleDeleteClick = () => {
    setCombinedText("");
    setIsInputValid(false);
    setErrorMessage("닉네임을 2~8자로 입력해주세요.");
  };

  // '다음으로' 버튼 클릭
  const handleNextClick = () => {
    if (isInputValid && selectGender !== undefined) {
      alert("닉네임 생성 성공!");
      mutation.mutate();
    }
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <p>닉네임</p>
        <input
          value={combinedText}
          onChange={handleInputChange}
          placeholder="국문/영/숫자 조합 공백없이 2-8자"
          maxLength={8}
          style={{ borderColor: isInputValid ? "initial" : "red" }}
        />
        {combinedText && <button onClick={handleDeleteClick}>전체 삭제</button>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
      <div>
        <p>성별</p>
        <div>
          <button
            onClick={() => setSelectGender(true)}
            style={{ color: selectGender === true ? "blue" : "black" }}
          >
            임오
          </button>
          <button
            onClick={() => setSelectGender(false)}
            style={{ color: selectGender === false ? "blue" : "black" }}
          >
            삼튠
          </button>
        </div>
      </div>
      <button
        disabled={!isInputValid || selectGender === undefined}
        onClick={handleNextClick}
        style={{
          color: isInputValid && selectGender !== undefined ? "blue" : "red",
        }}
      >
        다음으로
      </button>
    </>
  );
};

export default NickName;
