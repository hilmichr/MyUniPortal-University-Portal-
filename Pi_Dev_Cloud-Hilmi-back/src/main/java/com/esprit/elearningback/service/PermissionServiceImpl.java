package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Permission;
import com.esprit.elearningback.repository.PermissionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PermissionServiceImpl implements IPermissionService{
    PermissionRepository permissionRepository;

    public List<Permission> retrieveAllPermissions() {
        return permissionRepository.findAll();
    }

    public Permission retrievePermission(Long idPermission) {
        return permissionRepository.findById(idPermission).get();
    }

    public Permission addPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public void removePermission(Long idPermission) {
        permissionRepository.deleteById(idPermission);
    }

    public Permission modifyPermission(Permission permission) {
        return permissionRepository.save(permission);
    }
}
