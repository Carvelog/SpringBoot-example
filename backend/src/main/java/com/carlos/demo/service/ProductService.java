package com.carlos.demo.service;

import com.carlos.demo.models.Product;
import com.carlos.demo.models.Reason;
import com.carlos.demo.models.User;
import com.carlos.demo.repository.ProductsRepository;
import com.carlos.demo.repository.ReasonRepository;
import com.carlos.demo.repository.UserRepository;
import com.carlos.demo.security.ProductDTO;
import com.carlos.demo.security.ReasonDTO;
import com.carlos.demo.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class ProductService implements ProductServiceInterface {

    @Autowired private ProductsRepository productsRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ReasonRepository reasonRepository;


    public Product saveProduct(Product product) {
        if(!Objects.nonNull(product.getState())){
            product.setState(true);
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!(auth instanceof AnonymousAuthenticationToken)) {
            String username = auth.getName();

            User currentUser = userRepository.findByUsername(username);
            product.setCreatorId(currentUser.getId());
        } else {
            // mocked data
            product.setCreatorId(1);
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

    public Product findProductByItemCode(Integer itemCode) {
        return productsRepository.findProductByItemCode(itemCode);
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

    public Product changeProductState(Integer productId, ReasonDTO reason){
        Product product = productsRepository.findById(productId).get();
        product.setState(!product.getState());
        Reason newReason = new Reason(1, reason.getDescription(), product);
        product.addReason(newReason);

        productsRepository.save(product);

        return product;
    }

    public List<Product> getProductByState(Boolean state) {
        return productsRepository.findAllByState(state);
    }
}
