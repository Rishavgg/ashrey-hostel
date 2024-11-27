package com.manager.ashrey.service.serviceImpl;

import com.manager.ashrey.dto.BlockDto;
import com.manager.ashrey.entity.Block;
import com.manager.ashrey.entity.Hostel;
import com.manager.ashrey.repository.BlockRepository;
import com.manager.ashrey.repository.HostelRepository;
import com.manager.ashrey.response.ResponseDTO;
import com.manager.ashrey.service.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlockServiceImpl implements BlockService {

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Block createBlock(BlockDto blockDto) {
        Block block = new Block();
        block.setBlockName(blockDto.getBlockName());

        Hostel hostel = hostelRepository.findById(blockDto.getHostelId()).orElseThrow(() -> new RuntimeException("Hostel not found"));
        block.setHostel(hostel);

        block.setHostel(hostel);

        return blockRepository.save(block);
    }
}
