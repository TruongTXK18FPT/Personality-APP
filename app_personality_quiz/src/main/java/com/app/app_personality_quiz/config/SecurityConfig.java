package com.app.app_personality_quiz.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    @Lazy
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // Allow all origins during development
        // Or specifically: configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        configuration.setExposedHeaders(Arrays.asList("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply to all paths
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Allow all OPTIONS requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Swagger UI and API documentation paths - allow public access
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/api-docs/**").permitAll()
                        .requestMatchers("/api-docs/swagger-config").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-resources/**").permitAll()
                        .requestMatchers("/webjars/**").permitAll()

                        // Authentication endpoints - public access
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/auth/register").permitAll()

                        // Authentication endpoints - require authentication
                        .requestMatchers("/api/auth/logout").authenticated()
                        .requestMatchers("/api/auth/profile").authenticated()

                        // Quiz endpoints - require authentication
                        .requestMatchers(HttpMethod.GET, "/api/quiz/category/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/type/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/*/questions").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/question/*/options").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/*/take").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/quiz/submit").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/result/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/quiz/my-results").authenticated()

                        // Chat endpoints - require authentication (with X-User-Id header)
                        .requestMatchers(HttpMethod.GET, "/chat/sessions").authenticated()
                        .requestMatchers(HttpMethod.POST, "/chat/start").authenticated()
                        .requestMatchers(HttpMethod.POST, "/chat/message").authenticated()
                        .requestMatchers(HttpMethod.GET, "/chat/history/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/chat/analyze/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/chat/**").authenticated()

                        // All other requests require authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

