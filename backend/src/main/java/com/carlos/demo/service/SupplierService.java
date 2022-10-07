package com.carlos.demo.service;

import com.carlos.demo.models.Supplier;
import com.carlos.demo.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SupplierService implements SupplierServiceInterface{

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public Supplier saveSupplier(Supplier Supplier) {
        return supplierRepository.save(Supplier);
    }

    @Override
    public List<Supplier> getSuppliers() {
        return (List<Supplier>) supplierRepository.findAll();
    }

    @Override
    public Supplier getSupplier(Integer supplierId) {
        return supplierRepository.findById(supplierId).get();
    }

    @Override
    public Supplier updateSupplier(Integer supplierId, Supplier newSupplier) {
        Supplier supplier = supplierRepository.findById(supplierId).get();

        if(Objects.nonNull(newSupplier.getName()) && !"".equalsIgnoreCase(newSupplier.getCountry())) {
            supplier.setName(newSupplier.getName());
        }

        if(Objects.nonNull(newSupplier.getCountry()) && !"".equalsIgnoreCase(newSupplier.getCountry())){
            supplier.setCountry(newSupplier.getCountry());
        }

        if(Objects.nonNull(newSupplier.getCountry())){
            supplier.setProducts(newSupplier.getProducts());
        }

        return supplierRepository.save(supplier);
    }

    @Override
    public void deleteSupplier(Integer supplierId) {
        supplierRepository.deleteById(supplierId);
    }
}
