import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";
import Loader from "../components/Loader";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const getCart = async () => {
        try {
            setLoading(true);
            const { data } = await API.get("/cart");
            setLoading(false);



            setCart(data.cart);

            setTotal(data.total);
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (productId) => {
        try {
            await API.delete(`/cart/${productId}`);

            getCart();
        } catch (error) {
            console.log(error);
        }
    };

    const updateQuantity = async (
        productId,
        quantity
    ) => {
        try {
            if (quantity < 1) return;

            await API.put(`/cart/${productId}`, {
                quantity,
            });

            getCart();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <h1 className="text-3xl text-center mt-10">
                Cart is Empty
            </h1>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">
                Your Cart
            </h1>

            <div className="space-y-6">
                {cart.items.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex gap-6 border p-4 rounded-lg items-center"
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-32 h-32 object-cover rounded"
                        />

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold">
                                {item.product.title}
                            </h2>

                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.product._id,
                                            item.quantity - 1
                                        )
                                    }
                                    className="bg-gray-300 px-3 py-1 rounded"
                                >
                                    -
                                </button>

                                <span className="text-lg font-bold">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        updateQuantity(
                                            item.product._id,
                                            item.quantity + 1
                                        )
                                    }
                                    className="bg-gray-300 px-3 py-1 rounded"
                                >
                                    +
                                </button>
                            </div>

                            <p className="text-xl font-bold mt-2">
                                ₹{item.product.price}
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                removeItem(item.product._id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-10 text-right">
                <h2 className="text-3xl font-bold">
                    Total: ₹{total}
                </h2>
            </div>
        </div>
    );
}

export default Cart;