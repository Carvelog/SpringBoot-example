package com.carlos.demo.service;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Supplier;

import java.util.List;
import java.util.Set;

public interface SuppliersProductsServiceInterface {
    Set<Supplier> getSuppliersForThisProduct(Integer id);
    List<Product> getProductsForThisSupplier(Integer id);
}
