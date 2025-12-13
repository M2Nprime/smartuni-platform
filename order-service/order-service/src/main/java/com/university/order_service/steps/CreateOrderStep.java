package com.university.order_service.steps;

import org.springframework.stereotype.Component;
import com.university.order_service.model.SagaContext;

@Component
public class CreateOrderStep {

    private String status;
    private String data;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
    public void process(SagaContext context) {

        System.out.println("Processing order creation for order: " + context.getOrderId());
        this.status = "COMPLETED";
    }
}