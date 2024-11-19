package com.security.jwt;

import com.security.jwt.model.User;
import com.security.jwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class StartApplication implements CommandLineRunner {

    @Autowired
    private UserRepository repository;

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        // Criação do usuário admin
        createUserIfNotExists("admin", "123", "ROLE_ADMIN");

        // Criação do usuário user
        createUserIfNotExists("user", "123", "ROLE_USER");
    }

    private void createUserIfNotExists(String username, String password, String role) {
        Optional<User> optionalUser = repository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(new BCryptPasswordEncoder().encode(password));
            user.getRoles().add(role);
            repository.save(user);
        }
    }
}
