import { setCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { postLogin } from "../api/postLogin";

const Redirect = () => {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const code = query.code as string;

    const getAuth = async (code: string) => {
      const data = await postLogin(code);
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      const initialProfile = data.initialProfile;

      if (data) {
        setCookie("accessToken", accessToken, {
          maxAge: 60 * 3000,
        });
        setCookie("refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30,
        });
      }

      if (!initialProfile) {
        router.push("/nickname");
        return;
      }
      router.push("/home");
    };

    if (!code) {
      return;
    }

    getAuth(code);
  }, [router]);

  return null;
};

export default Redirect;
