    import React, { useEffect, useState } from 'react';
    import app from "../firebaseCfg";
    import { getDatabase, ref, get } from 'firebase/database';
    import { useNavigate } from 'react-router-dom';
    import './Home.css';
    import { Carousel } from "flowbite-react";
    import { Button, Table } from "flowbite-react";
    import img2228 from "../Images/IMG_2228.JPG";
    import img2227 from "../Images/IMG_2227.JPG";
    import img2230 from "../Images/IMG_2230.JPG";
    import img1123 from "../Images/1123.jpg";
    import Torte from "../Images/Torte.jpg";
    import Filepule from "../Images/Filepule.jpg";
    import sofra from "../Images/IMG_20240615_020721.jpg";
    import MishEdhi from "../Images/IMG_20240107_153710.jpg";
    import Flishtepije from "../Images/Flishtepije.jpg";
    import img20231128094141 from "../Images/IMG_20231128_094141.jpg";




    function Home() {
        const [itemArray, setItemArray] = useState([]);
        const [tabIndex, setTabIndex] = useState(0);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchData = async () => {
                const db = getDatabase(app);
                const dbRef = ref(db, "restaurant/menu");
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const items = snapshot.val();
                    const groupedItems = {};

                    Object.values(items).forEach(item => {
                        if (!groupedItems[item.menuCategory]) {
                            groupedItems[item.menuCategory] = [];
                        }
                        groupedItems[item.menuCategory].push(item);
                    });

                    setItemArray(Object.entries(groupedItems));
                } else {
                    alert("Error: No menu items found");
                }
            };

            fetchData();
        }, []);

        const handleNextCategory = () => {
            setTabIndex(prevIndex => prevIndex < itemArray.length - 1 ? prevIndex + 1 : 0);
        };
        const handlePreviousCategory = () => {
            setTabIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : itemArray.length - 1));
          };
        return (
            <div>
                <div className="image-container">
                    <div className="image-text">
                        <h1>Miresevini<br/>Kulla e shqiponjës</h1>
                        <p>Aty ku tradita dhe modernja takohen sebashku</p>
                    </div>
                </div>
                <div className="extra-boxes mb-2.5 ">
                    <div className="text-box">
                        <h2>Kulla e shqiponjës</h2>
                        <p>Restaurant Kulla e Shqiponjes eshte restaurant<br/> ku bashkon menyne moderne dhe ate tradicionale ne nje<br/> ambiente shume te qete dhe me nje staf te mbrekullueshem</p>
                    </div>
                </div>
                <div className="h-56 sm:h-56 xl:h-80 mx-auto 2xl:h-96 m-4" style={{maxWidth: "80%",  maxHeight:"400px"}}>
                    <Carousel>
                        <img src={img2228} alt="..." />
                        <img src={img2227} alt="..." />
                        <img src={img20231128094141} alt="..." />
                        <img src={img2230} alt="..." />
                        <img src={img1123} alt="..." />
                    </Carousel>
                </div>  
                

                <div className="book-container mx-auto mt-2.5">
                    {itemArray.map(([category, items], index) => (
                        <div key={index} className={`page ${tabIndex === index ? 'active' : ''}`}>
                            <h3>{category}</h3>
                            <ul>
                                {items.map((item, subIndex) => (
                                    <li key={subIndex} className="menu-item">
                                        <span>{item.menuItemName}</span>
                                        <span className="menu-price">{item.menuItemPrice}$</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                
                <div className="flex flex-wrap gap-2 mt-2.5 justify-between">
                    <Button className="next-button" onClick={handlePreviousCategory}>Back</Button>
                    <Button className="next-button" onClick={handleNextCategory}>Next</Button>
                </div>
            </div>
            <div className="h-56 sm:h-96 xl:h-96 2xl:h-96 mx-auto m-4" style={{ maxWidth: "80%", maxHeight: "600px" }}>
                <Carousel>
                    <img src={Filepule} alt="Filepule" className="w-full h-full object-cover" />
                    <img src={Torte} alt="Torte" className="w-full h-full object-cover" />
                    <img src={Flishtepije} alt="Flishtepije" className="w-full h-full object-cover" />
                    <img src={sofra} alt="sofra" className="w-full h-full object-cover" />
                    <img src={MishEdhi} alt="img1123" className="w-full h-full object-cover" />
                </Carousel>
            </div>
   

                
        
                <div className="extra-boxes1">
                    <div className="text-box2"> 
                        <h2>Orari i punes</h2>
                        <p>E Hene - 08:00-23:00<br/>
                        E Marte - 08:00-23:00<br/>
                        E Merkure - 08:00-23:00<br/>
                        E Enjte - 08:00-23:00<br/>
                        E Premte - 08:00-23:00<br/>
                        E Shtune - 08:00-23:00<br/>
                        E Diele - 08:00-23:00<br/> </p>
                    </div>
                    <div className="image-box2"></div>
                </div>
                

                
            </div>
        );
    }

    export default Home;
