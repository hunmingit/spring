package org.hati.room.vo;

import java.sql.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDetailVO {
    private int centerId;
    private int accountId;
    private String accountName;  // accounts.name (작성자 이름)
    private int grade;
    private String reviewText;
    private Date reviewDate;
    
    // 리뷰 이미지 (별도 테이블이 없다면 기본 이미지 경로 사용)
    // 실제로는 review_images 테이블이 필요할 수 있음
    private String profileImage; // 프로필 이미지 (기본: 이름 첫 글자)
}
