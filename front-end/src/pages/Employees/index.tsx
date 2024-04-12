import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { employees } from "@/data/employees";
import { DataTableColumns } from "@/lib/dataTableColumns";
import { Plus } from "lucide-react";
import React, {
  FunctionComponentElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import UserDataContext from "@/context/UserDataContext";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export interface EmployeeColumns {
  id: string;
  residentAssistant: {
    name: string;
    email: string;
    avatar: FunctionComponentElement<any>;
  };
  role: string;
  hall: string;
  status: "Clocked In" | "Clocked Out" | "Pending";
}

type EmployeeHeaders = "residentAssistant" | "role" | "hall" | "status";

const newEmployeeSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 character(s)" }),
});

const Employees = () => {
  const { getUsers, getRAs, getREAs, getRECs }: any =
    useContext(UserDataContext);
  useEffect(() => {
    (async () => {
      const users = await getUsers();
      // if (userInfo.role == "ra") {
      //   roleId = "rol_B4q5MnHKp5bAK3GZ";
      // } else if (userInfo.role == "rec") {
      //   roleId = "rol_dThVMHLWvXU9omdm";
      // } else {
      //   roleId = "rol_TEPNE600izWN97kg";
      // }
      const ras = await getRAs();
      const reas = await getREAs();
      const recs = await getRECs();
      const raData = await ras.map((ra: any) => {
        return {
          id: ra.id,
          residentAssistant: {
            name: ra.name,
            email: ra.email,
            avatar: React.createElement(
              Avatar,
              { className: "h-12 w-12" },
              React.createElement(AvatarImage, {
                src: ra.picture,
                className: "rounded-full",
              })
            ),
          },
          role: "Resident Assistant",
          hall: "Unassigned",
          status: "Clocked Out",
        };
      });
      const reaData = await reas.map((rea: any) => {
        return {
          id: rea.id,
          residentAssistant: {
            name: rea.name,
            email: rea.email,
            avatar: React.createElement(
              Avatar,
              { className: "h-12 w-12" },
              React.createElement(AvatarImage, {
                src: rea.picture,
                className: "rounded-full",
              })
            ),
          },
          role: "Resident Education Assistant",
          hall: "Unassigned",
          status: "Clocked Out",
        };
      });
      const recData = await recs.map((rec: any) => {
        return {
          id: rec.id,
          residentAssistant: {
            name: rec.name,
            email: rec.email,
            avatar: React.createElement(
              Avatar,
              { className: "h-12 w-12" },
              React.createElement(AvatarImage, {
                src: rec.picture,
                className: "rounded-full",
              })
            ),
          },
          role: "Resident Education Coordinator",
          hall: "Unassigned",
          status: "Clocked Out",
        };
      });
      const fullData = [...raData, ...reaData, ...recData];
      const typedData: EmployeeColumns[] = fullData;
      setData(typedData);
    })();
  }, []);

  // for notifications
  const { toast } = useToast();
  let columns = new DataTableColumns<EmployeeColumns, EmployeeHeaders>([
    "residentAssistant",
    "role",
    "hall",
    "status",
  ])
    .formatColumn("residentAssistant", "user")
    .formatColumn("status", "status")
    .addActionColumn()
    .addAction("Disable user account")
    .addAction("Delete user account")
    .addAction("View Shifts");
  const [data, setData] = useState<EmployeeColumns[]>([]);
  const newEmployeeForm = useForm<z.infer<typeof newEmployeeSchema>>({
    resolver: zodResolver(newEmployeeSchema),
    defaultValues: {
      email: "example@email.com",
      password: "12345",
    },
  });
  function createNewEmployee(values: z.infer<typeof newEmployeeSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      console.log(values);
      throw new Error("Couldn't create a new employee. Please try agian.");
    } catch (e: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: e.message,
        variant: "destructive",
      });
    }
  }
  const [dataTableFilter, setDataTableFilter] = useState("role");

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold md:text-2xl">Employees</h1>
          <p className="text-muted-foreground">Manage your employees here.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"}>
              <Plus className="h-4 w-4 mr-1" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>
                Add a new resident assistant to your hall. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...newEmployeeForm}>
              <form
                onSubmit={newEmployeeForm.handleSubmit(createNewEmployee)}
                className="grid gap-4"
              >
                <FormField
                  control={newEmployeeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newEmployeeForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex rounded-lg border border-dashed shadow-sm">
        <DataTable
          columns={columns.getColumns()}
          data={data}
          addFilterBar={true}
          filter={dataTableFilter}
          filterOption={dataTableFilter}
          setFilterOption={setDataTableFilter}
          filters={["role", "hall"]}
        />
      </div>
    </main>
  );
};

export default Employees;
