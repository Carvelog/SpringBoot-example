package com.carlos.demo.controllers;

import com.carlos.demo.Models.PriceReductions;
import com.carlos.demo.Models.Product;
import com.carlos.demo.Models.Supplier;
import com.carlos.demo.service.PriceReductionsProductsService;
import com.carlos.demo.service.ProductService;
import com.carlos.demo.service.SuppliersProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class ProductController {
    @Autowired private ProductService productService;
    @Autowired private SuppliersProductsService suppliersProductsService;
    @Autowired private PriceReductionsProductsService priceReductionsProductsService;

    @PostMapping(value = "/product")
    public Product saveProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }

    @GetMapping("/products")
    public List<Product> getProducts(){
        return productService.getProducts();
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Integer id){
        Set<Supplier> suppliers = suppliersProductsService.getSuppliersForThisProduct(id);
        List<PriceReductions> priceReductions = priceReductionsProductsService.getPriceReductionsByProductId(id);

        Product prod = productService.getProduct(id);
        prod.setSuppliers(suppliers);
        prod.setPriceReductions(priceReductions);

        return prod;
    }

    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable("id") Integer id, @RequestBody Product product){
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/product/{id}")
    public String deleteProduct(@PathVariable("id") Integer id){
        productService.deleteProduct(id);
        return "Product with id: " + id + " deleted successfully";
    }
}
