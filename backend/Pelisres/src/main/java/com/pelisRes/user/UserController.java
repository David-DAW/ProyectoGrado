package com.pelisRes.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class UserController {

    private final UserRepository userRepository;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();  
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();  
    }
    

    // @PutMapping("/{id}/role")
    // public ResponseEntity<Void> updateUserRole(@PathVariable Integer id, @RequestBody RoleUpdateRequest request) {
    //     User user = userRepository.findById(id)
    //             .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    //     Role newRole = Role.valueOf(request.getRole().toUpperCase()); 
    //     user.setRole(newRole);
    //     userRepository.save(user);
    //     return ResponseEntity.ok().build();
    // }
}
