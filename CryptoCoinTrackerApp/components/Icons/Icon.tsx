import { FontAwesome } from "@expo/vector-icons";

import { ICON_SIZE } from "../../constants/Constants";

export function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={ICON_SIZE} {...props} />;
}
