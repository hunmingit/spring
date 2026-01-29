package org.hati.room.service;

import java.util.List;
import org.hati.room.vo.CenterVO;

public interface CenterService {
    
    // 전체 센터 리스트 조회
    List<CenterVO> getCenterList();
    
    // 필터링된 센터 리스트 조회
    List<CenterVO> getCenterList(String region, String category, String sortType);
    
    // 센터 상세 정보 조회
    CenterVO getCenterDetail(int centerId);
}