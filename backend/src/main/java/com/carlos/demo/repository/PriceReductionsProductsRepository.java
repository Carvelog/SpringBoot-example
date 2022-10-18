package com.carlos.demo.repository;

import com.carlos.demo.models.PriceReductions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PriceReductionsProductsRepository extends JpaRepository<PriceReductions, Integer> {

    @Query(value = "SELECT ID, ENDDATE, REDUCEDPRICE, STARTDATE FROM PRICEREDUCTIONS pr LEFT JOIN PRICEREDUCTIONSPRODUCTS prp ON pr.ID = prp.PRICEREDUCTIONID WHERE prp.PRODUCTID=?1", nativeQuery = true)
    List<PriceReductions> findPriceReductionsByProductId(Integer id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM PRICEREDUCTIONSPRODUCTS prp WHERE prp.PRODUCTID=?1", nativeQuery = true)
    void deleteByProductId(Integer id);
}