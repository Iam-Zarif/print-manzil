import "./App.css";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.razzakfashion.com/");
        setUsers(response.data.data); // Set the users from API response
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const getFirstAndLastName = (name) => {
    const [firstName, ...lastName] = name.split(" ");
    return { firstName, lastName: lastName.join(" ") };
  };

  // Filtered users based on the search term
  const filteredUsers = users.filter((user) => {
    const fullName = user.name.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="h-screen w-full bg-[#1e1e20]">
        <div className="pt-12 px-8">
          <input
            type="text"
            className="w-[18rem] border focus:outline-none text-white rounded-md px-3 py-1.5 bg-transparent border-gray-600"
            placeholder="Search..."
            value={searchTerm} // Controlled input value
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>

        <div className="grid px-8 mx-auto mt-6 grid-cols-[2rem,1fr,1fr,1fr,1fr,1fr] items-center gap-4 text-white w-full">
          <div className="flex items-center ">
            <input
              type="checkbox"
              name=""
              className="peer hidden"
              id="custom-checkbox"
            />
            <label
              htmlFor="custom-checkbox"
              className="w-6 h-6 bg-gray-600 rounded-md peer-checked:bg-blue-600 flex items-center justify-center"
            >
              <span className="hidden peer-checked:block text-white text-sm font-bold">
                ✓
              </span>
            </label>
          </div>
          <div className="flex pl-10 gap-1 items-center">
            <p className="font-semibold">First Name</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-semibold">Last Name</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-semibold">Address</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-semibold">State</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-semibold">Phone Number</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
        </div>
        <div className="w-full bg-gray-600 h-[1px] mt-4"></div>

        {filteredUsers.map((user) => {
          const { firstName, lastName } = getFirstAndLastName(user.name);
          return (
            <div key={user.id}>
              <div className="grid px-8 grid-cols-[2rem,1fr,1fr,1fr,1fr,1fr] text-sm items-center bg-[#242427] gap-x-4 text-gray-200 w-full">
                <div className="flex items-center py-6">
                  <input
                    type="checkbox"
                    name=""
                    className="peer hidden"
                    id={`checkbox-${user.id}`}
                  />
                  <label
                    htmlFor={`checkbox-${user.id}`}
                    className="w-6 h-6 bg-gray-600 rounded-md peer-checked:bg-blue-600 flex items-center justify-center"
                  >
                    <span className="hidden peer-checked:block text-white text-sm font-bold">
                      ✓
                    </span>
                  </label>
                </div>
                <p className="text-gray-400 py-6 pl-10">{firstName}</p>
                <p className="text-gray-400 py-6">{lastName}</p>
                <p className="text-gray-400 py-6">{user.email}</p>
                <p className="text-gray-400 py-6">House-453, Lane-12</p>
                <p className="text-gray-400 py-6">+8801933299021</p>
              </div>
              <div className="w-full bg-gray-600 h-[1px] col-span-5"></div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
