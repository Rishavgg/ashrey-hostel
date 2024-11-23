package com.manager.ashrey.config;

import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class JwtBlacklist {

    private Set<String> blacklistedTokens = new HashSet<>();

    public boolean isBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public void removeFromBlacklist(String token) {
        blacklistedTokens.remove(token);
    }
}

