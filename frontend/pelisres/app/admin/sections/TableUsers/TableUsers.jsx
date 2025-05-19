import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const TableUsers = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(token);

    const decodedToken = jwtDecode(token);
        
    console.log("Este es el token:", decodedToken)


    
    if (!token) {
      console.error("Token no encontrado o inválido");
      navigate("/");
      return;
    }
    setToken(token);

    const fetchUsers = async () => {
      const res = await fetch("api/users"); 
      const data = await res.json();
      setUsers(data); 
    };

    fetchUsers();
  }, []);

  const modificarRoleUsuario = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error("Error al modificar el rol");

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (error) {
      console.error("Error modificando rol:", error);
    }
  };

  const eliminarUsuario = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/${userId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error al eliminar usuario");

      // Actualiza la lista de usuarios sin el eliminado
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const roles = ["ADMIN", "USUARIO"];

  // Función para formatear la fecha en formato día-mes-año
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-1 overflow-x-auto w-3/4">
        <div className="p-1 min-w-full inline-block">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Registration Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Roles
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {formatDate(user.registration_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        type="button"
                        onClick={() => eliminarUsuario(user.id)}
                        className="bg-white dark:bg-neutral-800 text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded px-2 py-1 hover:text-red-800 dark:hover:text-red-300 focus:outline-none"
                      >
                        ELIMINAR
                      </button>

                      <select
                        value={user.role}
                        onChange={(e) =>
                          modificarRoleUsuario(user.id, e.target.value)
                        }
                        className="bg-white dark:bg-neutral-800 text-sm text-blue-600 dark:text-blue-400 border border-gray-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableUsers;
