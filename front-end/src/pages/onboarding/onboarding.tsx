import { onboardingBg } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useCreate,
  useDelete,
  useGetIdentity,
  useList,
  useUpdate,
} from "@refinedev/core";
import { VerifiedUser } from "@/types";
import { useOnboardContext } from "@/context/justOnboarded";
import fetchWrapper from "@/context/fetch-wrapper";

const residenceHalls = [
  "Meredith",
  "Meredith South",
  "Wiley",
  "Windsor",
  "Cary Quad",
  "McCutcheon",
  "Tarkington",
  "First Street Towers",
  "Earhart",
  "Frieda Parker",
  "Winifred Parker",
  "Harrison",
  "Hawkins",
  "Hillenbrand",
  "Honors College",
  "Owen",
  "Shreve",
];

const roles = [
  "Resident Assistant",
  "Resident Education Assistant",
  "Resident Education Coordinator",
];

const roleIds = {
  "Resident Assistant": "rol_B4q5MnHKp5bAK3GZ",
  "Resident Education Assistant": "rol_TEPNE600izWN97kg",
  "Resident Education Coordinator": "rol_dThVMHLWvXU9omdm",
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  residenceHall: z.string().min(1, {
    message: "Please select a residence hall.",
  }),
  role: z.string().min(1, {
    message: "Please select a role.",
  }),
});

export const Onboarding = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      residenceHall: "",
      role: "",
    },
  });
  const { mutate: updateData, isLoading: isUpdating } = useUpdate();
  const { mutate: createData } = useCreate();
  const { data: userData } = useGetIdentity();
  const [user, setUser] = useState<VerifiedUser | null>(null);
  const { data: usersRoles } = useList({
    resource: `users/${user?.user_id}/roles`,
    dataProviderName: "authMan",
    queryOptions: { enabled: !!user },
  });
  const { setJustOnboarded } = useOnboardContext();
  const navigate = useNavigate();
  async function onOnboardingSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const options = {
      method: "POST",
      headers: {
        "PRIVATE-KEY": "0e59da6a-ca0d-4f13-884e-c87675cd0880",
      },
      body: JSON.stringify({
        username: user!.email,
        secret: user!.email,
        email: user!.email,
        first_name: values.name,
      }),
    };
    const response = await fetchWrapper(
      "https://api.chatengine.io/users/",
      options
    );
    const data = await response.json();
    console.log(data);
    updateData(
      {
        resource: "users",
        id: user!.user_id,
        values: {
          name: values.name,
          user_metadata: {
            residenceHall: values.residenceHall,
            onboarded: true,
            role: values.role,
          },
        },
        meta: {
          method: "PATCH",
        },
        dataProviderName: "authMan",
      },
      {
        onSuccess: () => {
          setJustOnboarded(true);
          navigate("/dashboard");
        },
      }
    );
  }

  useEffect(() => {
    if (userData && !user) {
      setUser(userData as VerifiedUser);
    }
    if (usersRoles) {
      console.log(usersRoles);
    }
  }, [userData, usersRoles]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="flex items-center justify-center py-48">
        <div className="mx-auto flex flex-col justify-between h-full w-[350px] gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Let's get you set up</h1>
              <p className="text-balance text-muted-foreground">
                Fill in the details below to get started.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onOnboardingSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="residenceHall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence Hall</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your residence hall" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {residenceHalls.map((hall) => (
                            <SelectItem key={hall} value={hall}>
                              {hall}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex h-full flex-col justify-center">
                  {isUpdating ? (
                    <Button className="w-full" disabled>
                      <CircularProgress
                        classNames={{
                          svg: "w-6 h-6 mr-2",
                        }}
                        color="primary"
                        aria-label="Loading..."
                      />
                      Please Wait
                    </Button>
                  ) : (
                    <Button type="submit" className="w-full">
                      Finish
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden bg-primary/20 lg:block"></div>
    </div>
  );
};
