import { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSeller = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorData);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Top Sellers</h2>
    </div>
  );
};

export default TopSeller;
