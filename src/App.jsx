import "./App.css";
import logo from "./image/logo.png";
import "./index.css";
import { useState, useEffect } from "react";
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

    const [isShow, setShow] = useState(false);

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    })

    const [total, setTotal] = useState(0);

    function addCardId(id) {
        const goodItem = cart.find((good) => good.id === id);
        if (goodItem) {
            plusGood(id);
        } else {
            const { id: idx, title, price } = data.find((good) => good.id === id);
            setCart((prevCart) => [...prevCart, { id: idx, title, price, count: 1 }]);
        }
        
    }
    function plusGood(id) {
        setCart(cart.map(el => el.id === id ? {...el, count: el.count +1} : el))
        
    }
    function minusGood(id) {
        const elem = cart.find((el) => el.id === id);
        if (elem.count === 1) {
            deleteGood(id, cart);
        } else {
            setCart(cart.map(el => el.id === id ? {...el, count: el.count -1} : el))
        }
    }
    function deleteGood(id) {
        setCart(cart.filter((el) => el.id !== id));
        console.log(cart)
    }

    return (
        <>
            <header className="header-container">
                <div>
                    <img src={logo} width={150} height={150}></img>
                </div>
                <div>
                    <button
                        className="cart-button"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        Корзина
                    </button>
                </div>
            </header>
            <main className="main-container">
                <div>
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Найти еду"
                        onChange={(event) => {
                            setSearchFood(event.target.value);
                        }}
                    />
                </div>
                <div className="categories-container">
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
                <div className="food-container">
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
                                <div className="food-item" key={food.id}>
                                    <div>
                                        <img
                                            className="pizim"
                                            src={food.image}
                                            alt={food.title}
                                            width={278}
                                            height={267}
                                        />
                                    </div>
                                    <div className="description">
                                        <p className="description-item title">{food.title}</p>
                                        <div className="description-item price">{food.price}р.</div>
                                        <p className="description-item desc">{food.description}</p>
                                        <div>
                                            <button
                                                className="add-to-card"
                                                onClick={() => addCardId(food.id,cart)}
                                            >
                                                В корзину
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={isShow ? "modal-cart show" : "modal-cart"}>
                    <div className="modal-active">
                        <div className="modal-close">
                            <button
                                className="btn-close"
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                        <div className="modal">
                            {!cart.length ? (
                                <div className="cart-empty">
                                    <p>В корзине пока пусто :(</p>
                                </div>
                            ) : (
                                <div className="cart-not-empty">
                                    <div className="cart-items">
                                        {cart &&
                                            cart.map((food) => (
                                                <div className="cart-item" key={food.id}>                                                    

                                                    <h3 className="title-item">{food.title}</h3>
                                                    <p>{food.desc}</p>
                                                    <button
                                                        className="del-item"
                                                        onClick={() => deleteGood(food.id, cart)}
                                                    >
                                                        Удалить
                                                    </button>
                                                    <div className="cart-product-price">
                                                        {food.price}р.
                                                    </div>
                                                    <div className="count-div">
                                                        <button
                                                            className="minus"
                                                            onClick={() => minusGood(food.id, cart)}
                                                        >
                                                            -
                                                        </button>
                                                        <div className="count">{food.count}</div>
                                                        <button
                                                            className="plus"
                                                            onClick={() => plusGood(food.id, cart)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="cart-product-total-price">
                                                        {food.price * food.count}р.
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="cart-summary">
                                        <div className="subtotal">
                                            <div className="span-total">Сумма заказа:</div>
                                            <div className="amount">{}р.</div>
                                        </div>
                                        <div className="payment">
                                            <button className="payment-btn">
                                                К оформлению заказа
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <ul className="contact">
                    <li className="contact-item">Самая вкусная улица 0</li>
                    <li className="contact-item">Контакты: +1-23-345-6789</li>
                    <li className="copyright">© GreenRest</li>
                </ul>
            </footer>
        </>
    );
}

export default App;
