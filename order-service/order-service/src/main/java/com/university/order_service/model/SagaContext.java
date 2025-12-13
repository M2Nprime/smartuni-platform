package com.university.order_service.model;

import java.util.Map;

public class SagaContext {
    private String sagaId;
    private Map<String, Object> data;
    private String state;
    private Long orderId;

    public Long getOrderId() {
        return this.orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }
}