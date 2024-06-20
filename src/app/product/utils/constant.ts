import CompareModal from "@/app/product/components/modal/CompareModal";
import EditModal from "@/app/product/components/modal/EditModal";
import LoginModal from "@/app/product/components/modal/LoginModal";
import ReviewModal from "@/app/product/components/modal/ReviewModal";
import { KAKAO_ICON, SHARE_ICON } from "@/utils/constant";
import { shareKakao } from "./kakao";
import { copyToClipboard } from "./share";
import { ButtonType } from "./types";

export const SHARE_OPTION_LIST = [
  { name: "kakao", image: KAKAO_ICON, onClick: () => shareKakao() },
  { name: "url", image: SHARE_ICON, onClick: () => copyToClipboard() },
];

export const MODAL_LIST = [
  { name: "reviewModal", component: ReviewModal },
  { name: "loginModal", component: LoginModal },
  { name: "editModal", component: EditModal },
  { name: "compareModal", component: CompareModal },
];

export const BUTTON_LIST: ButtonType[] = [
  { title: "리뷰 작성하기", styleType: "primary", modalName: "reviewModal", isVisible: true },
  { title: "비교하기", styleType: "secondary", modalName: "compareModal", isVisible: true },
  { title: "편집하기", styleType: "tertiary", modalName: "editModal", isVisible: false },
];
