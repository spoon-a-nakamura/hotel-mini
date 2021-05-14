const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  overMobileS: `(min-width: ${size.mobileS})`,
  overMobileM: `(min-width: ${size.mobileM})`,
  overMobileL: `(min-width: ${size.mobileL})`,
  overTablet: `(min-width: ${size.tablet})`,
  overLaptop: `(min-width: ${size.laptop})`,
  overLaptopL: `(min-width: ${size.laptopL})`,
  overDesktop: `(min-width: ${size.desktop})`,
  overDesktopL: `(min-width: ${size.desktop})`,
  underMobileS: `(max-width: ${size.mobileS})`,
  underMobileM: `(max-width: ${size.mobileM})`,
  underMobileL: `(max-width: ${size.mobileL})`,
  underTablet: `(max-width: ${size.tablet})`,
  underLaptop: `(max-width: ${size.laptop})`,
  underLaptopL: `(max-width: ${size.laptopL})`,
  underDesktop: `(max-width: ${size.desktop})`,
  underDesktopL: `(max-width: ${size.desktop})`,
}
