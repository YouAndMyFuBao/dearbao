import { APIResponse } from "../data/type";
import { baseAxios } from "./baseAxios";

export const postLogin = async (code: string) => {
  const {
    data: { data },
  } = await baseAxios.post<
    APIResponse<{
      accessToken: string;
      refreshToken: string;
      initProfile: boolean;
    }>
  >("api/v1/auth/kakao",
    {code}
  );
  return data;
};
