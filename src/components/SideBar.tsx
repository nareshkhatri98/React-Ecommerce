import { useEffect, useState } from "react";

interface Product {
  category: string;
}

interface fetchResponse {
  products: Product[];
}

const SideBar = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [keyWords, setKeywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/");
        const data: fetchResponse = await response.json();
        console.log(data);
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-64  px-5 py-2 h-screen  ">
      <h1 className="text-2xl font-bold mb-4 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          className=" border-2 rounded px-2 w-full sm:mb-0 "
          placeholder="Search Product"
        />

        <div className="flex justify-center gap-2 item-center mt-2 w-full">
          <input
            type="text"
            className="border-2  rounded px-5 py-1 w-full "
            placeholder="Min"
          />
          <input
            type="text"
            className="border-2 mr-2 rounded px-5 py-1 w-full"
            placeholder="Max"
          />
        </div>

        {/* categories section */}
        <div className="mb-2 mt-2">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* keyword section */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          {keyWords.map((keyword, index) => (
            <button
              key={index}
              className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>

        <button className="w-full mb-[4rem] py-2 bg-black text-white rounded  ">
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default SideBar;
