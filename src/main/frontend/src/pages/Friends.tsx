import React, { useState, useEffect } from "react";

type Friend = {
  id: number;
  profile: {
    id: number;
    bio: string;
    picturePath: string;
    visitedPlaces: number;
  };
  email: string;
  username: string;
  role: string;
  profileId: number;
};

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/friends/user/1", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }
        return response.json();
      })
      .then((data) => {
        setFriends(data); // Assuming the response data is an array of friends
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <div>
              <h2>{friend.username}</h2>
              <p>{friend.profile.bio}</p>
              {/* Adjust the path as necessary to point to where your images are served from */}
              <img
                src={`http://localhost:8080/${friend.profile.picturePath.replace(
                  "\\",
                  "/"
                )}`}
                alt={friend.username}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
