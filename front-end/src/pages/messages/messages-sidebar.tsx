import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Message } from "./sample-data";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChannelPreviewProps } from "stream-chat-react";

type MessagesSidebarProps = ChannelPreviewProps & {
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "secondary" | "ghost";
  }[];
  isMobile: boolean;
};

export function MessagesSidebar(props: MessagesSidebarProps) {
  const { channel, setActiveChannel, links, isMobile } = props;
  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text?.slice(0, 30);
  return (
    <div
      data-collapsed={isMobile}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 ">
      {!isMobile && (
        <div className="flex justify-between px-4 pt-9">
          <div className="flex space-x-3 items-center">
            <p className="text-lg font-medium">Messages</p>
            <Badge
              variant="outline"
              className="text-foreground rounded-md w-7 h-7 flex justify-center items-center text-sm">
              {links.length}
            </Badge>
          </div>
          <Button size="icon" className="w-9 h-9" variant="outline">
            <SquarePen size={20} />
          </Button>
        </div>
      )}
      <nav className="grid group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isMobile ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to="#"
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-14 w-14 mb-3"
                    )}>
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.avatar}
                        alt={link.avatar}
                        width={6}
                        height={6}
                        className="w-10 h-10"
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4">
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              to="#"
              className={cn(
                buttonVariants({ variant: link.variant }),
                link.variant === "secondary" && "shrink",
                "rounded-none -mx-2 py-14 flex flex-col justify-center space-y-3"
              )}>
              <div className="flex space-x-3 ml-4 w-full">
                <Avatar className="w-11 h-11">
                  <AvatarImage src={link.avatar} alt={link.avatar} />
                </Avatar>
                <div className="flex flex-col justify-center">
                  <span className="text-base">{link.name}</span>
                  <span className="text-sm font-normal">email@yahoo.com</span>
                </div>
              </div>
              {link.messages.length > 0 && (
                <div className="text-sm font-normal w-full px-2">
                  <p className="text-wrap overflow-hidden h-8">
                    {link.messages[link.messages.length - 1].message}
                  </p>
                </div>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
