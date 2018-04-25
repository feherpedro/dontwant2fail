package hu.mik.pte.bpnh16.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Dontwant 2 Fail.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

}
