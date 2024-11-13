"use client";

import { useEffect, useEffet, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
  const [urls, setUrls] = useState([]);
  const [data, setData] = useState([
    {
      id: null,
      username: "",
      email: "",
      bio: "",
      urls: urls,
    },
  ]);
  const [loading, setLoading] = useState(true);

  const handleUsername = (e) => {
    setData((prev) => ({ ...prev, username: e.target.value }));
  };

  const handleEmail = (e) => {
    setData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleBio = (e) => {
    setData((prev) => ({ ...prev, bio: e.target.value }));
  };

  const handleUrls = (e) => {
    setData((prev) => ({ ...prev, urls: e.target.value }));
  };

  const fetchdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profile"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data[0]);

      console.log(data[0].urls.map((url) => url));
      console.log(typeof data[0].urls);

      setData([
        {
          id: data[0].id,
          username: data[0].username,
          email: data[0].email,
          bio: data[0].bio,
          urls: data[0].urls.map((url) => url),
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  if (loading) return <p>Loading...</p>;

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
          <Input
            type="Text"
            placeholder="shadcn"
            onChange={handleUsername}
            value={data[0].username}
          />
          <h3 className="text-xs text-black md:text-sm">
            This is your public display name. It can be your real name or a
            pseudonym. You can change this once every 30 days.
          </h3>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Email</h1>
          <Input
            type="Text"
            placeholder="example@mail.com"
            onChange={handleEmail}
            value={data[0].email}
          />
          <h3 className="text-xs text-black md:text-sm">
            You can manage verified email addresses in your email settings.
          </h3>
        </div>
        {/* Bio */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Bio</h1>
          <Textarea
            placeholder="I Own a Computer."
            onChange={handleBio}
            value={data[0].bio}
          />
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
