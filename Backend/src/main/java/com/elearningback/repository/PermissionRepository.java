package com.esprit.elearningback.repository;
import com.esprit.elearningback.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PermissionRepository extends JpaRepository<Permission,Long>{
}
