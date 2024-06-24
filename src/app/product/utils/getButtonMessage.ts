const getButtonMessage = (state: "empty" | "change" | "ok") => {
  switch (state) {
    case "empty":
      return "❌ 비교할 상품을 추가해주세요.";
    case "change":
      return "❌ 변경할 상품을 선택해주세요.";
    default:
      return "비교하러 가기";
  }
};

export default getButtonMessage;
