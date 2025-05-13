package com.esprit.elearningback.service;

import com.esprit.elearningback.entity.Role;
import com.esprit.elearningback.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements IRoleService{
    RoleRepository roleRepository;

    public List<Role> retrieveAllRoles() {
        return roleRepository.findAll();
    }

    public Role retrieveRole(Long idRole) {
        return roleRepository.findById(idRole).get();
    }

    public Role addRole(Role Role) {
        return roleRepository.save(Role);
    }

    public void removeRole(Long idRole) {
        roleRepository.deleteById(idRole);
    }

    public Role modifyRole(Role Role) {
        return roleRepository.save(Role);
    }
}
