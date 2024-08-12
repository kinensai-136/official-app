import type { CapacitorConfig } from "@capacitor/cli"
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard"

const config: CapacitorConfig = {
  appId: "jp.kinensai.app136",
  appName: "official-app",
  webDir: "build/client",
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
      style: KeyboardStyle.Dark,
    },
  },
}

export default config
