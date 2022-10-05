package com.carlos.demo.service;

import com.carlos.demo.Models.Product;

import java.util.List;

public interface ProductServiceInterface {
    Product saveProduct(Product product);
    List<Product> getProducts();
    Product getProduct(Integer productId);
    Product updateProduct(Integer productId, Product product);
    void deleteProduct(Integer productId);
}
