import React from 'react';
import { useParams } from 'react-router-dom';
import CommentComponent from '../Comments';

const ProductPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Product Page</h1>
            {/* Hiển thị thông tin sản phẩm */}
            <CommentComponent productId={id} />
        </div>
    );
};

export default ProductPage;
