package org.hati.room.mapper;

import java.util.List;
import org.hati.room.vo.CenterDetailVO;
import org.hati.room.vo.CenterReviewVO;
import org.hati.room.vo.RoomSlotVO;

public interface CenterDetailMapper {
    
    /**
     * 센터 상세 정보 조회 (기본 정보 + 대표 종목 + 가격)
     */
    CenterDetailVO getCenterDetail(int centerId);
    
    /**
     * 센터의 편의시설 목록 조회
     */
    List<String> getAmenities(int centerId);
    
    /**
     * 센터의 리뷰 목록 조회
     */
    List<CenterReviewVO> getReviews(int centerId);
    
    /**
     * 센터의 최신 온습도 정보 조회
     */
    CenterDetailVO getLatestEnvReading(int centerId);
    
    /**
     * 특정 날짜의 예약 가능한 시간 슬롯 조회
     */
    List<RoomSlotVO> getAvailableSlots(int roomId, String slotDate);
    
    /**
     * 찜 여부 확인 (로그인한 사용자)
     */
    int checkBookmark(int accountId, int roomId);
    
    /**
     * 찜 추가
     */
    int addBookmark(int accountId, int roomId);
    
    /**
     * 찜 삭제
     */
    int removeBookmark(int accountId, int roomId);
}
