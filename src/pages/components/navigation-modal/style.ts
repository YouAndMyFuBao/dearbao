import { css } from "@emotion/react";

export const motion = css`
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  min-width: 390px;
  max-width: 450px;
`;

export const base = css`
  height: 100vh;
  background: #1e212b;
  padding: 22px;
  color: white;
  position: fixed;
  width: 100%;
  min-width: 390px;
  max-width: 450px;
`;

export const modalHeader = css`
  height: 39px;
`;

export const modalCloseButton = css`
  cursor: pointer;
  background: none;
`;

export const modalButton = css`
  display: flex;
  padding: 18px 0px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
`;

export const memberManagement = css`
  display: flex;
  margin-top: 439px;
  gap: 40px;
`;

export const memberManagementButton = css`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 800;
  font-size: 18px;
`;

export const example = css`
  position: relative;
  z-index: 1000;
  border-radius: 20px;
  background-color: red;
  width: 300px;
  height: 50px;
`;

export const exampleSecond = css`
  position: relative;
  z-index: 1000;
  border-radius: 20px;
  background-color: blue;
  width: 300px;
  height: 50px;
`;

export const kakaoButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  border-radius: 16px;
  background-color: #fee500;
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  gap: 28px;
`;
