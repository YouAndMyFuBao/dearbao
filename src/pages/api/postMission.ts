import { APIResponse } from "../data/type";
import { baseAxios } from "./baseAxios";

export const postMission = async (content: string) => {
  const { data } = await baseAxios.post<APIResponse<string>>(
    "api/v1/mission/daily",
    {
      content,
    }
  );
  return data;
};
