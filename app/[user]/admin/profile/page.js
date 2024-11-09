import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
  return (
    <div className="w-[70%] flex gap-7 flex-col min-h-[83vh] ">
      <div className="flex flex-col">
        <h1 className="text-sm text-black md:text-xl">Profile</h1>
        <h3 className="text-xs text-black md:text-sm">
          This is how others will see you on this site.
        </h3>
      </div>
      <form className="flex flex-col gap-7">
        {/* Username */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Username</h1>
          <Input type="Text" placeholder="shadcn" />
          <h3 className="text-xs text-black md:text-sm">
            This is your public display name. It can be your real name or a
            pseudonym. You can change this once every 30 days.
          </h3>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Email</h1>
          <Input type="Text" placeholder="example@mail.com" />
          <h3 className="text-xs text-black md:text-sm">
            You can manage verified email addresses in your email settings.
          </h3>
        </div>
        {/* Bio */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Bio</h1>
          <Textarea placeholder="I Own a Computer." />
          <h3 className="text-xs text-black md:text-sm">
            You can @mention other users and organizations to link to them.
          </h3>
        </div>
        {/* URLs */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">URLs</h1>
          <h3 className="text-xs text-black md:text-sm">
            Add links to your website, blog, or social media profiles.
          </h3>
          <Input type="Text" placeholder="Add Your URL here" />
          <Input type="Text" placeholder="Add Your URL here" />
          <Button variant="outline" className="w-[6rem]">
            Add URL
          </Button>
        </div>
        <Button className="w-[8rem]">Update Profile</Button>
      </form>
    </div>
  );
}

export default Profile;
