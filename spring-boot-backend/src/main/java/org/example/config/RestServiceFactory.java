package org.example.config;

import javax.annotation.Resource;

import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

@Component
public class RestServiceFactory {
    private final JAXRSServerFactoryBean factory = new JAXRSServerFactoryBean();
    @Resource
    private SpringBus bus;

    public void registerServices(String address, Object... beanObjects) {
        factory.setServiceBeanObjects(beanObjects);
        factory.setProvider(new JacksonJaxbJsonProvider());
        factory.setBus(bus);
        factory.setAddress(address);
    }

    public Server create() {
        return factory.create();
    }
}
