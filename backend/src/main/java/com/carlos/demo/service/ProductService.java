package com.carlos.demo.service;

import com.carlos.demo.models.Product;
import com.carlos.demo.repository.ProductsRepository;
import com.carlos.demo.security.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
public class ProductService implements ProductServiceInterface {

    @Autowired private ProductsRepository productsRepository;

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

    public List<Product> getProducts() {
        return productsRepository.findAll();
    }

    public Product getProduct(Integer productId) {
        return productsRepository.findById(productId).get();
    }

    public Product updateProduct(Integer productId, ProductDTO newProduct) {
        Product product = productsRepository.findById(productId).get();

        if(!product.getState()){
            return null;
        }

        if(newProduct.getItemCode() != 0) {
            product.setItemCode(newProduct.getItemCode());
        }

        if(Objects.nonNull(newProduct.getDescription()) && !"".equalsIgnoreCase(newProduct.getDescription())){
            product.setDescription(newProduct.getDescription());
        }

        if(Objects.nonNull(newProduct.getPrice())){
            product.setPrice(newProduct.getPrice());
        }

        if(Objects.nonNull(newProduct.getState())){
            product.setState(newProduct.getState());
        } else {
            product.setState(true);
        }

        if(newProduct.getCreatorId() != 0){
            product.setCreatorId(newProduct.getCreatorId());
        }

        if(Objects.nonNull(newProduct.getSuppliers())){
            product.setSuppliers(newProduct.getSuppliers());
        }

        return productsRepository.save(product);
    }

    public void deleteProduct(Integer productId) {
        productsRepository.deleteById(productId);
    }

    public void changeProductState(Integer productId){
        Product product = productsRepository.findById(productId).get();
        product.setState(!product.getState());

        productsRepository.save(product);
    }

    public List<Product> getProductByState(Boolean state) {
        return productsRepository.findAllByState(state);
    }
}
