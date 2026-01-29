package org.hati.room.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hati.room.mapper.RoomMapper;
import org.hati.room.vo.CenterVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class CenterServiceImpl implements CenterService {
    
    @Autowired
    private RoomMapper roomMapper;
    
    @Override
    public List<CenterVO> getCenterList() {
        log.info("전체 센터 리스트 조회");
        return roomMapper.getCenterList(null);
    }
    
    @Override
    public List<CenterVO> getCenterList(String region, String category, String sortType) {
        log.info("필터링된 센터 리스트 조회 - region: " + region + ", category: " + category);
        
        Map<String, Object> params = new HashMap<>();
        params.put("region", region);
        params.put("category", category);
        params.put("sortType", sortType);
        
        return roomMapper.getCenterList(params);
    }
    
    @Override
    public CenterVO getCenterDetail(int centerId) {
        log.info("센터 상세 정보 조회 - centerId: " + centerId);
        return roomMapper.getCenterDetail(centerId);
    }
}