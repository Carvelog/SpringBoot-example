package com.carlos.demo.controllers;

import com.carlos.demo.models.Supplier;
import com.carlos.demo.service.SupplierServiceInterface;
import com.carlos.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierServiceInterface supplierService;
    @Autowired private UserService userService;

    @PostMapping("/supplier")
    public Supplier saveSupplier(@RequestBody Supplier supplier){
        return supplierService.saveSupplier(supplier);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/suppliers")
    public List<Supplier> getSuppliers(){
//        UserDetails details = userService.loadUserByUsername("pepa");
//        if (details != null && details.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
//            // ...
//        return supplierService.getSuppliers();
//        } else{
//            return null;
//        }
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
