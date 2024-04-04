import "./App.css";
import { useState, useEffect } from "react";
import { EditableText } from "@blueprintjs/core";

function App() {
  const [user, setUser] = useState([]);
  const [newuser, setNewuser] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
  });

  //GET data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  //POST data
  const handleNewinputs = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };
  const handleAdd = (e) => {
    const name = newuser.name;
    const email = newuser.email;
    const phone = newuser.phone;
    const website = newuser.website;

    e.preventDefault();
    if (name && email && phone && website) {
      fetch("https://jsonplaceholder.typicode.com/users/", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, website }),
        headers: { "content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser([...user, data]);
          alert("user added successfully");
          setNewuser({
            name: "",
            email: "",
            phone: "",
            website: "",
            address: "",
          });
        });
    } else {
      alert("Fill all the input fields...");
    }
  };

  //PUT data
  const handleEditchange = (id, value, phone) => {
    setUser((user) => {
      return user.map((item) => {
        return item.id === id ? { ...item, [phone]: value } : item;
      });
    });
  };

  const handleEdit = (id) => {
    const usr = user.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(usr),
      headers: { "content-type": "application/json, charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => alert("User updated successfully"));
  };

  //DELETE data
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((user) => {
          return user.filter((item) => item.id !== id);
        });
        alert("User deleted successfully");
      });
  };

  return (
    <>
      <div className="App">
        <h1>React CRUD</h1>
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>Website</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <EditableText
                      value={item.phone}
                      onChange={(value) => {
                        handleEditchange(item.id, value, "phone");
                      }}
                    />
                  </td>
                  <td>{item.website}</td>

                  <td>
                    <button
                      className="btn-green"
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn-red"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="form-block">
          <form on onSubmit={handleAdd}>
            <input
              type="text"
              name="name"
              vlaue={newuser.name}
              onChange={handleNewinputs}
            />
            <input
              type="email"
              name="email"
              value={newuser.email}
              onChange={handleNewinputs}
            />
            <input
              type="phone"
              name="phone"
              value={newuser.phone}
              onChange={handleNewinputs}
            />
            <input
              type="text"
              name="website"
              value={newuser.website}
              onChange={handleNewinputs}
            />

            <button className="btn-blue" onClick={handleAdd}>
              ADD
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
