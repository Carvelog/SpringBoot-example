package com.carlos.demo.service;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Supplier;
import com.carlos.demo.repository.SuppliersProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SuppliersProductsService implements SuppliersProductsServiceInterface{

    @Autowired private SuppliersProductsRepository suppliersProductsRepository;

    @Override
    public Set<Supplier> getSuppliersForThisProduct(Integer id) {
        return new HashSet<>(suppliersProductsRepository.findSuppliersByProductId(id));
    }

    @Override
    public List<Product> getProductsForThisSupplier(Integer id) {
//        List<Integer> productsIdList = (List<Integer>) suppliersProductsRepository.findAll();
//        List<Product> products = new ArrayList<Product>();
//
//        for(Integer prodId : productsIdList){
//            products.add(productService.getProduct(prodId));
//        }
//
//        return products;
        return null;
    }
}