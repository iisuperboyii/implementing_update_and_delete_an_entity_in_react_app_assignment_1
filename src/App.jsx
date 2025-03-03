import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/1`;

function App() {
  // Get the existing item from the server
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(API_URI)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched item details:", data); // Log the API response
        setItem(data);
      })
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  // pass the item to UpdateItem as a prop
  return <UpdateItem item={item} />;
}

export default App;