package com.carlos.demo.repository;

import com.carlos.demo.models.Supplier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends CrudRepository<Supplier, Integer> {
    boolean existsByName(String supplierName);
}