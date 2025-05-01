import { Container } from "./styles";
import { TextInputProps, TextInput } from "react-native";

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: InputProps) {
  return <Container {...rest} ref={inputRef} />;
}
