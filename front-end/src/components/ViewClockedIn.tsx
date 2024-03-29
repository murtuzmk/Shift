import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useAuth0 } from "@auth0/auth0-react";
import UserDataContext from "../context/UserDataContext";
import { useState, useContext, useEffect } from "react"

interface RA {
  name: string;
  clockedIn: boolean;
}
 
export function ViewClockedIn() {
  const [Ras, setRas] = useState<RA[]>([]);
  const { user, isLoading } = useAuth0();
  const { getUserRole }: any = useContext(UserDataContext);
  const [REC, setREC] = useState(false);
  const userid = (user && user.sub ? user.sub.split("|")[1] : null);

  useEffect(() => {
    user &&
      (async () => {
        const userRole = await getUserRole(user?.sub);
        if (
          userRole == "Resident Education Assistant"
        ) {
          setREC(false);
        }
        else if (
          userRole == "Resident Education Coordinator"
        ) {
          setREC(true);
        }
      })();
  }, [user]);

  useEffect(() => {
    fetchRas();
  }, []);
  const fetchRas = async () => {
        let response;
        if (REC) {
          const response = await fetch(`http://localhost:8080/rec/${userid}/get-ras`);
        }
        else {
          const response = await fetch(`http://localhost:8080/rea/${userid}/get-ras`);
        }
        const data = await response.json();

        const ras = data.map((item: any) => item.id);
        for (const id of ras) {
          const another_response = await fetch(`http://localhost:8080/ra/${id}`);
          const another_data = await another_response.json();
          setRas((prevRas) => [
            ...prevRas,
            {
              name: another_data.name,
              clockedIn: JSON.parse(another_data.clockedIn),
            },
          ]);
        };   
    }

    if (isLoading) {
      return <h1>Loading...</h1>;
    }  
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Ra's</h4>
        {Ras.map((Ras, index) => (
          <>
            <div key={index} className="text-sm">
              {Ras.name} {Ras.clockedIn ? "Clocked In" : "Not Clocked In"}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}