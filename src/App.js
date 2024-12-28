// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { initializeApp } from "firebase/app";
// import {
//   GoogleAuthProvider,
//   getAuth,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsy30iuQlCXoDpr7sSRsCxy9AJF70BIQU",
//   authDomain: "todo-2dee1.firebaseapp.com",
//   projectId: "todo-2dee1",
//   storageBucket: "todo-2dee1.appspot.com",
//   messagingSenderId: "461581102633",
//   appId: "1:461581102633:web:4f72b0098b0dea1a2e7638",
//   measurementId: "G-8NY3JNC11S",
// };

// initializeApp(firebaseConfig);
// const auth = getAuth();

// const Navbar = ({
//   theme,
//   toggleTheme,
//   user,
//   handleLogout,
//   handleLogin,
//   handleFilterChange,
//   filter,
// }) => {
//   return (
//     <nav
//       className="navbar"
//       style={{
//         background: "blue",
//         padding: "10px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <h1 className="navbar-title" style={{ margin: 0, color: "yellow" }}>
//         Todo App
//       </h1>
//       {user ? (
//         <div className="user-info">
//           <span className="username">Welcome, {user.displayName}</span>

//           <button
//             className="logout-button"
//             style={{
//               padding: "5px 10px",
//               background: "darkblue",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               transition: "background-color 0.3s ease",
//             }}
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <button
//           className="login-button"
//           style={{
//             padding: "5px 10px",
//             background: "red",
//             margin: "8px 5px 9px 90px",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             transition: "background-color 0.3s ease",
//           }}
//           onClick={handleLogin}
//         >
//           Login
//         </button>
//       )}
//       <div className="filter-dropdown">
//         <select value={filter} onChange={handleFilterChange}>
//           <option value="all">All</option>
//           <option value="completed">Completed</option>
//           <option value="incomplete">Incomplete</option>
//         </select>
//       </div>
//       <button
//         className="toggle-theme"
//         style={{
//           padding: "5px",
//           margin: "5px",
//           color: "white",
//           background: "darkblue",
//           border: "none",
//           cursor: "pointer",
//           transition: "transform 0.3s ease",
//         }}
//         onClick={toggleTheme}
//       >
//         {theme === "light" ? "🌙" : "☀️"}
//       </button>
//     </nav>
//   );
// };

// const App = () => {
//   const [theme, setTheme] = useState("dark");
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [user, setUser] = useState(null);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     const storedTodos = localStorage.getItem("todos");
//     if (storedTodos) {
//       setTodos(JSON.parse(storedTodos));
//     }

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//         setTodos([]);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("todos", JSON.stringify(todos));
//     }
//   }, [todos, user]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleAddTodo = () => {
//     if (!user || inputValue.trim() === "") return;
//     const newTodo = {
//       id: new Date().getTime(),
//       text: inputValue,
//       completed: false,
//       date: new Date().toLocaleDateString(),
//       canEdit: true,
//     };
//     setTodos((prevTodos) => [...prevTodos, newTodo]);
//     setInputValue("");
//   };

//   const handleToggleComplete = (id) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id
//           ? {
//               ...todo,
//               completed: !todo.completed,
//               canEdit: !todo.completed,
//             }
//           : todo
//       )
//     );
//   };

//   const handleEditTodo = (id, newText) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id ? { ...todo, text: newText } : todo
//       )
//     );
//   };

//   const handleDeleteTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
//   };

//   // google auth provider
//   const handleLogin = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         setUser(result.user);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleFilterChange = (event) => {
//     setFilter(event.target.value);
//   };

//   const filteredTodos =
//     filter === "completed"
//       ? todos.filter((todo) => todo.completed)
//       : filter === "incomplete"
//       ? todos.filter((todo) => !todo.completed)
//       : todos;

