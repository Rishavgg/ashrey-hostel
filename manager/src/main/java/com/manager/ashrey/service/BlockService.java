package com.manager.ashrey.service;

import com.manager.ashrey.dto.BlockDto;
import com.manager.ashrey.entity.Block;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockService  {

    Block createBlock(BlockDto blockDto);

}
