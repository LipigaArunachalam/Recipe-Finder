import React, { useEffect, useState, useCallback, useRef } from "react";
import Recipe from "./Recipe";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

const App = () => {
    const APP_ID = "8fb73741";
    const APP_KEY = "9f4107db5b79938c969106434b681b03";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("chicken");
    const [query, setQuery] = useState("chicken");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const searchRef = useRef(null);

    const getRecipes = useCallback(async () => {
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        setRecipes(data.hits);
    }, [query]);

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    const updateSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        //setSearch("");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
    };

    const handleSearch = () => {
        searchRef.current.focus();
    };

    return (
        <Router>
            <div className="App">
                <nav>
                    {isAuthenticated ? (
                        <>
                            <span>Welcome, {username}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/login" element={<Login setAuth={setIsAuthenticated} setUser={setUsername} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/welcome" element={isAuthenticated ? (
                        <div>
                            <h2>Welcome to the Recipe Dashboard!</h2>
                            <form onSubmit={getSearch} className="search-form">
                                <input
                                    type="text"
                                    className="search-bar"
                                    value={search}
                                    onChange={updateSearch}
                                    ref={searchRef}
                                />
                                <button type="Submit" className="search-button">
                                    Search
                                </button>
                            </form>
                            <div className="recipes">
                                {recipes.map((recipe) => (
                                    <Recipe
                                        key={recipe.recipe.label}
                                        title={recipe.recipe.label}
                                        calories={recipe.recipe.calories}
                                        image={recipe.recipe.image}
                                        ingredients={recipe.recipe.ingredients}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
