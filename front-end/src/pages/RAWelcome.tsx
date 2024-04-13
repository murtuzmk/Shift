import React,  { useEffect, useState }  from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"

const RAWelcome: React.FC = () => {
    const [rules, setRules] = useState('');

    // fetch welcome message based on the rec that is in charge of the RA's place
    // Additionally add functionality that will only display a path on sidebar if the user is a RA
    return (
        //add a function that only renders this for RA's 
      <div>
        <img src="front-end/src/assets/shiftLogo.png" />
        <h1>Residential Assistant Reminders! </h1>
        <ScrollArea className="flex w-full rounded-md"> 
          <div className="flex flex-col w-full">
            // add list of rules of here
            </div>
            </ScrollArea>    
      </div>
    );
  };

export default RAWelcome;