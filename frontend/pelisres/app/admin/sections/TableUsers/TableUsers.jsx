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

    console.log("Este es el token:", decodedToken);

    if (!token) {
      console.error("Token no encontrado o inválido");
      navigate("/");
      return;
    }
    setToken(token);

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://172.22.229.1:8080/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener usuarios");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error obteniendo usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const modificarRoleUsuario = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://172.22.229.1:8080/admin/role/${userId}`,
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
      const response = await fetch(`http://172.22.229.1:8080/admin/${userId}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar usuario");

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const roles = ["ADMIN", "USUARIO"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-6 w-3/4 mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Usuarios registrados</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Registrado</th>
              <th className="px-4 py-2">Rol</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-amber-100 text-gray-800"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{formatDate(user.registrationDate)}</td>
                <td className="px-4 py-2 text-center">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      modificarRoleUsuario(user.id, e.target.value)
                    }
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => eliminarUsuario(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableUsers;
