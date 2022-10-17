package com.carlos.demo.controllers;

import com.carlos.demo.models.PriceReductions;
import com.carlos.demo.models.Product;
import com.carlos.demo.models.Supplier;
import com.carlos.demo.security.ProductDTO;
import com.carlos.demo.security.ReasonDTO;
import com.carlos.demo.service.PriceReductionsProductsService;
import com.carlos.demo.service.ProductService;
import com.carlos.demo.service.SuppliersProductsService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired private ProductService productService;
    @Autowired private SuppliersProductsService suppliersProductsService;
    @Autowired private PriceReductionsProductsService priceReductionsProductsService;

    @PostMapping("/product")
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    //hasRole(...) set a prefix for the the content - the default one is ROLE_ -> hasRole('ADMIN') = ROLE_ADMIN
    //hasAuthority(...) checks the content WITHOUT a prefix, i.e. just the pure content -> hasAuthority('ADMIN') = ADMIN
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/products")
    public ResponseEntity<Object> getProducts(){
        List<Product> prod = productService.getProducts();

        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @GetMapping("/product")
    public ResponseEntity<Object> getProduct(@RequestParam(value = "itemCode") Integer itemCode){
        Product prod = productService.findProductByItemCode(itemCode);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @GetMapping("/product/state")
    public ResponseEntity<Object> getProductByState(@RequestParam(value = "state") Boolean state){
        List<Product> prod = productService.getProductByState(state);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @PutMapping("/product")
    public ResponseEntity<Object> updateProduct(@RequestParam("id") Integer id, @RequestBody ProductDTO product){
        try{
            Product prod = productService.updateProduct(id, product);
            return new ResponseEntity<>(prod, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/product/changestate")
    public ResponseEntity<Object> changeProductState(@RequestParam(value = "id") Integer id, @RequestBody ReasonDTO reason){
        Product prod = productService.changeProductState(id, reason);
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id){
        productService.deleteProduct(id);
        return new ResponseEntity<>("Product with id: " + id + " deleted successfully", HttpStatus.OK);
    }
}
