import React, { useEffect, useState } from 'react';
import app from "../firebaseCfg";
import { getDatabase, ref, set, get } from 'firebase/database';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Label, TextInput } from "flowbite-react";

function Editpage() {
    const navigate = useNavigate();
    const { firebaseId } = useParams();

    const [menuItem, setMenuItem] = useState("");
    const [menuCategory, setMenuCategory] = useState("");
    const [menuItemPrice, setMenuItemPrice] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "restaurant/menu/" + firebaseId);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const targetObj = snapshot.val();
                setMenuItem(targetObj.menuItemName);
                setMenuCategory(targetObj.menuCategory);
                setMenuItemPrice(targetObj.menuItemPrice);
            } else {
                alert("Error fetching data");
            }
        };
        fetchData();
    }, [firebaseId]);

    const editData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "restaurant/menu/" + firebaseId);
        set(newDocRef, {
            menuItemName: menuItem,
            menuCategory: menuCategory,
            menuItemPrice: menuItemPrice,
        })
        .then(() => {
            alert("The menu item has been updated");
            navigate("/edit");
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
            alert("Error: " + error.message);
        });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Menu Item</h1>
            <div className="mb-4">
                <Label htmlFor="menuItem" value="Menu Item Name" />
                <TextInput
                    id="menuItem"
                    type="text"
                    value={menuItem}
                    onChange={(e) => setMenuItem(e.target.value)}
                    placeholder="Enter menu item name"
                    required
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="menuCategory" value="Menu Category" />
                <TextInput
                    id="menuCategory"
                    type="text"
                    value={menuCategory}
                    onChange={(e) => setMenuCategory(e.target.value)}
                    placeholder="Enter menu category"
                    required
                />
            </div>
            <div className="mb-4">
                <Label htmlFor="menuItemPrice" value="Menu Item Price" />
                <TextInput
                    id="menuItemPrice"
                    type="text"
                    value={menuItemPrice}
                    onChange={(e) => setMenuItemPrice(e.target.value)}
                    placeholder="Enter menu item price"
                    required
                />
            </div>
            <div className="flex space-x-2">
                <Button onClick={editData}>Save Changes</Button>
                <Button color="light" onClick={() => navigate("/")}>Home</Button>
                <Button color="light" onClick={() => navigate("/menu")}>Menu</Button>
            </div>
        </div>
    );
}

export default Editpage;
