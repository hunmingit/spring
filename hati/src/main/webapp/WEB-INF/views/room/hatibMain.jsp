<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %><!-- 숫자, 날짜 포맷용 -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %><!-- 문자열 처리 함수 -->

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>H.A.T.I.Booking - 메인 화면</title>
    <!--contextPath 사용 → 배포 경로 바뀌어도 안전  -->
    <!-- Font Awesome 아이콘 CDN -> 검색 아이콘, 프로필 아이콘용  -->
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/css/hatibMain.css">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <!-- Flatpickr CSS (캘린더 라이브러리) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</head>
<body>

<!-- Header -->
<header class="header">
    <div class="header-inner">
    <!-- 서비스 로고 영역 -->
        <div class="logo">
            <span class="logo-box"></span><!-- 임시 -->
            <span class="logo-text">H.A.T.I.Booking</span>
        </div>
        <!-- 공간명 검색 입력 창 아직 js 구현 x -->
        <div class="header-right">
            <div class="search-wrapper">
                <input type="text" placeholder="공간 검색" class="search-input">
                <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <!-- 프로필 이미지 원형 영역 -->
            <div class="profile-wrapper">
                <div class="profile-circle"></div>
                <div class="profile-menu">
                    <a href="/profile">프로필관리</a>
                    <a href="/reservationList">예약리스트</a>
                    <a href="/SavedSpace">찜한공간</a>
                    <a href="/Review">이용후기</a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Filter Area -->
<section class="filter-section">
    <div class="filter-inner">
        <div class="filter-left">
        <!-- 지역 필터 -->
            <div class="filter-item" id="regionFilter">
                <button class="filter-btn">지역 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option" data-value="">전체</div>
                    <div class="filter-option" data-value="강동구">강동구</div>
                    <div class="filter-option" data-value="강서구">강서구</div>
                    <div class="filter-option" data-value="강북구">강북구</div>
                    <div class="filter-option" data-value="강남구">강남구</div>
                    <div class="filter-reset">
                        <button class="reset-btn" data-filter="region">
                            <i class="fa-solid fa-rotate-right"></i> 초기화
                        </button>
                    </div>
                </div>
            </div>
			<!-- 날짜 필터 (캘린더) -->
            <div class="filter-item" id="dateFilter">
                <button class="filter-btn">날짜 선택 ▼</button>
                <div class="filter-menu calendar-menu">
                    <input type="text" id="datePicker" class="date-input" placeholder="날짜를 선택하세요" readonly>
                    <div class="filter-reset">
                        <button class="reset-btn" data-filter="date">
                            <i class="fa-solid fa-rotate-right"></i> 초기화
                        </button>
                    </div>
                </div>
            </div>
			<!-- 운동 종목 필터 -->
            <div class="filter-item" id="sportFilter">
                <button class="filter-btn">운동 종목 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option" data-value="">전체</div>
                    <div class="filter-option" data-value="GYM">헬스</div>
                    <div class="filter-option" data-value="YOGA">요가</div>
                    <div class="filter-option" data-value="FOOTBALL">풋살</div>
                    <div class="filter-option" data-value="SCREEN_GOLF">골프</div>
                    <div class="filter-reset">
                        <button class="reset-btn" data-filter="sport">
                            <i class="fa-solid fa-rotate-right"></i> 초기화
                        </button>
                    </div>
                </div>
            </div>
			<!-- 정렬 필터 -->
            <div class="filter-item" id="sortFilter">
                <button class="filter-btn">정렬 기준 ▼</button>
                <div class="filter-menu">
                    <div class="filter-option" data-value="review_desc">베스트 공간 순</div>
                    <div class="filter-option" data-value="price_asc">가격 낮은 순</div>
                    <div class="filter-option" data-value="price_desc">가격 높은 순</div>
                    <div class="filter-reset">
                        <button class="reset-btn" data-filter="sort">
                            <i class="fa-solid fa-rotate-right"></i> 초기화
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="filter-right">
            <button class="map-btn" id="mapBtn">지도</button>
            <!-- 전체 초기화 버튼 -->
            <button class="all-reset-btn" id="allResetBtn">
                <i class="fa-solid fa-arrow-rotate-left"></i> 전체 초기화
            </button>
        
        </div>
    </div>
