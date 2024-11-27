package com.manager.ashrey.repository;

import com.manager.ashrey.entity.Warden;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardenRepository extends JpaRepository<Warden, Long> {
}
