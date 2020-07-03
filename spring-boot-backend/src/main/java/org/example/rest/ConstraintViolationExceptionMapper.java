package org.example.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Path.Node;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.example.service.user.ValidationError;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {
    ObjectMapper objectMapper = new ObjectMapper();

    public Response toResponse(ConstraintViolationException exception) {
        List<ValidationError> validationErrors = exception.getConstraintViolations().stream().map(this::createValidationError)
                .collect(Collectors.toList());
        return Response.status(Response.Status.BAD_REQUEST).entity(asJson(validationErrors))
                .type(MediaType.APPLICATION_JSON).build();
    }

    private String asJson(List<ValidationError> validationErrors) {
        try {
            return objectMapper.writeValueAsString(validationErrors);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    private ValidationError createValidationError(ConstraintViolation<?> violation) {
        ValidationError validationError = new ValidationError();
        validationError.setObjectName(violation.getLeafBean().getClass().getSimpleName());
        for (Node node : violation.getPropertyPath()) {
            validationError.setField(node.getName());
        }
        validationError.setCode(violation.getMessageTemplate());
        validationError.setDefaultMessage(violation.getMessageTemplate());
        return validationError;
    }
}