</section>

<!-- Centers List -->
<main class="container">
    <!-- 로딩 표시 -->
    <div id="loadingIndicator" class="loading-indicator" style="display: none;">
        <i class="fa-solid fa-spinner fa-spin"></i> 검색 중...
    </div>
    <!-- 필터 적용 상태 표시 -->
    <div id="filterStatus" class="filter-status">
        <span id="filterCount">전체 <strong>${fn:length(centerList)}</strong>개 시설</span>
    </div>	

    <div class="facility-grid" id="facilityGrid">
    <!-- 센터 목록 반복 출력 센터 하나당 카드 하나  -->
        <c:forEach var="center" items="${centerList}">
        <!-- 카드 전체 클릭 링크 카드 클릭 시 -> 센터 상세 페이지로 이동 -->
            <a href="${pageContext.request.contextPath}/centers/${center.centerId}" 
            class="facility-card"
            data-region="${center.centerRegion}"
            data-category="${center.category}"
            data-price="${center.baseFee}">
            
            <!-- 센터별 대표 이미지 onerror : 이미지 없으면 기본 이미지로 대체 -->
                <div class="facility-image">
                    <img src="${pageContext.request.contextPath}/resources/img/room/${center.centerId}/main.jpg"
                        onerror="this.src='${pageContext.request.contextPath}/resources/img/room/default/main.jpg'"
                        alt="센터 이미지">
                    <c:if test="${not empty center.category}">
                        <span class="category-badge">
                            <c:choose>
                                <c:when test="${center.category == 'GYM'}">헬스</c:when>
                                <c:when test="${center.category == 'YOGA'}">요가</c:when>
                                <c:when test="${center.category == 'FOOTBALL'}">풋살</c:when>
                                <c:when test="${center.category == 'SCREEN_GOLF'}">골프</c:when>
                                <c:otherwise>${center.category}</c:otherwise>
                            </c:choose>
                        </span>
                    </c:if>
                </div>           
                <div class="facility-content">
                    <h3 class="facility-title">${center.centerName}</h3>
                    <p class="facility-subtitle">${center.centerContent}</p>
            
                    <div class="facility-info">
                        <span class="district">${center.centerRegion}</span>
                        <span class="price">
                            ₩<fmt:formatNumber value="${center.baseFee}" pattern="#,###"/>원
                        </span>
                    </div>
                </div>
            </a>
        </c:forEach>
    </div>
    
    <!-- 결과 없음 메시지 -->
    <div id="noResults" class="no-results" style="display: none;">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>검색 조건에 맞는 시설이 없습니다.</p>
        <button class="all-reset-btn" onclick="resetAllFilters()">필터 초기화</button>
    </div>
    
</main>

<!-- 지도 팝업 모달 -->
<div id="mapModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>시설 위치</h2>
            <!-- 닫기 버튼(x) -->
            <span class="close" id="closeModal">&times;</span>
        </div>
        <!-- 카카오 지도가 실제로 그려질 div -->
        <div class="modal-body">
            <div id="map" style="width:100%;height:600px;"></div>
        </div>
    </div>
</div>

<!-- 카카오 지도 API - HTTPS 명시, 카카오 지도 SDK, JS 파일보다 반드시 먼저 로드해야 함 -->
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ddf15a2e7b11221e20f39af9cfb417d0"></script>
<!-- Flatpickr JS (캘린더) -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ko.js"></script>

<script>
const contextPath = '${pageContext.request.contextPath}';

const centerList = [
<c:forEach var="center" items="${centerList}" varStatus="status">
{
    centerId: ${center.centerId},
    centerName: "${fn:escapeXml(center.centerName)}",
    centerRegion: "${center.centerRegion}",
    category: "${center.category}",
    latitude: ${center.latitude},
    longitude: ${center.longitude},
    baseFee: ${center.baseFee},
    centerContent: "${fn:escapeXml(center.centerContent)}",
    reviewCount: ${center.reviewCount}
}<c:if test="${not status.last}">,</c:if>
</c:forEach>
];
    
    console.log('centerList:', centerList);
</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/hatibMain.js"></script>

</body>
</html>
