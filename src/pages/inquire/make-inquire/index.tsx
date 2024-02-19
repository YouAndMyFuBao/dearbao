import { useState } from "react";
import { useRouter } from "next/router";

const MakeInquire = () => {
  const router = useRouter();
  const [inquireTitle, setInquireTitle] = useState<string>("");
  const [inquireContent, setInquireContent] = useState<string>("");

  const handleTitleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInquireTitle(inputValue);
    console.log('문의 제목', inquireTitle);
  };

  const handleContentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInquireContent(inputValue);
    console.log('문의 내용', inquireContent);
  };

  return (
    <>
      <header>
        <button onClick={() => router.back()}>x</button>
      </header>
      <body>
        <input placeholder="문의 제목" value={inquireTitle} onChange={handleTitleInputChange}/>
        <input placeholder="문의 내용" value={inquireContent} onChange={handleContentInputChange}/>
      </body>
      <div>
        <button
          onClick={() => {
            alert("문의 구현 예정");
            router.push("/inquire/complete-inquire");
          }}
        >
          문의
        </button>
      </div>
    </>
  );
};

export default MakeInquire;
