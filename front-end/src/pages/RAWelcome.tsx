import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


  const RAWelcome: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    <CarouselItem>
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{"WELCOME TO SHIFT RA!"}</span>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem>
                        <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">{"The University Residences team welcomes you to their new workplace platform!"}</span>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default RAWelcome;