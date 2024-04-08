import { Ellipsis } from "lucide-react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface DataTableFilterOptionsProps {
  filterOption: string;
  setFilterOption: React.Dispatch<React.SetStateAction<string>>;
  filters: string[];
}

const DataTableFilterOptions = ({
  filterOption,
  setFilterOption,
  filters,
}: DataTableFilterOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-2" variant="ghost" size="icon">
          <Ellipsis className="h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={filterOption}
          onValueChange={setFilterOption}
        >
          {filters.map((filter, key) => (
            <DropdownMenuRadioItem value={filter} key={key}>
              {filter[0].toUpperCase() + filter.slice(1)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableFilterOptions;
