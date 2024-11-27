package com.manager.ashrey.controller;

import com.manager.ashrey.dto.BlockDto;
import com.manager.ashrey.entity.Block;
import com.manager.ashrey.repository.BlockRepository;
import com.manager.ashrey.service.BlockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/block")
public class BlockController {

    @Autowired
    private BlockService blockService;

    @PostMapping(value = "/addBlock")
    public Block createBlock(@RequestBody BlockDto blockDto) {
        return blockService.createBlock(blockDto);
    }

}
