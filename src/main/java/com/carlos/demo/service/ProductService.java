package com.carlos.demo.service;

import com.carlos.demo.Models.Product;
import com.carlos.demo.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class ProductService implements ProductServiceInterface {

    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public Product saveProduct(Product product) {
        if(!Objects.nonNull(product.getState())){
            product.setState(true);
        }
        if(!Objects.nonNull(product.getCreationDate())){
            Date date = new Date();
            product.setCreationDate(date);
        }
        return productsRepository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        return (List<Product>) productsRepository.findAll();
    }

    @Override
    public Product getProduct(Integer productId) {
        return productsRepository.findById(productId).get();
    }

    @Override
    public Product updateProduct(Integer productId, Product newProduct) {
        Product product = productsRepository.findById(productId).get();

        if(Objects.nonNull(newProduct.getItemCode())) {
            product.setItemCode(newProduct.getItemCode());
        }

        if(Objects.nonNull(newProduct.getDescription()) && !"".equalsIgnoreCase(newProduct.getDescription())){
            product.setDescription(newProduct.getDescription());
        }

        if(Objects.nonNull(newProduct.getCreationDate()) && !"".equalsIgnoreCase(newProduct.getDescription())){
            product.setCreationDate(newProduct.getCreationDate());
        }

        if(Objects.nonNull(newProduct.getPrice())){
            product.setPrice(newProduct.getPrice());
        }

        if(Objects.nonNull(newProduct.getState())){
            product.setState(newProduct.getState());
        } else {
            product.setState(true);
        }

        if(Objects.nonNull(newProduct.getCreatorId())){
            product.setCreatorId(newProduct.getCreatorId());
        }

        if(Objects.nonNull(newProduct.getSuppliers())){
            product.setSuppliers(newProduct.getSuppliers());
        }

        return productsRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer productId) {
        productsRepository.deleteById(productId);
    }
}
