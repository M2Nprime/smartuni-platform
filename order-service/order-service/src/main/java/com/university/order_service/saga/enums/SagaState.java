package com.university.order_service.saga.enums;

public enum SagaState {
    STARTED,
    ORDER_CREATED,
    INVENTORY_RESERVED,
    PAYMENT_CHARGED,
    COMPLETED,
    FAILED,
    COMPENSATING,
    CANCELLED
}