import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationModal({
  isOpen,
  onClose,
}: NavigationModalProps) {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 1000 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 1000 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ background: "yellow" }}
        >
          <header>
            <p>닉네임+호칭</p>
            <button onClick={onClose}>닫기</button>
          </header>
          <body>
            <button onClick={() => router.push("/account-setting")}>
              계정 설정
            </button>
            <button onClick={() => router.push("/collecting")}>모아보기</button>
            <button onClick={() => router.push("/inquire/make-inquire")}>
              문의하기
            </button>
          </body>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
