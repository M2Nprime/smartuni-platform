package com.university.order_service.compensations;

import org.springframework.stereotype.Component;
import com.university.order_service.model.SagaContext;

@Component
public class ReleaseInventoryCompensation {

    private String status;
    private String data;

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    public void compensate(SagaContext context) {
        System.out.println("Compensating inventory for order: " + context.getOrderId());
    }
}