package com.carlos.demo.service;

import com.carlos.demo.models.Reason;
import com.carlos.demo.repository.ReasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReasonService implements ReasonServiceInterface{

    @Autowired private ReasonRepository reasonRepository;

    public List<Reason> getReasonsByProductId(Integer productID) {
        return reasonRepository.getReasonsByProductId(productID);
    }

    public Reason saveReason(Reason reason){
        return reasonRepository.save(reason);
    }

    public Reason findReasonById(Integer reasonId){
        return reasonRepository.findById(reasonId).get();
    }
}

