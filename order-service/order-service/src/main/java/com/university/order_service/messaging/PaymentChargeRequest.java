package com.university.order_service.messaging;

import java.io.Serializable;

public class PaymentChargeRequest implements Serializable {
    public String sagaId;
    public String orderId;
    public double amount;

    public PaymentChargeRequest() {}
    public PaymentChargeRequest(String sagaId, String orderId, double amount) {
        this.sagaId = sagaId; this.orderId = orderId; this.amount = amount;
    }
}