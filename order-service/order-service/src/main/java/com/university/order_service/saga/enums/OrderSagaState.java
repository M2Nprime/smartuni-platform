package com.university.order_service.saga.enums;

public enum OrderSagaState {
    CREATED,
    INVENTORY_RESERVED,
    PAYMENT_COMPLETED,
    ORDER_COMPLETED,
    CANCELLED
}