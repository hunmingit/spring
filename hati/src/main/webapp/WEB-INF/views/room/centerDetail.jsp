<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${center.centerName} - H.A.T.I.Booking</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/centerDetail.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container header-inner">
            <a href="${pageContext.request.contextPath}/room/hatibMain" class="back-link">
                <i class="fa-solid fa-arrow-left"></i> 목록으로
            </a>
        </div>
    </header>

    <div class="container main-container">
        <div class="content-grid">
            <!-- Left Content -->
            <div class="left-content">
                <!-- Badge -->
                <div class="badge-container">
                    <span class="badge-primary">${center.centerRegion}</span>
                </div>

                <!-- Title -->
                <h1 class="center-title">${center.centerName}</h1>
                <p class="center-subtitle">${center.centerContent}</p>

                <!-- Image Slider -->
                <div class="image-slider">
                    <div class="slider-container">
                        <c:forEach var="i" begin="1" end="5">
                            <img 
                                src="${pageContext.request.contextPath}/resources/img/room/${center.centerId}/${i}.jpg"
                                onerror="this.style.display='none'"
                                alt="시설 이미지 ${i}"
                                class="slider-image ${i == 1 ? 'active' : ''}"
                                data-index="${i - 1}">
                        </c:forEach>
                    </div>
                    
                    <button class="slider-btn slider-prev" onclick="changeSlide(-1)">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <button class="slider-btn slider-next" onclick="changeSlide(1)">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    
                    <div class="slider-counter">
                        <span id="currentSlide">1</span> / <span id="totalSlides">5</span>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="nav-tabs">
                    <button onclick="scrollToSection('introduction')" class="tab-btn">공간소개</button>
                    <button onclick="scrollToSection('facility')" class="tab-btn">시설안내</button>
                    <button onclick="scrollToSection('precautions')" class="tab-btn">유의사항</button>
                    <button onclick="scrollToSection('refund')" class="tab-btn">환불정책</button>
                    <button onclick="scrollToSection('reviews')" class="tab-btn">이용후기</button>
                    <button onclick="scrollToSection('location')" class="tab-btn">오시는 길</button>
                    <button onclick="scrollToSection('environment')" class="tab-btn">온/습도 확인</button>
                </div>

                <!-- Content Sections -->
                <div class="content-sections">
                    <!-- 공간 소개 -->
                    <section id="introduction" class="content-section">
                        <h2 class="section-title">공간 소개</h2>
                        <p class="section-content">${fn:escapeXml(center.space != null ? center.space : '공간 소개 내용이 준비중입니다.')}</p>
                    </section>

                    <!-- 시설안내 -->
                    <section id="facility" class="content-section">
                        <h2 class="section-title">시설안내</h2>
                        <p class="section-content">${fn:escapeXml(center.facility != null ? center.facility : '시설 안내 내용이 준비중입니다.')}</p>
                    </section>

                    <!-- 유의사항 -->
                    <section id="precautions" class="content-section">
                        <h2 class="section-title">유의사항</h2>
                        <p class="section-content">${fn:escapeXml(center.notice != null ? center.notice : '유의사항 내용이 준비중입니다.')}</p>
                    </section>

                    <!-- 환불정책 -->
                    <section id="refund" class="content-section">
                        <h2 class="section-title">환불정책</h2>
                        <p class="section-content">${fn:escapeXml(center.refundPolicy)}</p>
                    </section>

                    <!-- 이용 후기 -->
                    <section id="reviews" class="content-section">
                        <h2 class="section-title">
                            이용 후기 ${center.reviewCount}개
                            <c:if test="${center.avgGrade != null}">
                                · 후기 평점 ${center.avgGrade}
                            </c:if>
                        </h2>
                        
                        <c:if test="${empty center.reviews}">
                            <p class="no-reviews">아직 등록된 후기가 없습니다.</p>
                        </c:if>
                        
                        <div class="reviews-container">
                            <c:forEach var="review" items="${center.reviews}">
                                <div class="review-card">
                                    <div class="review-header">
                                        <div class="review-author-avatar">
                                            ${fn:substring(review.accountName, 0, 1)}
                                        </div>
                                        <div class="review-author-info">
                                            <p class="review-author-name">${review.accountName}</p>
                                            <div class="review-rating">
                                                <c:forEach var="i" begin="1" end="${review.grade}">
                                                    <i class="fa-solid fa-star"></i>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="review-content">${fn:escapeXml(review.content)}</p>
                                    <p class="review-date">
                                        <fmt:formatDate value="${review.createdAt}" pattern="yyyy.MM.dd HH:mm:ss"/>
                                    </p>
                                </div>
                            </c:forEach>
                        </div>
                    </section>

                    <!-- 오시는 길 -->
                    <section id="location" class="content-section">
                        <h2 class="section-title">오시는 길</h2>
                        <p class="location-coords">위도: ${center.latitude}, 경도: ${center.longitude}</p>
                        <div id="map" class="kakao-map"></div>
                        <div class="location-buttons">
                            <button class="btn btn-outline btn-half">
                                <i class="fa-solid fa-phone"></i> 전화걸기
                            </button>
                            <button class="btn btn-outline btn-half" onclick="openNavigation()">
                                <i class="fa-solid fa-route"></i> 길찾기
                            </button>
                        </div>
                    </section>

                    <!-- 온/습도 확인 -->
                    <section id="environment" class="content-section">
                        <h2 class="section-title">온/습도 확인</h2>
                        <div class="env-grid">
                            <div class="env-card">
                                <p class="env-label">현재 온도</p>
                                <p class="env-value">
                                    ${center.temperature != null ? center.temperature : '--'}°C
                                </p>
                            </div>
                            <div class="env-card">
                                <p class="env-label">현재 습도</p>
                                <p class="env-value">
                                    ${center.humidity != null ? center.humidity : '--'}%
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

