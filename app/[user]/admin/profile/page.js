"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function Profile() {
  const [data, setData] = useState({
    id: null,
    username: "",
    email: "",
    bio: "",
    urls: [],
  });
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

  const handleUrls = (index, value) => {
    const updatedUrls = [...data.urls];
    updatedUrls[index] = value;
    setData((prev) => ({ ...prev, urls: updatedUrls }));
  };

  const fetchdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profile"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))[0];

      setData({
        id: data.id,
        username: data.username || "",
        email: data.email || "",
        bio: data.bio || "",
        urls: data.urls || [],
      });
      console.log(data);
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

  const handleUpdateProfile = async () => {
    const userDocRef = doc(db, "profile", data.id);

    const updateData = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    if (data.bio) updateData.bio = data.bio;
    if (data.urls) updateData.urls = data.urls;

    try {
      await updateDoc(userDocRef, updateData);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteUrl = (index) => {
    const updatedUrls = [...data.urls];
    updatedUrls.splice(index, 1);
    setData((prev) => ({ ...prev, urls: updatedUrls }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-[70%] flex gap-7 flex-col min-h-[83vh] ">
      <div className="flex flex-col">
        <h1 className="text-sm text-black md:text-xl">Profile</h1>
        <h3 className="text-xs text-black md:text-sm">
          This is how others will see you on this site.
        </h3>
      </div>
      <form
        className="flex flex-col gap-7"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Username */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">Username</h1>
          <Input
            type="Text"
            placeholder="shadcn"
            value={data.username || ""}
            onChange={handleUsername}
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
            value={data.email || ""}
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
            value={data.bio}
            onChange={handleBio}
          />
          <h3 className="text-xs text-black md:text-sm">
            You can @mention other users and organizations to link to them.
          </h3>
        </div>
        {/* URLs */}
        <div className="flex flex-col gap-2 ">
          <h1 className="text-sm text-black md:text-xl">URLs</h1>
          {data.urls.map((url, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                placeholder="Add Your URL here"
                value={url}
                onChange={(e) => handleUrls(index, e.target.value)}
              />
              <Button
                variant="outline"
                className="w-[2rem] hover:bg-red-600 hover:text-white"
                onClick={() => handleDeleteUrl(index)}
              >
                X
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-[6rem]"
            onClick={() =>
              setData((prev) => ({ ...prev, urls: [...prev.urls, ""] }))
            }
          >
            Add URL
          </Button>
        </div>
        <Button className="w-[8rem]" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </form>
    </div>
  );
}

export default Profile;
