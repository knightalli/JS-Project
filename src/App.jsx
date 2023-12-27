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
        localStorage.setItem("total", JSON.stringify(total));
    });

    const [pay, setPay] = useState(false);

    const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")) || 0);

    function addCardId(id) {
        const goodItem = cart.find((good) => good.id === id);
        if (goodItem) {
            plusGood(id);
            setTotal(total + goodItem.price);
        } else {
            const { id: idx, title, price } = data.find((good) => good.id === id);
            setCart((prevCart) => [...prevCart, { id: idx, title, price, count: 1 }]);
            setTotal(total + price);
        }
    }
    function plusGood(id) {
        const goodItem = cart.find((good) => good.id === id);
        setCart(cart.map((el) => (el.id === id ? { ...el, count: el.count + 1 } : el)));
        setTotal(total + goodItem.price);
    }
    function minusGood(id) {
        const elem = cart.find((el) => el.id === id);
        if (elem.count === 1) {
            deleteGood(id, cart);
            setTotal(total - elem.price);
        } else {
            setCart(cart.map((el) => (el.id === id ? { ...el, count: el.count - 1 } : el)));
            setTotal(total - elem.price);
        }
    }
    function deleteGood(id) {
        const goodItem = cart.find((good) => good.id === id);
        const { price, count } = goodItem;
        setCart(cart.filter((el) => el.id !== id));
        setTotal(total - price * count);
    }

    return (
        <>
            <header className="header-container">
                <div>
                    <button
                        className="logo-btn"
                        onClick={() => {
                            setPay(false);
                            setShow(false);
                        }}
                    >
                        <img src={logo} width={150} height={150}></img>
                    </button>
                </div>
                <div>
                    <button
                        className="cart-button"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        Корзина({cart.length})
                    </button>
                </div>
            </header>
            <main>
                {pay ? (
                    <div className="main-container">
                        <div className="about-customer">
                            <h4 className="order-title">Оформление заказа</h4>
                            <div className="div-cust">
                                <div className="name option between">
                                    <span className="main-span">Имя</span>
                                    <input className="no-radio" type="text" placeholder="Ваше имя" />
                                </div>

                                <div className="phone option between">
                                    <span className="main-span">Номер телефона</span>
                                    <input
                                        className="no-radio"
                                        type="phone"
                                        placeholder="+79000000000"
                                    />
                                </div>

                                <h4 className="main-span">Тип доставки</h4>

                                <div className="delivery-type">
                                    <div className="deliv option">
                                        <p className="choose">Выберите:</p>
                                        <ul>
                                            <li>
                                                <input
                                                    className="radio"
                                                    type="radio"
                                                    name="deliveryGroup"
                                                />{" "}
                                                <span className="radio-span">Доставка</span>
                                            </li>
                                            <li>
                                                <input
                                                    className="radio"
                                                    type="radio"
                                                    name="deliveryGroup"
                                                />{" "}
                                                <span className="radio-span">Самовывоз</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="address-div option between">
                                        <span className="main-span">Адрес доставки</span>
                                        <input
                                            className="no-radio"
                                            type="text"
                                            placeholder="Малышева 32"
                                        />
                                    </div>

                                    <br />
                                </div>
                            </div>

                            <h4 className="main-span">Оплата</h4>

                            <div className="payment-type option">
                                <p className="choose">Выберите:</p>
                                <ul>
                                    <li>
                                        <input className="radio" type="radio" name="radioGroup" />{" "}
                                        <span className="radio-span">По карте</span>
                                    </li>
                                    <li>
                                        <input className="radio" type="radio" name="radioGroup" />{" "}
                                        <span className="radio-span">Наличные</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="p-cart-cont">
                            <ul className="p-items-cart">
                                <li>
                                    <div className="order-name">Заказ</div>
                                    <div className="create-line"></div>
                                </li>
                                {cart &&
                                    cart.map((food) => (
                                        <div className="cart-item-pay" key={food.id}>
                                            <div className="p-cart-product">
                                                <h3 className="p-title">{food.title}</h3>
                                                <p className="p-price">{food.price}р.</p>
                                            </div>

                                            <div className="p-count">х{food.count}</div>

                                            <div className="p-cart-product-total-price">
                                                {food.count * food.price}р.
                                            </div>
                                        </div>
                                    ))}

                                <li>
                                    <div className="create-line"></div>
                                </li>

                                <li>
                                    <div className="create-line"></div>
                                </li>

                                <li className="p-total-amount">
                                    <span className="p-total-span">Сумма заказа:</span>
                                    <strong className="amount">{total}р.</strong>
                                </li>
                            </ul>
                            <button className="p-order">Оформить заказ</button>
                        </div>
                    </div>
                ) : (
                    <div className="main-container">
                        <div className="search-container">
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
                                    } else if (
                                        food.title.toLowerCase().includes(searchFood.toLowerCase())
                                    ) {
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
                                                <p className="description-item title">
                                                    {food.title}
                                                </p>
                                                <div className="description-item price">
                                                    {food.price}р.
                                                </div>
                                                <p className="description-item desc">
                                                    {food.description}
                                                </p>
                                                <div>
                                                    <button
                                                        className="add-to-card"
                                                        onClick={() => addCardId(food.id, cart)}
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
                                        Закрыть корзину
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
                                                            <h3 className="title-item">
                                                                {food.title}
                                                            </h3>
                                                            <p>{food.desc}</p>
                                                            <button
                                                                className="del-item"
                                                                onClick={() =>
                                                                    deleteGood(food.id, cart)
                                                                }
                                                            >
                                                                Удалить
                                                            </button>
                                                            <div className="cart-product-price">
                                                                {food.price}р.
                                                            </div>
                                                            <div className="count-div">
                                                                <button
                                                                    className="minus"
                                                                    onClick={() =>
                                                                        minusGood(food.id, cart)
                                                                    }
                                                                >
                                                                    -
                                                                </button>
                                                                <div className="count">
                                                                    {food.count}
                                                                </div>
                                                                <button
                                                                    className="plus"
                                                                    onClick={() =>
                                                                        plusGood(food.id, cart)
                                                                    }
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
                                                    <div className="amount">{total}р.</div>
                                                </div>
                                                <div className="payment">
                                                    <button
                                                        className="payment-btn"
                                                        onClick={() => {
                                                            setPay(true);
                                                        }}
                                                    >
                                                        К оформлению заказа
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
