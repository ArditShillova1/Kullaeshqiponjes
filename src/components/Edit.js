import React, { useState } from 'react';
import app from "../firebaseCfg";
import { getDatabase, ref, get, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from "flowbite-react";

function Edit() {
    const navigate = useNavigate();
    const [itemArray, setItemArray] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "restaurant/menu");
        const snapshot = await get(dbRef);
        if(snapshot.exists()){
            const myData = snapshot.val();
            const tempArray = Object.keys(myData).map(myFireID => ({
                ...myData[myFireID],
                menuItemId: myFireID
            }));

            setItemArray(tempArray);
        } else {
            alert("Error fetching data");
        }
    };

    const deleteMenuItem = async (menuItemIdparm) => {
        const db = getDatabase(app);
        const dbRef = ref(db, "restaurant/menu/" + menuItemIdparm);
        await remove(dbRef);
        fetchData(); // Refresh data after deletion
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Menu Items</h1>
            <Button onClick={fetchData} className="mb-4">Show Menu Items</Button>
            <Table className="mb-4">
                <Table.Head>
                    <Table.HeadCell>Menu Item</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {itemArray.map((item, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{item.menuItemName}</Table.Cell>
                            <Table.Cell>{item.menuCategory}</Table.Cell>
                            <Table.Cell>{item.menuItemPrice}$</Table.Cell>
                            <Table.Cell>
                                <Button onClick={() => navigate(`/editpage/${item.menuItemId}`)} className="mr-2">Edit</Button>
                                <Button color="failure" onClick={() => deleteMenuItem(item.menuItemId)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <div className="flex space-x-2">
                <Button onClick={() => navigate("/")} >Home</Button>
                <Button onClick={() => navigate("/menu")} >Menu</Button>
            </div>
        </div>
    );
}

export default Edit;
