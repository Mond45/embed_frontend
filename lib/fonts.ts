import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  IBM_Plex_Sans_Thai,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})
