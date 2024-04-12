import { SheetContent } from "@/components/ui/sheet";

const MenuContent = ({ children }: MenuContentProps) => {
  return (
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">{children}</nav>
    </SheetContent>
  );
};

export default MenuContent;