<!-- centerDetail.jsp 계속 (2/2) -->
            <!-- Right Sidebar - Booking -->
            <div class="right-sidebar">
                <div class="booking-card">
                    <div class="booking-header">
                        <h3 class="booking-title">예약/결제</h3>
                        <div class="booking-actions">
                            <button class="icon-btn" onclick="toggleBookmark()" id="bookmarkBtn">
                                <i class="fa-${center.bookmarked ? 'solid' : 'regular'} fa-heart"></i>
                            </button>
                            <button class="icon-btn">
                                <i class="fa-regular fa-flag"></i>
                            </button>
                        </div>
                    </div>

                    <div class="booking-notice">
                        결제 후 바로 예약확정
                    </div>

                    <!-- 예약 유형 -->
                    <div class="form-group">
                        <label class="form-label">예약 유형</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="reservationType" value="personal" checked>
                                <span>개인운동</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="reservationType" value="trainer">
                                <span>트레이너와 함께</span>
                            </label>
                        </div>
                    </div>

                    <!-- 공간 정보 -->
                    <div class="info-section">
                        <div class="info-row">
                            <span class="info-label">공간 유형</span>
                            <span class="info-value">${center.spaceType}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">공간면적</span>
                            <span class="info-value">${center.area}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">예약시간</span>
                            <span class="info-value">${center.reservationTime}</span>
                        </div>
                    </div>

                    <!-- 편의시설 -->
                    <div class="amenities-section">
                        <p class="amenities-label">편의시설</p>
                        <div class="amenities-tags">
                            <c:forEach var="amenity" items="${center.amenities}">
                                <span class="amenity-tag">${amenity}</span>
                            </c:forEach>
                            <c:if test="${empty center.amenities}">
                                <span class="no-amenities">편의시설 정보 없음</span>
                            </c:if>
                        </div>
                    </div>

                    <!-- 예약 선택 -->
                    <div class="booking-select">
                        <label class="form-label">예약선택</label>
                        <button class="btn btn-outline btn-full" onclick="toggleTimeSelect()">
                            <i class="fa-regular fa-calendar"></i>
                            <span id="selectedTimeText">시간 선택하기</span>
                        </button>

                        <!-- 시간 선택 패널 (숨김 상태) -->
                        <div id="timeSelectPanel" class="time-select-panel" style="display: none;">
                            <div class="calendar-wrapper">
                                <p class="panel-label">날짜 선택</p>
                                <input type="date" id="dateInput" class="date-input" onchange="loadTimeSlots()">
                            </div>

                            <!-- 시간 슬롯 (날짜 선택 후 표시) -->
                            <div id="timeSlotsWrapper" style="display: none;">
                                <p class="panel-label">시간 선택</p>
                                <div class="time-slots-container">
                                    <div class="time-slots-scroll" id="timeSlotsScroll">
                                        <!-- AJAX로 동적 로드 -->
                                    </div>
                                </div>

                                <div id="selectedSummary" class="selected-summary" style="display: none;">
                                    <div class="summary-content">
                                        <div>
                                            <p class="summary-text">선택된 시간: <span id="selectedCount">0</span>시간</p>
                                            <p class="summary-price">총 금액: <span id="totalPrice">0</span>원</p>
                                        </div>
                                        <button class="btn-reset" onclick="resetTimeSelection()">초기화</button>
                                    </div>
                                </div>
                            </div>

                            <button class="btn btn-primary btn-full" onclick="applyTimeSelection()">
                                적용하기
                            </button>
                        </div>
                    </div>

                    <!-- 예약 버튼 -->
                    <div class="booking-buttons">
                        <button class="btn btn-outline btn-full">
                            <i class="fa-solid fa-phone"></i> 전화
                        </button>
                        <button class="btn btn-primary btn-full">바로 예약하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 카카오 지도 SDK -->
    <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ddf15a2e7b11221e20f39af9cfb417d0"></script>

    <script>
        const contextPath = '${pageContext.request.contextPath}';
        const centerId = ${center.centerId};
        const centerLat = ${center.latitude};
        const centerLng = ${center.longitude};
        const baseFee = ${center.baseFee};
        let isBookmarked = ${center.bookmarked};
        let selectedSlots = [];
        let currentSlide = 0;
        const totalSlides = 5;

        // 페이지 로드 시 카카오 지도 초기화
        window.addEventListener('load', function() {
            initKakaoMap();
            updateSlideCounter();
        });
    </script>

    <script src="${pageContext.request.contextPath}/resources/js/centerDetail.js"></script>
</body>
</html>
