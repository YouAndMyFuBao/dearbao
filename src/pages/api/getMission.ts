import { APIResponse, MissionData } from "../data/type";
import { baseAxios } from "./baseAxios";

export const getMission = async () => {
  const { data: missionData } =
    await baseAxios.get<APIResponse<MissionData>>("api/v1/mission");
  return missionData;
};
