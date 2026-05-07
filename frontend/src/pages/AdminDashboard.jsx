import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/axios";

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });

    // Fetch products
    const getProducts = async () => {
        try {
            const { data } = await API.get("/products");

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Create product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/products", formData);

            toast.success("Product added");

            setFormData({
                title: "",
                description: "",
                price: "",
                image: "",
                category: "",
            });

            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            await API.delete(`/products/${id}`);

            getProducts();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            {/* Form */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-black text-white px-6 py-3 rounded mb-6"
            >
                {showForm ? "Close Form" : "Add New Product"}
            </button>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="grid gap-4 mb-10"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <button className="bg-black text-white py-3 rounded">
                        Add Product
                    </button>
                </form>
            )}

            {/* Product List */}
            <div className="grid md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border p-4 rounded"
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded"
                        />

                        <h2 className="text-xl font-bold mt-3">
                            {product.title}
                        </h2>

                        <p className="mt-2">
                            ₹{product.price}
                        </p>

                        <button
                            onClick={() =>
                                deleteProduct(product._id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;