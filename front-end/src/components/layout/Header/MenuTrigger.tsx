import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const MenuTrigger = () => {
  return (
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
  );
};

export default MenuTrigger;
