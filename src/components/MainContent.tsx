import axios from "axios";
import { useEffect, useState } from "react";
import { LuTally3 } from "react-icons/lu";
import Card from "./Card";
import { useFilter } from "./FilterContext";

const MainContent = () => {
  const { selectedCategory, searchQuery, keyWord, minPrice, maxPrice } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(false);
  const itmesPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itmesPerPage}&skip=${
      (currentPage - 1) * itmesPerPage
    }`;
    if (keyWord) {
      url = `https://dummyjson.com/products/search?q=${keyWord}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage, keyWord]);

  const getFilteredProducts = () => {
    let filtredProducts = products;

    // for category
    if (selectedCategory) {
      filtredProducts = filtredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }
    // for min price
    if (minPrice !== undefined) {
      filtredProducts = filtredProducts.filter(
        (product) => product.price >= minPrice
      );
      console.log(filtredProducts);
    }
    // for max price
    if (maxPrice !== undefined) {
      filtredProducts = filtredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    // for search
    if (searchQuery) {
      filtredProducts = filtredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // for keword
    switch (filter) {
      case "expensive":
        return filtredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filtredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filtredProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filtredProducts;
    }
  };
  const filtredProducts = getFilteredProducts();
  console.log(filtredProducts);

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itmesPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = (
    currentPage: number,
    totalPages: number
  ): number[] => {
    const buttons: number[] = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (1 - (currentPage - 2)));
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (currentPage + 2 - totalPages));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button onClick={()=>setOpenDropdown(!openDropdown)} className="border px-5 py-2 rounded-full flex items-center">
              <LuTally3 className="mr-2" />

              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLocaleLowerCase() + filter.slice(1)}
            </button>
            {openDropdown && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        {/* for card */}
        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {/* BookCard */}
          {filtredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between  items-center mt-5">
          {/* previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border  px-4 py-2 mx-2 rounded-full"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center">
            {getPaginationButtons(currentPage, totalPages).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border  px-4 py-2 mx-2 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
