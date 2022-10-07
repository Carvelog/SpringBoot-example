package com.carlos.demo.service;

import com.carlos.demo.models.Supplier;

import java.util.List;

public interface SupplierServiceInterface {
    Supplier saveSupplier(Supplier supplier);
    List<Supplier> getSuppliers();
    Supplier getSupplier(Integer supplierId);
    Supplier updateSupplier(Integer supplierId,Supplier supplier);
    void deleteSupplier(Integer supplierId);
}
