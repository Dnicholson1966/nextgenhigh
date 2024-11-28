import React, { useState } from "react";

const EditForm = ({ data, onSubmit, onCancel }) => {
const [formData, setFormData] = useState(data);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
};

return (
<form onSubmit={handleSubmit} className="p-4 border rounded">
<h2>Edit {formData.title || "Item"}</h2>
<label className="block my-2">
        Title:
<input
        type="text"
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        />
</label>
<label className="block my-2">
        Description:
<textarea
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
        />
</label>
<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
        Save
</button>
<button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-black rounded"
>
        Cancel
</button>
</form>
);
};

export default EditForm;