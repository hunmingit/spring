package org.hati.room.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * centers_reviews 테이블 VO
 * PK: (center_id, account_id)
 * 한 사용자는 한 시설에 하나의 리뷰만 작성 가능
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CenterReviewVO {
    // PK (복합키)
    private int centerId;
    private int accountId;
    
    // 리뷰 정보
    private String content;
    private int grade;          // 1~5 별점
    private Date createdAt;
    private Date updatedAt;
    
    // 조회용 추가 필드 (JOIN 시 사용)
    private String accountName; // 작성자 이름 (accounts 테이블에서)
    private String centerName;  // 센터 이름 (centers 테이블에서)
}
