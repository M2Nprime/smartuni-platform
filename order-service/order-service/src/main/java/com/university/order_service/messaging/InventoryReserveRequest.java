package com.university.order_service.messaging;

import java.io.Serializable;

public class InventoryReserveRequest implements Serializable {
    public String sagaId;
    public String orderId;
    public String productId;
    public int qty;

    public InventoryReserveRequest() {}
    public InventoryReserveRequest(String sagaId, String orderId, String productId, int qty) {
        this.sagaId = sagaId; this.orderId = orderId; this.productId = productId; this.qty = qty;
    }
}