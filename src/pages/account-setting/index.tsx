import { useRouter } from "next/router";

const AccountSetting = () => {
  const router = useRouter();
  return (
    <>
      <header>
        <button onClick={() => router.back()}>x</button>
      </header>
      <body>
        <p>닉네임+호칭</p>
        <p>카카오로그인 여부</p>
      </body>
      <div>
        <button onClick={() => alert("회원탈퇴 구현 예정")}>회원탈퇴</button>
        <button onClick={() => alert("로그아웃 구현 예정")}>로그아웃</button>
      </div>
    </>
  );
};

export default AccountSetting;
