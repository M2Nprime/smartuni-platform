package com.university.order_service.messaging;

import java.io.Serializable;

public class InventoryReserveResponse implements Serializable {
    public String sagaId;
    public boolean success;
    public String reason;

    public InventoryReserveResponse() {}
    public InventoryReserveResponse(String sagaId, boolean success, String reason) {
        this.sagaId = sagaId; this.success = success; this.reason = reason;
    }
}