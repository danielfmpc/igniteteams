import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Icon, Name } from "./styles";

interface Props {
  name: string;
  onRemove: (name: string) => void;
}

export function PlayerCard({ name, onRemove }: Props) {
  function handleRemove() {
    onRemove(name);
  }

  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={handleRemove} />
    </Container>
  );
}
