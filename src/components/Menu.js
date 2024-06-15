import React, { useState, useEffect } from 'react';
import app from "../firebaseCfg";
import { getDatabase, ref, set, push, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import {
    Button,
    Label,
    Select,
    TextInput,
} from "flowbite-react";

function Menu() {
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const db = getDatabase(app);
        const categoriesRef = ref(db, "restaurant/categories");
        const snapshot = await get(categoriesRef);
        if (snapshot.exists()) {
            setCategories(Object.values(snapshot.val()));
        } else {
            console.log("No categories available");
        }
    };

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "restaurant/menu"));
        set(newDocRef, {
            menuItemName: menuItem,
            menuCategory: category,
            menuItemPrice: price
        })
        .then(() => {
            alert("The menu item has been saved");
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
            alert("Error: " + error.message);
        });
    };

    const addCategory = async () => {
        const db = getDatabase(app);
        const newCategoryRef = push(ref(db, "restaurant/categories"));
        set(newCategoryRef, newCategory)
        .then(() => {
            alert("The category has been added");
            fetchCategories();
        })
        .catch((error) => {
            console.error("Error adding category: ", error);
            alert("Error: " + error.message);
        });
    };

    if (!isAuthenticated) {
        return <Login onLogin={setIsAuthenticated} />;
    }

    return (
        <div className="p-6 max-w-lg mx-auto mt-5 mb-5 bg-white rounded-xl shadow-md space-y-4">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Category</h2>
                <div className="mb-2">
                    <Label htmlFor="newCategory" value="New Category" />
                </div>
                <TextInput
                    id="newCategory"
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                    required
                    className="mb-4"
                />
                <Button color="blue" onClick={addCategory}>
                    Add Category
                </Button>
            </div>
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Menu Item</h2>
                <div className="mb-2">
                    <Label htmlFor="menuItem" value="Menu Item" />
                </div>
                <TextInput
                    id="menuItem"
                    type="text"
                    value={menuItem}
                    onChange={(e) => setMenuItem(e.target.value)}
                    placeholder="Menu Item"
                    required
                    className="mb-4"
                />
                <div className="mb-2">
                    <Label htmlFor="category" value="Category" />
                </div>
                <Select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="mb-4"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </Select>
                <div className="mb-2">
                    <Label htmlFor="price" value="Price" />
                </div>
                <TextInput
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                    className="mb-4"
                />
                <Button color="green" onClick={saveData}>
                    Add Food
                </Button>
            </div>
            <div className="flex space-x-2">
                <Button color="light" onClick={() => navigate("/")}>
                    Home
                </Button>
                <Button color="light" onClick={() => navigate("/edit")}>
                    Edit
                </Button>
            </div>
        </div>
    );
}

export default Menu;
