import React, { useState, useContext, useEffect } from 'react';
import z from 'zod';
import { useAuth0 } from "@auth0/auth0-react";
import UserDataContext from "../context/UserDataContext";
import { useForm } from "react-hook-form"
import  { Search } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import Modal from "react-modal";
import { Card } from "@/components/ui/card"
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    searchTerm: z.string().min(1, 'Search term cannot be empty'),
  });
  
  // use shadcn ComboBox to search for events
const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isLoading } = useAuth0();
    const userid = (user && user.sub ? user.sub.split("|")[1] : null);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        // Perform search logic here
    };

    const onSubmit = (data: any) => {
        // get search results
        // set search results
    };
    const form = useForm({
        resolver: zodResolver(formSchema),
      });

    return (
        <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                            Find RA's in the system.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                )}
                />
             <Button type="submit">Submit</Button>
             </form>
             </Form>
             <Modal isOpen={isModalOpen} onRequestClose= {() => setIsModalOpen(false)}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {searchResults.map((result, index) => (
                    <Card key={index} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                    {result}
                    </Card>
                ))}
                </div>
                </Modal>
        </div>
    );
};

export default SearchBar;