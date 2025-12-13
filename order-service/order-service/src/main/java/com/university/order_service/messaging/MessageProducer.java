package com.university.order_service.messaging;

import com.university.order_service.config.RabbitConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class MessageProducer {
    private final RabbitTemplate rabbit;

    public MessageProducer(RabbitTemplate rabbit) {
        this.rabbit = rabbit;
    }

    public void sendInventoryReserve(InventoryReserveRequest req) {
        rabbit.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_INVENTORY_RESERVE, req);
    }

    public void sendPaymentCharge(PaymentChargeRequest req) {
        rabbit.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_PAYMENT_CHARGE, req);
    }
    public void sendInventoryResponse(InventoryReserveResponse resp) {
        rabbit.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_INVENTORY_RESPONSE, resp);
    }

    public void sendPaymentResponse(PaymentChargeResponse resp) {
        rabbit.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_PAYMENT_RESPONSE, resp);
    }
}