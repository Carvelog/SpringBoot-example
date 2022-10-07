package com.carlos.demo.repository;

import com.carlos.demo.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductsRepository extends JpaRepository<Product, Integer> {
    @Query(value = "SELECT * FROM PRODUCTS p WHERE p.STATE=?1", nativeQuery = true)
    List<Product> findAllByState(Boolean state);
}