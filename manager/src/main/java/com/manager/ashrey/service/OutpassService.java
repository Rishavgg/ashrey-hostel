package com.manager.ashrey.service;

import com.manager.ashrey.entity.Outpass;
import com.manager.ashrey.entity.OutpassStatusEnum;

import java.util.List;

public interface OutpassService {
    public Outpass requestOutpass(Outpass outpass);

    public Outpass getOutpassById(Long outpassId);

    public List<Outpass> getOutpassesByStudentId(Long studentId);

    public Outpass updateOutpassStatus(Long outpassId, OutpassStatusEnum status);

    public void deleteOutpass(Long outpassId);
}
