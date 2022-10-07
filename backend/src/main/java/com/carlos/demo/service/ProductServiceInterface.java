package com.carlos.demo.service;

import com.carlos.demo.models.Product;
import com.carlos.demo.security.ProductDTO;

import java.util.List;

public interface ProductServiceInterface {
    Product saveProduct(Product product);
    List<Product> getProducts();
    Product getProduct(Integer productId);
    Product updateProduct(Integer productId, ProductDTO product);
    void deleteProduct(Integer productId);
    List<Product> getProductByState(Boolean state);
}
