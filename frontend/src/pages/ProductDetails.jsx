import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const getProduct = async () => {
        try {
            const { data } = await API.get(
                `/products/${id}`
            );

            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    if (!product) {
        return (
            <div className="text-center mt-20 text-3xl font-bold">
                Loading Product...
            </div>
        );
    }
    const addToCart = async () => {
        try {
            await API.post("/cart", {
                productId: product._id,
                quantity: 1,
            });

            toast.success("Added to cart");

            navigate("/cart");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
            <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-lg"
            />

            <div>
                <h1 className="text-4xl font-bold">
                    {product.title}
                </h1>

                <p className="text-gray-600 mt-3">
                    {product.category}
                </p>

                <p className="text-2xl font-bold mt-4">
                    ₹{product.price}
                </p>

                <p className="mt-5 text-lg">
                    {product.description}
                </p>

                <button
                    onClick={addToCart}
                    className="bg-black text-white px-6 py-3 mt-6 rounded"
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;