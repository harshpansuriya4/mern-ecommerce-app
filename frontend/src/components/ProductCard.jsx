import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-xl font-bold mt-3">
                {product.title}
            </h2>

            <p className="text-gray-600 mt-1">
                {product.category}
            </p>

            <p className="text-2xl font-bold mt-2">
                ₹{product.price}
            </p>

            <Link
                to={`/product/${product._id}`}
                className="block bg-black text-white text-center mt-4 p-2 rounded"
            >
                View Details
            </Link>
        </div>
    );
}

export default ProductCard;