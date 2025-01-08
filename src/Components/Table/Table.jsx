
import { RiArrowUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
      const [users, setUsers] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(10);
      const [loading, setLoading] = useState(false);



  useEffect(() => {
    setLoading(true);
    const fetchUsers = async (page = 1, row = rowsPerPage) => {
      try {
        const response = await axios.get(
          `https://api.razzakfashion.com/?paginate=${row}&page=${page}`
        );
        if (response.status === 200) {
          setLoading(false);
          setUsers(response?.data?.data);
          setCurrentPage(response?.data?.current_page);
          setTotalPages(response?.data?.last_page);
        } else {
          setLoading(false);
          console.error("Error fetching users:");
        }

        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  const getFirstAndLastName = (name) => {
    const [firstName, ...lastName] = name.split(" ");
    return { firstName, lastName: lastName.join(" ") };
  };

  const filteredUsers = users.filter((user) => {
    const fullName = user.name.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="h-screen w-full bg-[#1e1e20]">
      <div className="pt-12 px-8">
        <input
          type="text"
          className="w-[18rem] border focus:outline-none text-white rounded-md px-3 py-1.5 bg-transparent border-gray-600"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {loading ? (
        <>
          <div className="flex items-center justify-center py-20 bg-[#242427]">
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-white  rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          {filteredUsers?.map((user) => {
            const { firstName, lastName } = getFirstAndLastName(user.name);
            return (
              <div key={user.id}>
                <div className="grid px-8 grid-cols-[2rem,1fr,1fr,1fr,1fr,1fr] text-sm items-center bg-[#242427] gap-x-4 text-gray-200 w-full">
                  <div className="flex items-center py-6">
                    <input
                      type="checkbox"
                      name=""
                      className="peer hidden"
                      id={`checkbox-${user?.id}`}
                    />
                    <label
                      htmlFor={`checkbox-${user?.id}`}
                      className="w-6 h-6 bg-gray-600 rounded-md peer-checked:bg-blue-600 flex items-center justify-center"
                    >
                      <span className="hidden peer-checked:block text-white text-sm font-bold">
                        ✓
                      </span>
                    </label>
                  </div>
                  <p className="text-gray-400 py-6 pl-10">{firstName}</p>
                  <p className="text-gray-400 py-6">{lastName}</p>
                  <p className="text-gray-400 py-6">{user?.email}</p>
                  <p className="text-gray-400 py-6">House-453, Lane-12</p>
                  <p className="text-gray-400 py-6">+8801933299021</p>
                </div>
                <div className="w-full bg-gray-600 h-[1px] col-span-5"></div>
              </div>
            );
          })}
        </>
      )}

      <div className="mt-4 px-8 text-gray-400 flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <p>Rows per page</p>
          <input
            type="number"
            value={rowsPerPage}
            min={1}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to page 1 when rows per page changes
            }}
            className="w-20 border focus:outline-none text-white rounded-md px-3 py-1.5 bg-transparent border-gray-600"
          />
        </div>
        <div className="flex items-center gap-2">
          <p>
            {rowsPerPage * (currentPage - 1) + 1}-
            {Math.min(rowsPerPage * currentPage, users.length)} of{" "}
            {rowsPerPage * totalPages}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="px-3 py-1 bg-gray-600 rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            {"|<"}
          </button>
          <button
            className="px-3 py-1 bg-gray-600 rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            {"<"}
          </button>
          <button
            className="px-3 py-1 bg-gray-600 rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            {">"}
          </button>
          <button
            className="px-3 py-1 bg-gray-600 rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {">|"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table