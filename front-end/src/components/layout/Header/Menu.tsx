import { Sheet } from "@/components/ui/sheet";
import { ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
  open?: boolean | undefined;
  onOpenChange?: (open: boolean) => void;
}

const Menu = ({ children, open, onOpenChange }: MenuProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
    </Sheet>
  );
};

export default Menu;
