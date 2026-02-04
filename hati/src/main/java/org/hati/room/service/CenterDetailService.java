package org.hati.room.service;

import java.util.List;
import org.hati.room.vo.CenterDetailVO;
import org.hati.room.vo.RoomSlotVO;

public interface CenterDetailService {
    
    /**
     * 센터 상세 정보 전체 조회
     * (기본 정보 + 편의시설 + 리뷰 + 온습도)
     */
    CenterDetailVO getCenterDetailFull(int centerId, Integer accountId);
    
    /**
     * 특정 날짜의 예약 가능한 시간 슬롯 조회
     */
    List<RoomSlotVO> getAvailableSlots(int roomId, String slotDate);
    
    /**
     * 찜 토글 (추가/삭제)
     */
    boolean toggleBookmark(int accountId, int roomId);
}
