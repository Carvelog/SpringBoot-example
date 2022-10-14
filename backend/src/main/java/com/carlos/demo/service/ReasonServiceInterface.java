package com.carlos.demo.service;

import com.carlos.demo.models.Reason;

import java.util.List;

public interface ReasonServiceInterface {
    List<Reason> getReasonsByProductId(Integer productID);
    public Reason saveReason(Reason reason);
}
