package com.university.order_service.messaging;

import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import com.university.order_service.orchestrator.OrderSagaOrchestrator;

@Component
public class SagaConsumers {

    private final OrderSagaOrchestrator orchestrator;

    public SagaConsumers(OrderSagaOrchestrator orchestrator) {
        this.orchestrator = orchestrator;
    }

    @RabbitListener(queues = "inventory.response.queue")
    public void inventoryResponseListener(Object payload) {

        System.out.println("inventory response payload: " + payload);

    }

    @RabbitListener(queues = "payment.response.queue")
    public void paymentResponseListener(Object payload) {
        System.out.println("payment response payload: " + payload);
    }
}