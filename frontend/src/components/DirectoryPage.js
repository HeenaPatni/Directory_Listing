




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { fetchMaterials } from '../features/materialsSlice';
import { fetchGrades } from '../features/gradesSlice';
import { fetchCombinations, createCombination, updateCombination } from '../features/combinationsSlice';
import ProductTable from './ProductTable';
import AddProductModal from './AddProductModal';

function DirectoryPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const materials = useSelector(state => state.materials);
    const grades = useSelector(state => state.grades);
    const combinations = useSelector(state => state.combinations.combinations);

    const [showModal, setShowModal] = useState(false);
    const [filterProduct, setFilterProduct] = useState('');
    const [filterMaterial, setFilterMaterial] = useState('');

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchMaterials());
        dispatch(fetchGrades());
        // dispatch(fetchCombinations({ product: filterProduct, material: filterMaterial }));
        dispatch(fetchCombinations())
    }, [dispatch, filterProduct, filterMaterial]);

    const handleFilter = () => {
        // dispatch(fetchCombinations({ product: filterProduct, material: filterMaterial }));
    };

    const handleAddProduct = (newProduct) => {
        dispatch(createCombination(newProduct));
        dispatch(fetchCombinations())
        // dispatch(fetchCombinations({ product: filterProduct, material: filterMaterial }));
       
        setShowModal(false);
    };

    const handleQuickEdit = (productId, updatedDetails) => {
        // console.log(productId,updatedDetails)
        dispatch(updateCombination({ id: productId, updatedDetails }));
    };

    return (
        <div className='directory-container'>
            <div>

            <button onClick={() => setShowModal(true)} className='btn addBtn'>
                <span className='plus'>+</span>
                Add Product
                </button>
            </div>
            <div className='search-container'>
            <input
                type="text"
                placeholder="Search..."
                className='search'
            />
            <span className='btn search-btn'>Search</span>
            </div>
            <div>
            <select onChange={(e) => setFilterProduct(e.target.value)} value={filterProduct} className='filters'>
                <option value="">Select Product</option>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}</option>
                ))}
            </select>
            <select onChange={(e) => setFilterMaterial(e.target.value)} value={filterMaterial} className='filters'>
                <option value="">Select Material</option>
                {materials.map(material => (
                    <option key={material._id} value={material._id}>{material.name}</option>
                ))}
            </select>
           
            <button onClick={handleFilter} className='filters'>Filter</button>
            </div>

            <ProductTable
                products={combinations}
                onQuickEdit={handleQuickEdit}
            />
            <AddProductModal showModal={showModal} setShowModal={setShowModal} onAddProduct={handleAddProduct} />
        </div>
    );
}

export default DirectoryPage;
