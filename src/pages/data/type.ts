export interface APIResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}

export type FubaoMessageData = {
  messageOpenTime: boolean;
  missionSuccess: boolean;
  nickname: string;
  remainingTime: string;
};
