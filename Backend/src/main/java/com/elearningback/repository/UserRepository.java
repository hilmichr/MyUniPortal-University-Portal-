package com.esprit.elearningback.repository;

import com.esprit.elearningback.entity.User;
import com.esprit.elearningback.entity.rle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User,Long>{
    boolean existsByUseremail(String useremail);

    Optional<User> findByUseremail(String useremail);
    long countByRle(rle role);


}
