package com.carlos.demo.repository;

import com.carlos.demo.models.Reason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReasonRepository extends JpaRepository<Reason, Integer> {

    @Query(value = "SELECT * FROM REASON WHERE PRODUCTID=?1", nativeQuery = true)
    List<Reason> getReasonsByProductId(Integer productId);
}
