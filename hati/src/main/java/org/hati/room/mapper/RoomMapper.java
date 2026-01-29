package org.hati.room.mapper;

import java.util.List;
import java.util.Map;


import org.hati.room.vo.CenterVO;


public interface RoomMapper {
    
    // 센터 리스트 조회
    List<CenterVO> getCenterList(Map<String, Object> params);
    
    // 센터 상세 조회
    CenterVO getCenterDetail(int centerId);
}