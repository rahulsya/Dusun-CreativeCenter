"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

const cobaFecthing = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "profile"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data[0]);
      console.log(data[0].urls.map((url) => url));

      setData(data);
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
    <div>
      <h1 className="text-black">Fetching</h1>
      {data.length > 0 ? (
        <div>
          {data.map((item) => (
            <ul key={item.id}>
              <li className="py-2 border-b">Username: {item.username}</li>
              <li className="py-2 border-b">Email: {item.email}</li>
              <li className="py-2 border-b">Bio: {item.bio}</li>
              <li className="py-2 border-b">
                URLs:{" "}
                {item.urls.map((url, index) => (
                  <ul key={index}>
                    <li>{url}</li>
                  </ul>
                ))}
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <p>no data found</p>
      )}
    </div>
  );
};

export default cobaFecthing;
