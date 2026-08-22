package com.cinebook.cinebook.config;

import com.cinebook.cinebook.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import com.cinebook.cinebook.entity.Role;

import java.util.Optional;

@Configuration
public class DataIntializer implements CommandLineRunner {
    private final RoleRepository roleRepository;

    public DataIntializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Optional<Role> adminRole=roleRepository.findByName("ROLE_ADMIN");
       if(adminRole.isEmpty()){
           Role admin=new Role();
           admin.setName("ROLE_ADMIN");
           roleRepository.save(admin);
       }

       Optional<Role>userROle=roleRepository.findByName("ROLE_USER");
       if(userROle.isEmpty()){
           Role user=new Role();
           user.setName("ROLE_USER");
           roleRepository.save(user);
       }

    }
}
