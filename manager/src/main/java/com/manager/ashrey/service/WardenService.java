package com.manager.ashrey.service;

import com.manager.ashrey.entity.Warden;

public interface WardenService {

    public Warden createWarden(Warden warden);

    public Warden getWardenById(Long wardenId);

    public void deleteWarden(Long wardenId);
}
