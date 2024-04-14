import React,  { useEffect, useState }  from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";

const defaultRules = ["No loud music after 10pm", "No guests after 10pm", "No smoking in the building", "No pets allowed"];
const RAWelcome: React.FC = () => {
    const [rules, setRules] = useState<string[]>([]);

    useEffect(() => {
      setRules(defaultRules);
    }, []);
    // fetch welcome message based on the rec that is in charge of the RA's place
    // Additionally add functionality that will only display a path on sidebar if the user is a RA
    return (
        //add a function that only renders this for RA's 
      <div>
        <img src="front-end/src/assets/shiftLogo.png" />
        <h1> Residential Assistant Reminders! </h1>
        <ScrollArea className="flex w-full rounded-md"> 
        <div className="grid grid-cols-3 gap-4">
            {rules.map((rule, index) => (
                <Card key={index}>
                <CardHeader>
                    <CardTitle>Rule {index + 1}</CardTitle>
                </CardHeader>
                <Separator className = "my-4" />
                <CardContent>
                    <div className="border-dashed border-2">
                    <CardDescription className = "text-pretty ">{rule}</CardDescription>
                    </div>
                </CardContent>
                </Card>
            ))}
        </div>
           
            </ScrollArea>    
      </div>
    );
  };

export default RAWelcome;