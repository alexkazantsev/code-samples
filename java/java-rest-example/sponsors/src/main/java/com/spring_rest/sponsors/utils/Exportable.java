package com.spring_rest.sponsors.utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Exportable {

  String value() default "";

  boolean enabled() default true;

  Class forcedType() default Void.class;


}
