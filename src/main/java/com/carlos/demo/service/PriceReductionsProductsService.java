package com.carlos.demo.service;

import com.carlos.demo.models.PriceReductions;
import com.carlos.demo.repository.PriceReductionsProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriceReductionsProductsService implements PriceReductionsProductsServiceInterface{

    @Autowired private PriceReductionsProductsRepository priceReductionsProductsRepository;

    @Override
    public List<PriceReductions> getPriceReductionsByProductId(Integer id) {
        return priceReductionsProductsRepository.findPriceReductionsByProductId(id);
    }
}
