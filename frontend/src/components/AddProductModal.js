import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { fetchMaterials } from '../features/materialsSlice';
import { fetchGrades } from '../features/gradesSlice';


function AddProductModal({ showModal, setShowModal,onAddProduct }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const materials = useSelector(state => state.materials);
    const grades = useSelector(state => state.grades);

    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [selectedGrades, setSelectedGrades] = useState('');
    

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchMaterials());
        dispatch(fetchGrades());
    }, [dispatch]);


    const handleAdd = ()=>{
        onAddProduct({ productId: selectedProduct,
                        materialId: selectedMaterial,
                        gradeId:selectedGrades
                    })
    }

    return (
        showModal ? (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => setShowModal(false)}>close</span>
                    <h2>Add Product</h2>
                    <div>
                    <select onChange={(e) => setSelectedProduct(e.target.value)}>
                        <option value="">Select Product</option>
                        {products.map(product => (
                            <option key={product._id} value={product._id}>{product.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setSelectedMaterial(e.target.value)}>
                        <option value="">Select Material</option>
                        {materials.map(material => (
                            <option key={material._id} value={material._id}>{material.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setSelectedGrades(e.target.value)}>
                        <option value="">Select Grade</option>
                        {grades.map(grade => (
                            <option key={grade._id} value={grade._id}>{grade.name}</option>
                        ))}
                    </select>
                    {/* <select multiple onChange={(e) => setSelectedGrades(Array.from(e.target.selectedOptions).map(option => option.value))}>
                        {grades.map(grade => (
                            <option key={grade._id} value={grade._id}>{grade.name}</option>
                        ))}
                    </select> */}
                    </div>
                    <div>
                    <button onClick={handleAdd} className='btn addBtn'>Add</button>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default AddProductModal;
