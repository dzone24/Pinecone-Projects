import {Card} from "@/components/Content/Card";
import {useEffect, useState} from "react";
import {Loader} from "@/components/Loader";


export function Grid() {
  const [articles, setArticles] = useState();
  const [currentPage, setCurrentPage] = useState(1);
    
  
    useEffect(() => {
      fetch("https://dev.to/api/articles?username=j471n")
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
        });
    }, []);

    if (articles === undefined) return <Loader/>;

    function loadNext() {
      fetch(`https://dev.to/api/articles?username=j471n&per_page=9&page=${currentPage + 1}`)
        .then((response) => response.json())
        .then((data) => {
          setArticles([...articles, ...data]);
          setCurrentPage(currentPage + 1);
        });
    }

    
  
    if (articles === undefined) return <Loader />;
  
    return (
      <>
        <h1 className="text-xl p-3">Trending</h1>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <Card key={article.id} article={article} />
            ))}
          </div>
        </div>



        <h1 className="text-xl p-3">All Blog Post</h1>
        <div className="flex justify-between p-3">
          <div className="flex flex-wrap gap-3">
            <button className="hover:text-orange-500">All</button>
            <button className="hover:text-orange-500">Design</button>
            <button className="hover:text-orange-500">Travel</button>
            <button className="hover:text-orange-500">Fashion</button>
            <button className="hover:text-orange-500">Technology</button>
            <button className="hover:text-orange-500">Branding</button>
          </div>
          
          <button className="hover:text-orange-500">View All</button>          
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article) => (
              <Card key={article.id} article={article} />
            ))}
          </div>

        <div className="py-8 text-center">
          <button className="p-6 rounded bg-blue-50 hover:bg-blue-200" onClick={loadNext}>
            Load more
          </button>
        </div>

      </div>
      </>
    );
  }