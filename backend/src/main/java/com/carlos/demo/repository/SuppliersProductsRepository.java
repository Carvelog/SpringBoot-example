package com.carlos.demo.repository;

import com.carlos.demo.models.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SuppliersProductsRepository extends JpaRepository<Supplier, Integer> {

    @Query(value = "SELECT * FROM SUPPLIERS s LEFT JOIN SUPPLIERSPRODUCTS sp ON s.ID = sp.SUPPLIERID WHERE sp.PRODUCTID=?1", nativeQuery = true)
    List<Supplier> findSuppliersByProductId(Integer id);
}
