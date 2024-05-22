const sizes = {
  mobile: "480px", // 모바일 세로
  tablet: "768px", // 모바일 가로, 타블렛 세로
  laptop: "1024px", // 타블렛 가로, 노트북
  desktop: "1200px", // 데스크탑
} as const;

const devices = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
} as const;

const theme = {
  devices,
};

export default theme;
