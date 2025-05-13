package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Role;
import com.esprit.elearningback.service.IRoleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/role")
@CrossOrigin("*")
public class RoleRestController {
    IRoleService RoleService;
    // http://localhost:8089/projetpi/Role/retrieve-all-Roles
    @GetMapping("/retrieve-all-Roles")
    public List<Role> getRoles() {
        List<Role> listRoles = RoleService.retrieveAllRoles();
        return listRoles;
    }
    // http://localhost:8089/projetpi/Role/retrieve-Role/8
    @GetMapping("/retrieve-Role/{Role-id}")
    public Role retrieveRole(@PathVariable("Role-id") Long chId) {
        Role Role = RoleService.retrieveRole(chId);
        return Role;
    }
    // http://localhost:8089/projetpi/Role/add-Role
    @PostMapping("/add-Role")
    public Role addRole(@RequestBody Role c) {
        Role Role = RoleService.addRole(c);
        return Role;
    }
    // http://localhost:8089/projetpi/Role/remove-Role/{Role-id}
    @DeleteMapping("/remove-Role/{Role-id}")
    public void removeRole(@PathVariable("Role-id") Long chId) {
        RoleService.removeRole(chId);
    }
    // http://localhost:8089/projetpi/Role/modify-Role
    @PutMapping("/modify-Role")
    public Role modifyRole(@RequestBody Role c) {
        Role Role = RoleService.modifyRole(c);
        return Role;
    }
}
