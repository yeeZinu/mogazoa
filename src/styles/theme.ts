const sizes = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1200px",
} as const;

const devices = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  desktop: `(min-width: ${sizes.desktop})`,
} as const;

const theme = {
  devices,
};

export default theme;
