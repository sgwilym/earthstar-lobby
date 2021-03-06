import { DefaultTheme } from "styled-components/macro";

type ThemeWithoutFont = Omit<DefaultTheme, "font">;

export type Accent = "alpha" | "beta" | "gamma";

export const darkTheme: ThemeWithoutFont = {
  colours: {
    fg: "white",
    fgHint: "#DBD3C5",
    bgHint: "#46423E",
    bg: "#383630",
    inputBg: "#46423E",
    alpha: "#51442C",
    beta: "#4A364B",
    gamma: "#294830",
    alphaLine: "#826837",
    betaLine: "#703A75",
    gammaLine: "#2A813D",
  },
};

export const lightTheme: ThemeWithoutFont = {
  colours: {
    fg: "black",
    fgHint: "#76684D",
    bgHint: "#D9D7AE",
    bg: "#FFFBEF",
    alpha: "#F0E5CE",
    beta: "#D0C3D1",
    gamma: "#B2CFB8",
    alphaLine: "#AE9D7B",
    betaLine: "#8F6493",
    gammaLine: "#3BAE54",
    inputBg: "white",
  },
};

export function makeThemeForFont(
  fontFamily: string,
  theme: ThemeWithoutFont
): DefaultTheme {
  return {
    ...theme,
    font: {
      family: fontFamily,
      size: 16,
    },
  };
}
