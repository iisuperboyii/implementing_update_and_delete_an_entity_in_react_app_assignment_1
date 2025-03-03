import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
    // 1. Create a state for the form
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
        if (item) {
            setFormData({ name: item.name || "", description: item.description || "" });
        }
    }, [item]);

    // 2. Create a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/1`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Updated item:", data);
            alert("Item updated successfully! ✅");
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Failed to update item. ❌");
        }
    };

    // 3. Create a function to handle the form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{border:"2px solid red",width:"300px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <h2>Update Item</h2>
            {item ? (
                <div style={{border:"2px solid blue",padding:"20px"}}>
                    <h3>Existing Item Details</h3>
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Description:</strong> {item.description}</p>

                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <br />
                        <label>
                            Description:
                            <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>
                        <br />
                        <button type="submit">Update</button>
                    </form>
                </div>
            ) : (
                <p>Loading item...</p>
            )}
        </div>
    );
};

export default UpdateItem;