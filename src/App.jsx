import "./App.css";
import logo from "./image/logo.png";
import "./index.css";
import { useState } from "react";
import data from "./Data.json";

function App() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredFood =
        selectedCategory === "All"
            ? data
            : data.filter((item) => item.сategories.includes(selectedCategory));

    const [searchFood, setSearchFood] = useState("");

    return (
        <>
            <header className="header-container">
                <div>
                    <img src={logo} width={150} height={150}></img>
                </div>
                <div>
                    <button className="cart-button">Корзина</button>
                </div>
            </header>
            <main>
                <div>
                    <input
                        type="text"
                        placeholder="Найти еду"
                        onChange={(event) => {
                            setSearchFood(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <ul className="categories">
                        <li className="categories-item">
                            <button
                                className={selectedCategory === "All" ? "active" : ""}
                                onClick={() => handleCategoryChange("All")}
                            >
                                Вся еда
                            </button>
                        </li>
                        <li className="categories-item">
                            <button
                                className={selectedCategory === "Пицца" ? "active" : ""}
                                onClick={() => handleCategoryChange("Пицца")}
                            >
                                Пицца
                            </button>
                        </li>
                        <li className="categories-item">
                            <button
                                className={selectedCategory === "Напитки" ? "active" : ""}
                                onClick={() => handleCategoryChange("Напитки")}
                            >
                                Напитки
                            </button>
                        </li>
                        <li className="categories-item">
                            <button
                                className={selectedCategory === "Десерты" ? "active" : ""}
                                onClick={() => handleCategoryChange("Десерты")}
                            >
                                Десерты
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    {filteredFood
                        .filter((food) => {
                            if (searchFood == "") {
                                return food;
                            } else if (food.title.toLowerCase().includes(searchFood.toLowerCase())) {
                                return food;
                            }
                        })
                        .map((food) => {
                            return (
                                <div key={food.id}>
                                    <div>
                                        <img
                                            className="pizim"
                                            src={food.image}
                                            alt={food.title}
                                            width={278}
                                            height={267}
                                        />
                                    </div>
                                    <div>
                                        <p>{food.title}</p>
                                        <div>{food.price}р.</div>
                                        <p>{food.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </main>
            <footer>
                <ul className="contact">
                    <li className="contact-item">Самая вкусная улица 0</li>
                    <li className="contact-item">Контакты: +1-23-345-6789</li>
                </ul>
                <div className="copyright">© GreenRest</div>
            </footer>
        </>
    );
}

export default App;
