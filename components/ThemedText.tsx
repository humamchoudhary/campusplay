import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

// Inter_100Thin,
// Inter_200ExtraLight,
// Inter_300Light,
// Inter_400Regular,
// Inter_500Medium,
// Inter_600SemiBold,
// Inter_700Bold,
// Inter_800ExtraBold,
// Inter_900Black,
function getName(weight: number = 400): string {
  switch (weight) {
    case 100:
      return "Inter_100Thin";
    case 200:
      return "Inter_200ExtraLight";
    case 300:
      return "Inter_300Light";
    case 400:
      return "Inter_400Regular";
    case 500:
      return "Inter_500Medium";
    case 600:
      return "Inter_600SemiBold";
    case 700:
      return "Inter_700Bold";
    case 800:
      return "Inter_800ExtraBold";
    case 900:
      return "Inter_900Black";
    default:
      return "Inter_400Regular"; // Default to regular if weight doesn't match
  }
}
export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  // console.log(style);
  return (
    <Text
      style={[
        { color },
        {
          fontFamily: getName(style && style.fontWeight),
        },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,

        style,
        { fontWeight: 100 },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    // fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  title: {
    fontSize: 32,
    // fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