//   return (
//     <div className={`app ${theme}`}>
//       <Navbar
//         theme={theme}
//         toggleTheme={toggleTheme}
//         user={user}
//         handleLogout={handleLogout}
//         handleLogin={handleLogin}
//         handleFilterChange={handleFilterChange}
//         filter={filter}
//       />
//       <div className="headline">
//         <h2 className="headline-title">Welcome to the Todo App</h2>
//         <p className="headline-subtitle">
//           Get organized and stay productive with our simple todo list!
//         </p>
//       </div>
//       <div className="add-todo">
//         <input
//           type="text"
//           placeholder="Add a new todo"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleAddTodo}>Add</button>
//       </div>
//       <div className="todo-container">
//         <div className="todo-list">
//           {filteredTodos.map((todo) => (
//             <div
//               className={`todo ${todo.completed ? "completed" : ""}`}
//               key={todo.id}
//             >
//               <div
//                 className="todo-text"
//                 onClick={() => handleToggleComplete(todo.id)}
//               >
//                 {todo.text}
//               </div>
//               <div className="todo-date">{todo.date}</div>
//               <div className="todo-actions">
//                 {!todo.completed && todo.canEdit && (
//                   <button
//                     className="edit-button"
//                     onClick={() =>
//                       handleEditTodo(
//                         todo.id,
//                         prompt("Edit the todo", todo.text)
//                       )
//                     }
//                   >
//                     ✏️
//                   </button>
//                 )}
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDeleteTodo(todo.id)}
//                 >
//                   ❌
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <div className="add-todo">
//         <input
//           type="text"
//           placeholder="Add a new todo"
//           value={inputValue}
//           onChange={handleInputChange}
//         />
//         <button onClick={handleAddTodo}>Add</button>
//       </div> */}
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsy30iuQlCXoDpr7sSRsCxy9AJF70BIQU",
  authDomain: "todo-2dee1.firebaseapp.com",
  projectId: "todo-2dee1",
  storageBucket: "todo-2dee1.appspot.com",
  messagingSenderId: "461581102633",
  appId: "1:461581102633:web:4f72b0098b0dea1a2e7638",
  measurementId: "G-8NY3JNC11S",
};

initializeApp(firebaseConfig);
const auth = getAuth();

const Navbar = ({
  theme,
  toggleTheme,
  user,
  handleLogout,
  handleLogin,
  handleFilterChange,
  filter,
}) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Todo App</h1>
      {user ? (
        <div className="user-info">
          <span className="username">Welcome, {user.displayName}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      )}
      <div className="filter-dropdown">
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, user]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (!user || inputValue.trim() === "") return;
    const newTodo = {
      id: new Date().getTime(),
      text: inputValue,
      completed: false,
      date: new Date().toLocaleDateString(),
      canEdit: true,
      progress: 0,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue("");
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              canEdit: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleEditTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleProgressChange = (id, progress) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, progress } : todo))
    );
  };

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos =
    filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "incomplete"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  return (
    <div className={`app ${theme}`}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        user={user}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
      <div className="headline">
        <h2 className="headline-title">Welcome to the Todo App</h2>
        <p className="headline-subtitle">
          Get organized and stay productive with our simple todo list!
        </p>
      </div>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div
        className="todo-container"
        style={{ maxWidth: "900px", margin: "0 auto" }}
      >
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <div
              className={`todo ${todo.completed ? "completed" : ""}`}
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                className="todo-text"
                style={{ flex: 3, textAlign: "left" }}
                onClick={() => handleToggleComplete(todo.id)}
              >
                {todo.text}
              </div>
              <div
                className="todo-date"
                style={{ flex: 1, textAlign: "center" }}
              >
                {todo.date}
              </div>
              <div
                className="todo-progress"
                style={{
                  flex: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <label>Progress:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={todo.progress}
                  onChange={(e) =>
                    handleProgressChange(todo.id, Number(e.target.value))
                  }
                  style={{
                    background: `linear-gradient(to right, green ${todo.progress}%, #ccc ${todo.progress}%)`,
                  }}
                />
                <span>{todo.progress}%</span>
              </div>

              <div className="todo-actions" style={{ flex: 1 }}>
                {!todo.completed && todo.canEdit && (
                  <button
                    className="edit-button"
                    onClick={() =>
                      handleEditTodo(
                        todo.id,
                        prompt("Edit the todo", todo.text)
                      )
                    }
                  >
                    ✏️
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
