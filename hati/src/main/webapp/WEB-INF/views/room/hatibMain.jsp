<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>H.A.T.I.Booking - 메인 화면</title>
    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/resources/css/hatibMain.css">
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
</head>
<body>

<!-- Header -->
<header class="header">
    <div class="header-inner">
        <div class="logo">
            <span class="logo-box"></span>
            <span class="logo-text">H.A.T.I.Booking</span>
        </div>
        <div class="header-right">
            <form action="${pageContext.request.contextPath}/room/hatibMain" method="get" class="search-form">        
                <div class="search-wrapper">
                    <input type="text" name="keyword" placeholder="공간 검색" class="search-input" value="${keyword}" autocomplete="off">
                    <button type="submit" class="search-icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </form>
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

<!-- 검색 결과 표시 -->
<c:if test="${not empty keyword}">
<section class="search-result-info">
    <div class="search-result-inner">
        <span class="search-keyword">
            "<strong>${keyword}</strong>" 검색 결과
        </span>
        <a href="${pageContext.request.contextPath}/room/hatibMain" class="clear-search">
            <i class="fa-solid fa-xmark"></i> 검색 초기화
        </a>
    </div>
</section>
</c:if>

<!-- Filter Area -->
<section class="filter-section">
    <div class="filter-inner">
        <div class="filter-left">
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
            <button class="all-reset-btn" id="allResetBtn">
                <i class="fa-solid fa-arrow-rotate-left"></i> 전체 초기화
            </button>
        </div>
    </div>
</section>

<!-- Centers List -->
<main class="container">
    <div id="loadingIndicator" class="loading-indicator" style="display: none;">
        <i class="fa-solid fa-spinner fa-spin"></i> 검색 중...
    </div>
    <div id="filterStatus" class="filter-status">
        <span id="filterCount">시설 목록</span>
    </div>

    <div class="facility-grid" id="facilityGrid">
        <c:forEach var="center" items="${centerList}">
            <a href="${pageContext.request.contextPath}/centers/${center.centerId}" 
               class="facility-card"
               data-region="${center.centerRegion}"
               data-category="${center.category}"
               data-price="${center.baseFee}">
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
    
    <div id="noResults" class="no-results" style="display: none;">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>검색 조건에 맞는 시설이 없습니다.</p>
        <button class="all-reset-btn" onclick="resetAllFilters()">필터 초기화</button>
    </div>
    
    <div class="infinite-scroll-spinner" id="infiniteSpinner" style="display: none;">
        <i class="fa-solid fa-spinner fa-spin"></i> 로딩 중...
    </div>

    <div class="infinite-scroll-end" id="infiniteScrollEnd" style="display: none;">
        <i class="fa-solid fa-check-circle"></i>
        <p>더 이상 시설이 없습니다.</p>
    </div>
</main>

<!-- 지도 모달 -->
<div id="mapModal" class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <h2>시설 위치</h2>
            <span class="close" id="closeModal">&times;</span>
        </div>
        <div class="modal-body">
            <div id="map" style="width:100%;height:600px;"></div>
        </div>
    </div>
</div>

<!-- 카카오 지도 SDK -->
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ddf15a2e7b11221e20f39af9cfb417d0"></script>
<!-- Flatpickr -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ko.js"></script>

<%-- 
    ===================================================
    핵심 수정: hidden input을 사용하여 서버 데이터를 안전하게 전달
    기존 문제: <script> 안에서 c:forEach로 JS 객체 직접 생성 
              → 특수문자/빈리스트일 때 파싱 실패
    해결: hidden input에 data 저장 → JS에서 읽기
    ===================================================
--%>

<!-- 초기 상태값을 hidden input으로 안전하게 전달 -->
<input type="hidden" id="hiddenContextPath" value="${pageContext.request.contextPath}">
<input type="hidden" id="hiddenPageSize" value="${pageSize}">
<input type="hidden" id="hiddenHasMore" value="${hasMore}">
<input type="hidden" id="hiddenKeyword" value="${empty keyword ? '' : keyword}">

<!-- centerList를 각 센터마다 hidden input으로 전달 -->
<c:forEach var="center" items="${centerList}">
    <input type="hidden" class="hiddenCenterData"
           data-center-id="${center.centerId}"
           data-center-name="${fn:escapeXml(center.centerName)}"
           data-center-region="${center.centerRegion}"
           data-category="${center.category}"
           data-latitude="${center.latitude}"
           data-longitude="${center.longitude}"
           data-base-fee="${center.baseFee}"
           data-center-content="${fn:escapeXml(center.centerContent)}"
           data-review-count="${center.reviewCount}">
</c:forEach>

<script type="text/javascript">
// ===================================================
// hidden input에서 안전하게 데이터 읽기
// ===================================================
var contextPath = document.getElementById('hiddenContextPath').value;
var pageSize    = parseInt(document.getElementById('hiddenPageSize').value);
var hasMore     = document.getElementById('hiddenHasMore').value === 'true';
var keyword     = document.getElementById('hiddenKeyword').value;

// centerList 배열 구성
var centerList = [];
document.querySelectorAll('.hiddenCenterData').forEach(function(el) {
    centerList.push({
        centerId:      parseInt(el.dataset.centerId),
        centerName:    el.dataset.centerName,
        centerRegion:  el.dataset.centerRegion,
        category:      el.dataset.category,
        latitude:      parseFloat(el.dataset.latitude),
        longitude:     parseFloat(el.dataset.longitude),
        baseFee:       parseInt(el.dataset.baseFee),
        centerContent: el.dataset.centerContent,
        reviewCount:   parseInt(el.dataset.reviewCount)
    });
});

// 무한 스크롤 초기 상태
var infiniteScrollState = {
    currentPage: 1,
    pageSize:    pageSize,
    hasMore:     hasMore,
    keyword:     keyword,
    region:      '',
    category:    '',
    sortType:    ''
};

console.log('centerList:', centerList);
console.log('infiniteScrollState:', infiniteScrollState);
</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/hatibMain.js"></script>

</body>
</html>
