

import React, { useState } from 'react';


function ProductTable({ products, onQuickEdit }) {
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    
    const handleExpandRow = (productId,productData) => {
        if (expandedRowId === productId) {
            setExpandedRowId(null);
        } else {
            setEditedProduct({
                shape: productData.shape || '',
                length: productData.length || '',
                thickness: productData.thickness || '',
                price: productData.price || '',
            });
            setExpandedRowId(productId);
        }
    };

    const handleChange = (e, field) => {
        setEditedProduct(prevState => ({
            ...prevState,
            [field]: e.target.value,
        }));
    };

    const handleSave = (productId) => {
        const updatedDetails = {
            shape: editedProduct.shape,
            length: editedProduct.length,
            thickness: editedProduct.thickness,
            price:editedProduct.price
        };
        onQuickEdit(productId, updatedDetails);
        // console.log(editedProduct)
        setExpandedRowId(null);
    };

    const formatProductName = (product, material, grade) => {
        return `${material.name} ${grade.name} ${product.name}`;
    };


    const formatProductDetails = (product) => {
        const { shape, length, thickness } = product;
         return `Shape: ${shape || 'empty'},
          Length: ${length || 'empty'},
           Thickness: ${thickness || 'empty'}`;
        
    };

    
 
    return (
       

        <table className='product-table'>
        <thead>
            <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Actions</th>
                <th>Product Details</th>
                <th>Price per Unit</th>
            </tr>
        </thead>
        <tbody>
            {products.map(product => (
                <React.Fragment key={product._id}>
                    <tr>
                        <td><input type="checkbox" /></td>
                        <td>
                            {formatProductName(
                            product.productId,
                            product.materialId,
                            product.gradeId
                        )}
                     
                        </td>
                        <td>
                            <span onClick={() => handleExpandRow(product._id, product)} className='edit-btn'>
                                {expandedRowId === product._id ? 'Collapse' : 'Quick Edit'}
                            </span>
                        </td>
                        <td>
                            
                                 {formatProductDetails(product)}
                               
                        </td>
                        <td>
                            {product.price ? `${product.price}/KG` : 'No price' }
                        </td>
                    </tr>
                    {expandedRowId === product._id && (
                        <tr>
                            <td colSpan="5" className='expandable-row'>

                                <div className='product-details'>
                                   
                                     <div>
                                    <label>Shape</label>
                                    <input
                                        className='product-details-input'
                                        type="text"
                                        placeholder="Shape"
                                        value={editedProduct.shape || ''}
                                        onChange={(e) => handleChange(e, 'shape')}
                                    />
                                    
                                    
                                    <label>Length</label>
                                    <input
                                       className='product-details-input'
                                        type="text"
                                        placeholder="Length"
                                        value={editedProduct.length || ''}
                                        onChange={(e) => handleChange(e, 'length')}
                                    />
                                   </div>
                                   <div>
                                    <label>Thickness</label>
                                    <input
                                    className='product-details-input'
                                        type="text"
                                        placeholder="Thickness"
                                        value={editedProduct.thickness || ''}
                                        onChange={(e) => handleChange(e, 'thickness')}
                                    />

                                 <label>Price</label>
                                 <input
                                    className='product-details-input'
                                        type="number"
                                        placeholder="price/KG"
                                        value={editedProduct.price || ''}
                                        onChange={(e) => handleChange(e, 'price')}
                                    />
                                   </div> 
                                </div>
                                <div>
                                <button onClick={() => handleSave(product._id)} className='btn addBtn'>Save</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </React.Fragment>
            ))}
        </tbody>
    </table>
   
    );
}

export default ProductTable;
