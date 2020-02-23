package org.example.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import org.example.service.user.ValidationError;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BindExceptionMapper implements ExceptionMapper<BindException> {
    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Response toResponse(BindException errors) {
        List<ValidationError> validationErrors = new ArrayList<>();
        for (ObjectError error : errors.getAllErrors()) {
            ValidationError validationError = new ValidationError(error.getObjectName(), null, error.getCode(),
                    error.getDefaultMessage(), error.getArguments());
            if (error instanceof FieldError) {
                validationError.setField(((FieldError) error).getField());
            }
            validationErrors.add(validationError);
        }
        String errorJson = null;
        try {
            errorJson = objectMapper.writeValueAsString(validationErrors);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return Response.status(Response.Status.BAD_REQUEST).entity(errorJson).type(MediaType.APPLICATION_JSON).build();
    }
}