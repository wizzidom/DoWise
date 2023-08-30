import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   getTasks();
  // }, []);
  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('Task was successfully deleted')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  // const getTasks = () => {
  //   setLoading(true)
  //   axiosClient.get('/users')
  //     .then(({ data }) => {
  //       setLoading(false)
  //       setUsers(data.data)
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //     })
  // }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Todolist</h1>
        <Link className="btn-add" to="/users/new">Add new task</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
          
            <th>Name of Task</th>
      
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
             
                <td>{u.name}</td>
             
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
