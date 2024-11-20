package com.manager.ashrey.repository;
import com.manager.ashrey.entity.Outpass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutpassRepository extends JpaRepository<Outpass, Long> {
    List<Outpass> findByStudentStudentId(Long studentId);
}

