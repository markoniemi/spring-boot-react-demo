package org.example.config;

import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.example.rest.BindExceptionMapper;
import org.example.rest.EntityNotFoundExceptionMapper;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

public class RestServiceFactory extends JAXRSServerFactoryBean {
    public RestServiceFactory() {
        // settings that can be overridden
        setProvider(new JacksonJaxbJsonProvider());
    }

    @Override
    public Server create() {
        // settings that we want to enforce
        setProvider(new BindExceptionMapper());
        setProvider(new EntityNotFoundExceptionMapper());
        return super.create();
    }
}
