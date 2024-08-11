import React from 'react';
import CommentComponent from '../Comment';

const ProductPage = ({ productId }) => {
  return (
    <div>
      {/* Hiển thị thông tin sản phẩm */}
      <h1>Product Page</h1>

      {/* Hiển thị component bình luận */}
      <CommentComponent productId={productId} />
    </div>
  );
};

export default ProductPage;