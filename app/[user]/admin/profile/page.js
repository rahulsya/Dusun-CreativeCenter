import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

function Profile() {
  return (
    <div className="w-[100%] flex flex-col items-center border-2 border-black min-h-[83vh]">
      <h1 className="text-xl text-black md:text-3xl">Profile</h1>
      <Card className="w-[50%] mt-4 flex flex-col items-center text-justify rounded-2xl">
        <CardHeader className="w-[100%] flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="text-black">John Doe</CardTitle>
          <CardDescription>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut
            purus rhoncus erat rhoncus consectetur. Aliquam tincidunt mi sed
            quam tincidunt, vel tempus risus gravida. In semper, est feugiat
            condimentum euismod, ligula mi viverra nulla, eu tempus libero lorem
            ut diam. Donec a lobortis nisi. Duis a porttitor odio, id molestie
            enim. Aliquam mollis mi maximus odio faucibus imperdiet.{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <EnvelopeOpenIcon /> Example@mail.com
          </Button>
        </CardContent>
        <CardFooter>
          <p>Admin</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;
