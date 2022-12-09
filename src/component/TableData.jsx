import React, { useState, useEffect, useRef } from "react";
import '../App.css'
import Pagination from "./Pagination";

const TableData = () => {
  const [user, setUser] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [editItem, setEditItem] = useState(true);
  const ScrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  //pagination
  const [showPerPageRecord, setShowPageRecord] = useState(2) //per page ketla records batavva te chhe
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPageRecord,
  })

  const onPaginationHandler = (start, end) => {
    setPagination({ start: start, end: end });
  }
  // const post_name = useRef(null);
  // const post_username = useRef(null);
  // const post_email = useRef(null);
  // name: post_name.current.value,
  // username: post_username.current.value,
  // email: post_email.current.value,

  const fetchDataApi = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setFinalData(data);
    setUser(data);
  };

  useEffect(() => {
    fetchDataApi();
  }, []);


  useEffect(() => {
    ScrollRef.current?.scrollIntoView();
  }, [finalData]);

  const SearchMyData = (e) => {
    const filteredData = user.filter((el) => {
      return el.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFinalData(filteredData);
  };

  const del = (delbtnid) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${delbtnid}`, {
      method: "DELETE",
    });
    setFinalData(finalData.filter((product) => product.id !== delbtnid));
  };

  const SubmitData = (e) => {
    if (name.length == 0 || username.length == 0 || email.length == 0) {
      alert("pls fill data");
    } else {
      e.preventDefault();

      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          username,
          email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setFinalData([...finalData, data]));
      setEmail("");
      setName("");
      setUserName("");
    }
  };
  const updte = (updtbtnid) => {
    if (editItem) {
      let getData = finalData.find((product) => {
        return product.id === updtbtnid;
      });
      setName(getData.name);
      setUserName(getData.username);
      setEmail(getData.email);
      setEditItem(false);
    } else if (name.length == 0 || username.length == 0 || email.length == 0) {
      alert("pls fill data");
    } else {
      fetch(`https://jsonplaceholder.typicode.com/users/${updtbtnid}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: { updtbtnid },
          name: name,
          username: username,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((data) =>
          setFinalData(
            finalData.map((product) => {
              // return (product?.id === updtbtnid) ? data : product
              if (product?.id === updtbtnid) {
                return data;
              } else {
                return product;
              }
            })
          )
        );

      setEmail("");
      setName("");
      setUserName("");
      setEditItem(true);
    }
  };

  return (
    <div className="container mt-4">
      <input
        className="form-control mb-3"
        type="text"
        placeholder="Search here…"
        onChange={SearchMyData}
      />
      {
        loading ? (
          <div class="text-center my-5">
            <button class="btn btn-primary" type="button" disabled>
              Loading...
              &nbsp;
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </div>
        ) :

          (<table className="table text-center">
            <thead>
              <tr className="table-dark">
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              <tr className="table-dark">
                <th></th>
                <th>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  // required
                  />
                  {/* <input type="text" ref={post_name} /> */}
                </th>
                <th>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  // required
                  />
                  {/* <input type="text" ref={post_username} /> */}
                </th>
                <th>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  // required
                  />
                  {/* <input type="text" ref={post_email} /> */}
                </th>
                <th colSpan={2}>
                  <button
                    className="btn btn-primary"
                    onClick={SubmitData}
                    type="submit"
                  >
                    Add
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="tableHover">
              {finalData.slice(pagination.start, pagination.end).map((value) => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.username}</td>
                    <td>{value.email}</td>
                    {/* <td>{value.address.city}</td> */}
                    <td>
                      {editItem ? (
                        <button
                          onClick={() => updte(value.id)}
                          className="border-0 btn-success"
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          onClick={() => updte(value.id)}
                          className="border-0 btn-success"
                        >
                          Update
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => del(value.id)}
                        className="border-0 btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>)}
      <div ref={ScrollRef} />
      <Pagination showPerPageRecord={showPerPageRecord} onPaginationHandler={onPaginationHandler} totalDataLength={finalData.length} />
    </div >
  );
};

export default TableData;
