import { APIResponse, FubaoMessageData } from "../data/type";
import { baseAxios } from "./baseAxios";

export const getFubaoMessage = async () => {
  const { data: fubaoMessageData } =
    await baseAxios.get<APIResponse<FubaoMessageData>>("api/v1/mission");
  return fubaoMessageData;
};
