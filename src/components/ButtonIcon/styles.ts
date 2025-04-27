import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export type ButtonIconTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonIconTypeStyleProps;
};

const buttonVariant = {
  PRIMARY: "GREEN_700",
  SECONDARY: "RED",
} as const;

export const Container = styled(TouchableOpacity)<Props>`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: theme.COLORS[buttonVariant[type]],
}))``;
