import { APIResponse, DailyMissionData } from "../data/type";
import { baseAxios } from "./baseAxios";

export const getDailyMission = async () => {
  const { data: dailyMissionData } = await baseAxios.get<
    APIResponse<DailyMissionData>
  >("api/v1/mission/daily");
  return dailyMissionData;
};
