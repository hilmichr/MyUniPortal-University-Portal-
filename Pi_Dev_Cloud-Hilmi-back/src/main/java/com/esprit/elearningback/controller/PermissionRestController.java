package com.esprit.elearningback.controller;

import com.esprit.elearningback.entity.Permission;
import com.esprit.elearningback.service.IPermissionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/permission")
@CrossOrigin("*")

public class PermissionRestController {
    IPermissionService PermissionService;
    // http://localhost:8089/projetpi/Permission/retrieve-all-Permissions
    @GetMapping("/retrieve-all-Permissions")
    public List<Permission> getPermissions() {
        List<Permission> listPermissions = PermissionService.retrieveAllPermissions();
        return listPermissions;
    }
    // http://localhost:8089/projetpi/Permission/retrieve-Permission/8
    @GetMapping("/retrieve-Permission/{Permission-id}")
    public Permission retrievePermission(@PathVariable("Permission-id") Long chId) {
        Permission Permission = PermissionService.retrievePermission(chId);
        return Permission;
    }
    // http://localhost:8089/projetpi/Permission/add-Permission
    @PostMapping("/add-Permission")
    public Permission addPermission(@RequestBody Permission c) {
        Permission Permission = PermissionService.addPermission(c);
        return Permission;
    }
    // http://localhost:8089/projetpi/Permission/remove-Permission/{Permission-id}
    @DeleteMapping("/remove-Permission/{Permission-id}")
    public void removePermission(@PathVariable("Permission-id") Long chId) {
        PermissionService.removePermission(chId);
    }
    // http://localhost:8089/projetpi/Permission/modify-Permission
    @PutMapping("/modify-Permission")
    public Permission modifyPermission(@RequestBody Permission c) {
        Permission Permission = PermissionService.modifyPermission(c);
        return Permission;
    }
}
