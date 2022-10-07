package com.carlos.demo.controllers;

import com.carlos.demo.models.Supplier;
import com.carlos.demo.service.SupplierServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SupplierController {

    @Autowired
    private SupplierServiceInterface supplierService;

    @PostMapping("/supplier")
    public Supplier saveSupplier(@RequestBody Supplier supplier){
        return supplierService.saveSupplier(supplier);
    }

    @GetMapping("/supplier")
    public List<Supplier> getSuppliers(){
        return supplierService.getSuppliers();
    }

    @PutMapping("/supplier/{id}")
    public Supplier updateSupplier(@PathVariable("id") Integer id, @RequestBody Supplier supplier){
        return supplierService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/supplier/{id}")
    public String deleteSupplier(@PathVariable("id") Integer id){
        supplierService.deleteSupplier(id);
        return "Supplier with id: " + id + " deleted successfully";
    }
}
