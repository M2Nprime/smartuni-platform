package com.university.order_service.messaging;

import java.io.Serializable;

public class PaymentChargeResponse implements Serializable {
    public String sagaId;
    public boolean success;
    public String reason;

    public PaymentChargeResponse() {}
    public PaymentChargeResponse(String sagaId, boolean success, String reason) {
        this.sagaId = sagaId; this.success = success; this.reason = reason;
    }
}