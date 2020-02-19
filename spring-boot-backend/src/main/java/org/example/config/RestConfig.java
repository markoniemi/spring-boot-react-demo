package org.example.config;

import javax.annotation.Resource;

import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.transport.servlet.CXFServlet;
import org.example.service.user.HelloService;
import org.example.service.user.UserService;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

@Configuration
// @RestControllerAdvice(basePackages="org.survey")
public class RestConfig {
    @Resource
    private UserService userService;
    @Resource
    private HelloService helloService;
    @Resource
    private RestServiceFactory restServiceFactory;

    @Bean(destroyMethod = "shutdown")
    public SpringBus cxf() {
        return new SpringBus();
    }
    
    @Bean(destroyMethod = "destroy")
    @DependsOn("cxf")
    public Server jaxRsServer() {
        restServiceFactory.registerServices("/rest", userService, helloService);
        return restServiceFactory.create();
    }
    
    @Bean
    public ServletRegistrationBean cxfServlet() {
        final ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean(new CXFServlet(), "/api/*");
        servletRegistrationBean.setLoadOnStartup(1);
        return servletRegistrationBean;
    }
}
