import type { CapacitorConfig } from "@capacitor/cli"
import { KeyboardResize, KeyboardStyle } from "@capacitor/keyboard"

const config: CapacitorConfig = {
  appId: "jp.kinensai.app136",
  appName: "136th 記念祭",
  webDir: "build/client",
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
      style: KeyboardStyle.Dark,
    },
  },
}

export default config
