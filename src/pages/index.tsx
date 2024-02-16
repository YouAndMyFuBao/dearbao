import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/router";

export default function Tutorial() {
  const router = useRouter();

  // 튜토리얼 메세지
  interface TutorialSlide {
    id: number;
    title: string;
    description: string;
  }

  const tutorialSlides = [
    {
      id: 0,
      title: "도착한 쪽지",
      description: `매일 오전 9시, 푸바오가 질문이 담긴 쪽지를 보내요!\n
      쪽지를 클릭해 질문을 확인해보세요\n
      오후 8시 59분까지 쪽지에 대한 편지를 보낼 수 있답니다`,
    },
    {
      id: 1,
      title: "푸바오의 답장",
      description: `편지를 보냈다면 매일 오후 9시, 답장을 받을 수 있어요\n
      푸바오가 내 이름을 불러주며 보내는 답장을 받아보세요`,
    },
    {
      id: 2,
      title: "푸바오를 향한 나의 마음",
      description: `
      편지 하나를 쓸 때마다 마음의 온도가 조금씩 올라가요\n
      매일매일 편지를 써 36.5℃를 채워보세요
      `,
    },
    {
      id: 3,
      title: "내 앨범 속 푸바오의 답장",
      description: `
      받은 답장을 캘린더에 모아볼 수 있어요\n
      편지지에 담긴 답장을 다운로드 해서 간직할 수도 있답니다!
      `,
    },
  ];

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {tutorialSlides.map((slide: TutorialSlide) => (
        <SwiperSlide
          key={slide.id}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2>{slide.title}</h2>
            <p style={{ whiteSpace: "pre-line" }}>{slide.description}</p>
            {slide.id === 3 ? (
              <button
                onClick={() => router.push("/onboarding")}
                style={{ backgroundColor: "red" }}
              >
                시작하기
              </button>
            ) : (
              ""
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
