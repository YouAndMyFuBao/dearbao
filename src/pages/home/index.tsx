import { useState } from "react";
import { useRouter } from "next/router";
import NavigationModal from "../components/navigation-modal/navigation-modal";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <button onClick={openModal}>햄버거 메뉴 버튼</button>
      <button onClick={() => router.push("/daily-mission")}>
        데일리 미션 버튼
      </button>
      <p>홈 화면</p>
      <NavigationModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Home;
