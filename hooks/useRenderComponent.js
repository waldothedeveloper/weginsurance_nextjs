import {
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";

import { useState } from "react";

//
export const useRenderComponent = () => {
  const [navigation, setNavigation] = useState([
    {
      name: "Mensajes",
      href: "messages",
      icon: ChatBubbleBottomCenterTextIcon,
      current: true,
    },
    {
      name: "Directorio",
      href: "directory",
      icon: MagnifyingGlassCircleIcon,
      current: false,
    },
  ]);

  const handleChangeComponent = (route) => {
    setNavigation(
      navigation.map((elem) => {
        if (elem.href === route) {
          return { ...elem, current: true };
        } else {
          return { ...elem, current: false };
        }
      })
    );
  };

  return { navigation, handleChangeComponent };
};
