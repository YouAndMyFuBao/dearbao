import { APIResponse } from "../data/type";
import { baseAxios } from "./baseAxios";

export const postInit = async (requestData: {
  nickName: string;
  title: string;
}) => {
  const {
    data: { data: responseData },
  } = await baseAxios.post<APIResponse<string>>("api/v1/auth/init", {
    nickName: requestData.nickName,
    title: requestData.title,
  });
  return responseData;
};
