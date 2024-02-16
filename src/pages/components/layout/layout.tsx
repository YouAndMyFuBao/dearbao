import { pretendardFont } from "../../../../public/fonts/fonts.ts";
import * as S from "./style.ts";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <S.Wrapper className={pretendardFont.className}>{children}</S.Wrapper>;
}
