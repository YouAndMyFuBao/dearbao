import { APIResponse } from "../data/type";
import { baseAxios } from "./baseAxios";

export const postLogin = async (code: string) => {
  console.log("authorization", code);
  const {
    data: { data },
  } = await baseAxios.post<
    APIResponse<{
      accessToken: string;
      refreshToken: string;
      initialProfile: boolean;
    }>
  >("api/v1/auth/kakao",
    {code}
  );
  return data;
};
