package org.hati.room.mapper;

import java.util.List;
import java.util.Map;


import org.hati.room.vo.CenterVO;
import org.hati.room.vo.RoomVO;


public interface RoomMapper {
    
    // 센터 리스트 조회 다음엔 dto view 기능 해보자 
    List<CenterVO> getCenterList(Map<String, Object> params);
    
    // 센터 상세 조회
    CenterVO getCenterDetail(int centerId);
    
    //센터 검색
    List<CenterVO> searchCenters(String keyword);
    
    // 페이지네이션 센터 조회 
    List<CenterVO> getPaginatedCenters(Map<String, Object> params);
    
    // 페이지네이션 검색 조회 
    List<CenterVO> getPaginatedSearch(Map<String, Object> params);
    
    //센터의 모든룸 제어
    List<RoomVO> getRoomsByCenter(int centerId);
}