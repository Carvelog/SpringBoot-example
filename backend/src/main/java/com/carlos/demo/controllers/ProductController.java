package com.carlos.demo.controllers;

import com.carlos.demo.models.PriceReductions;
import com.carlos.demo.models.Product;
import com.carlos.demo.models.Supplier;
import com.carlos.demo.security.ProductDTO;
import com.carlos.demo.service.PriceReductionsProductsService;
import com.carlos.demo.service.ProductService;
import com.carlos.demo.service.SuppliersProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired private ProductService productService;
    @Autowired private SuppliersProductsService suppliersProductsService;
    @Autowired private PriceReductionsProductsService priceReductionsProductsService;

    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/products")
    public ResponseEntity<Object> getProducts(){
        List<Product> prod = productService.getProducts();
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @GetMapping("/product")
    public ResponseEntity<Object> getProduct(@RequestParam(value = "id") Integer id){
        Product prod = productService.getProduct(id);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @GetMapping("/product/state")
    public ResponseEntity<Object> getProductByState(@RequestParam(value = "state") Boolean state){
        List<Product> prod = productService.getProductByState(state);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Integer id, @RequestBody ProductDTO product){
        Product prod = productService.updateProduct(id, product);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @PutMapping("/product/changestate")
    public ResponseEntity<String> changeProductState(@RequestParam(value = "id") Integer id){
        productService.changeProductState(id);
        return new ResponseEntity<>("Product state changed successfully", HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product with id: " + id + " deleted successfully", HttpStatus.OK);
    }
}
