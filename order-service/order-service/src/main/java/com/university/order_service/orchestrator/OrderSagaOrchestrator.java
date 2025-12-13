package com.university.order_service.orchestrator;

import com.university.order_service.steps.CreateOrderStep;
import com.university.order_service.compensations.ReleaseInventoryCompensation;
import com.university.order_service.saga.SagaInstance;
import com.university.order_service.saga.SagaInstanceRepository;
import com.university.order_service.saga.enums.SagaState;
import com.university.order_service.model.SagaContext;

import org.springframework.stereotype.Component;

@Component
public class OrderSagaOrchestrator {

    private final CreateOrderStep createOrderStep;
    private final ReleaseInventoryCompensation releaseInventoryCompensation;
    private final SagaInstanceRepository sagaInstanceRepository;

    public OrderSagaOrchestrator(
            CreateOrderStep createOrderStep,
            ReleaseInventoryCompensation releaseInventoryCompensation,
            SagaInstanceRepository sagaInstanceRepository
    ) {
        this.createOrderStep = createOrderStep;
        this.releaseInventoryCompensation = releaseInventoryCompensation;
        this.sagaInstanceRepository = sagaInstanceRepository;
    }

    public void startSaga(SagaContext context) {


        SagaInstance sagaInstance = new SagaInstance();
        sagaInstance.setSagaId(context.getOrderId());
        sagaInstance.setState(SagaState.STARTED);
        sagaInstanceRepository.save(sagaInstance);

        try {


            createOrderStep.process(context);

            sagaInstance.setState(SagaState.COMPLETED);

        } catch (Exception e) {


            releaseInventoryCompensation.compensate(context);

            sagaInstance.setState(SagaState.FAILED);
        }

        sagaInstanceRepository.save(sagaInstance);
    }
}