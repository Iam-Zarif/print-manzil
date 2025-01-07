import "./App.css";
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  // Fetch data from API
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

  return (
    <>
      <div className="h-screen w-full bg-[#1e1e20]">
        <div className="pt-12 px-8">
          <input
            type="text"
            className="w-[18rem] border focus:outline-none text-white rounded-md px-3 py-1.5 bg-transparent border-gray-600"
            name=""
            id=""
            placeholder="Search..."
          />
        </div>

        {/* Header */}
        <div className="grid px-8 mx-auto mt-6 grid-cols-[2rem,1fr,1fr,1fr,1fr] items-center gap-4 text-white w-full">
          <div className="flex items-center gap-4">
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
          <div className="flex gap-1 items-center">
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
            <p className="font-semibold">Phone Number</p>
            <RiArrowUpDownLine className="text-gray-400" />
            <BsThreeDotsVertical className="text-gray-400" size={18} />
          </div>
        </div>
        <div className="w-full bg-gray-600 h-[1px] mt-4"></div>

        {users?.map((user) => (
          <div key={user.id}>
            <div className="grid px-8 grid-cols-[2rem,1fr,1fr,1fr,1fr] text-sm items-center bg-[#242427] gap-x-4 text-gray-200 w-full">
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
              <p className="text-gray-400 py-6">{user.name}</p>
              <p className="text-gray-400 py-6">{user.email}</p>
              <p className="text-gray-400 py-6">House-453, Lane-12</p>
              <p className="text-gray-400 py-6">+8801933299021</p>
            </div>
              <div className="w-full bg-gray-600 h-[1px] col-span-5"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
